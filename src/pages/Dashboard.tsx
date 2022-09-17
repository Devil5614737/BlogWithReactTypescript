import { useContext, useEffect } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { Blog } from "../components/Blog";
import { Categories } from "../components/Categories";
import { Navbar } from "../components/Navbar";
import { BlogContext } from "../context/BlogContext";
import { BlogContextI } from "../interfaces/BlogContextI";
import { BlogI } from "../interfaces/BlogI";
import Api from "../api/blog";

function Dashboard() {
  const { blogs, setBlogs, loading } = useContext<BlogContextI>(BlogContext);

  const handleAllBlogs = async () => {
    const result = await Api.getBlogs();
    if (result.status === 200) {
      setBlogs(result.data as BlogI[]);
    }
  };


  useEffect(() => {
    // fetchBlogs();
    handleAllBlogs()
  }, []);

  return (
    <Container>
      <Navbar />
      <div className="my-4">
        <Categories />
      </div>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Container className="container-md">
          <Button
            onClick={handleAllBlogs}
            variant="outline-primary"
            className="btn-sm"
          >
            All Blogs
          </Button>
          <div className="my-5">
            {blogs?.map((item: BlogI) => (
              <Blog
                key={item._id}
                title={item.title}
                content={item.content}
                image={item.image}
                postedBy={item.postedBy}
                category={item.category}
                item={item}
                createdAt={item.createdAt}
              />
            ))}
          </div>
          {blogs?.length === 0 && <p>No blogs found</p>}
        </Container>
      )}
    </Container>
  );
}

export default Dashboard;
