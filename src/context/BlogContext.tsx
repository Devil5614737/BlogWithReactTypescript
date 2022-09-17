import { createContext, ReactNode, useEffect, useState } from "react";
import { BlogContextI } from "../interfaces/BlogContextI";
import { BlogI } from "../interfaces/BlogI";
import Api from "../api/blog";
import { useNavigate } from "react-router-dom";

export const BlogContext = createContext({} as BlogContextI);

interface BlogContextProviderI {
  children: ReactNode;
}

export const BlogContextProvider = ({ children }: BlogContextProviderI) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");
  const [blogs, setBlogs] = useState<BlogI[]>([]);
  const [fetch, setFetch] = useState<boolean>(false);
  const [blog, setBlog] = useState<BlogI>();
  const [myBlogs, setMyBlogs] = useState<BlogI[]>([]);
  const[loading,setLoading]=useState<boolean>(false)

  const fetchBlogs = async () => {
    setLoading(true)
    const result = await Api.myBlogs();
    if (result.status === 200) {
      setLoading(false)
      setMyBlogs(result.data as BlogI[]);
    }
    if (result.status !== 200) {
      console.log(result.data);
    }
  };

  useEffect(() => {
    fetchBlogs();
    return () => setFetch(false);
  }, [fetch]);

  const getBlogs = async () => {
    setLoading(true)
    const result = await Api.getBlogs();
    if(result.status===200) return setLoading(false)
    setBlogs(result.data as BlogI[]);
  };

  useEffect(() => {
    getBlogs();
    return () => setFetch(false);
  }, [fetch]);

  const blogWithCategories = async (category: string) => {
    setLoading(true)
    const result = await Api.categoryWiseBlogs(category);
    if(result.status===200) return setLoading(false)
    setBlogs(result.data as BlogI[]);
  };

  const fullBlog = (blog: BlogI) => {
    setBlog(blog);
    navigate("/show-blog");
  };

  const editBlog = (blog: BlogI) => {
    setBlog(blog);
    navigate("/create-blog");
  };

  const handleUpdateBlog = async (
    blogId: string,
    title: string,
    content: string,
    image: string,
    category: string
  ) => {
    setFetch(true);
    if (!category) {
      alert("please choose a category category");
    }

    const result = await Api.editBlog(blogId, title, content, image, category);
    if (result.status === 200) {
      navigate("/");
    } else {
      alert("something went wrong");
    }
  };

  const searchBlogs = async () => {
    const result = await Api.searchBlogs(query);
    if (result.status === 200) {
      console.log(result.data);
      setBlogs(result.data as BlogI[]);
    }
  };
  useEffect(() => {
    if (!query) return;
    searchBlogs();
  }, [query]);

  return (
    <BlogContext.Provider
      value={{
        blogs,
        setBlogs,
        fetch,
        setFetch,
        blogWithCategories,
        blog,
        setBlog,
        fullBlog,
        editBlog,
        myBlogs,
        handleUpdateBlog,
        setQuery,
        query,
        loading
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
