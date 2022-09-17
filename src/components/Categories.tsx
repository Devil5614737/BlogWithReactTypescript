import { useContext } from "react";
import { Nav } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import { BlogContextI } from "../interfaces/BlogContextI";

export const Categories = () => {
  const { blogWithCategories, setBlog } = useContext<BlogContextI>(BlogContext);
  const navigate = useNavigate();
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
