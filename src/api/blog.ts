import { client } from "./client";

const getBlogs = () => client.get("/all-blogs");
const myBlogs = () => client.get("/my-blogs");

const createBlog = (
  title: string,
  content: string,
  image: string,
  category: string
) => client.post("/create-blog", { title, content, image, category });
const removeBlog = (blogId: string) => client.post("/remove-blog", { blogId });
const editBlog = (
  blogId: string,
  title: string,
  content: string,
  image: string,
  category: string
) => client.put("/edit", { blogId, title, content, image, category });

const categoryWiseBlogs = (category: string) =>
  client.get(`/blogs/?category=${category}`);

const searchBlogs = (query:string) =>
  client.get(`/search/?title=${query}`);


const comment = (blogId: string, text: string) =>
  client.put("/comment", { blogId, text });

export default {
  getBlogs,
  createBlog,
  categoryWiseBlogs,
  myBlogs,
  removeBlog,
  comment,
  editBlog,
  searchBlogs
};
