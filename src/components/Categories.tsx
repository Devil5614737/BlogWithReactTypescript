import { useContext } from "react";
import { Nav } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import { BlogContextI } from "../interfaces/BlogContextI";
import { BlogI } from "../interfaces/BlogI";
import Api from '../api/blog'

export const Categories = () => {
  const {  setBlog,setBlogs ,setLoading} = useContext<BlogContextI>(BlogContext);
  const navigate = useNavigate();



  const blogWithCategories = async (category: string) => {
    setLoading(true)
    const result = await Api.categoryWiseBlogs(category);
    
    if(result.status===200) {
      setLoading(false)
      setBlogs(result.data as BlogI[]);
      
    }

  };



  return (
    <Nav variant="pills" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link
          title="create blog"
          onClick={() => navigate("/create-blog")}
          eventKey="Plus"
        >
          <AiOutlinePlus />
        </Nav.Link>
      </Nav.Item>
      {[
        "Programming",
        "Fashion",
        "Politics",
        "Fitness",
        "Productivity",
        "Other",
      ].map((item) => (
        <Nav.Item key={item}>
          <Nav.Link
            onClick={() => {
              blogWithCategories(item);
              setBlog(null as any);
            }}
            eventKey={item}
          >
            {item}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};
