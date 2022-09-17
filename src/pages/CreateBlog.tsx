import React, { useContext, useState } from "react";
import { Badge, Button, Container, FloatingLabel, Form, Nav } from "react-bootstrap";
import { Categories } from "../components/Categories";
import { Navbar } from "../components/Navbar";
import { BlogContext } from "../context/BlogContext";
import { BlogContextI } from "../interfaces/BlogContextI";
import Api from '../api/blog';
import { useNavigate } from "react-router-dom";
import { AuthContextI } from "../interfaces/AuthContextI";
import { AuthContext } from "../context/AuthContext";
import { useImage } from "../hooks/useImage";

export const CreateBlog = () => {
  const { setFetch ,blog,handleUpdateBlog} = useContext<BlogContextI>(BlogContext);
  const { currentUser } = useContext<AuthContextI>(AuthContext);
  const navigate=useNavigate();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState(blog?blog.title:"");
  const [content, setContent] = useState(blog?blog.content:"");
  const [file, setFile] = useState<File>();
  const {url}=useImage(file as File)






  const handlePublish=async()=>{
    if(!url) return alert('image is uploading please wait...')
    if(!category)  return alert('please choose a category')
    if(!currentUser) return alert('you have to login to create your blog')
    setFetch(true)
const result=await Api.createBlog(title, content,url, category)
if(result.status===200&& result.data){
navigate('/')
}

  }

const handleClear=()=>{
  setTitle("")
  setContent("")
}



  return (
    <Container>
      <Navbar />
      <Form.Label>Select category</Form.Label>
      <Nav variant="pills" defaultActiveKey="/home">
      {[  "All",
        "Programming",
        "Fashion",
        "Politics",
        "Fitness",
        "Productivity",
        "Other",].map(item=>
    <Nav.Item>
      <Nav.Link onClick={()=>setCategory(item)} eventKey={item}>{item}</Nav.Link>
    </Nav.Item>
        )}
        </Nav>

          
      <div className="my-5">
      <Button onClick={handleClear} variant='outline-primary' className='btn-sm mb-3'>Clear fields</Button>
        <Form style={{ fontFamily: "Lora" }}>
          <FloatingLabel
            controlId="floatingInput"
            label="Title"
            className="mb-3"
          >
            <Form.Control
            autoFocus
              style={{ border: "none" }}
              type="text"
              placeholder="Title"
              value={title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setTitle(event.currentTarget.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            controlId="floatingTextarea2"
            label="write your content here.."
          >
            <Form.Control
              as="textarea"
              placeholder="write your content here..."
              style={{ height: 250, border: "none" }}
              value={content}
              onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setContent(event.currentTarget.value)}
            />
          </FloatingLabel>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control type="file" 
              onChange={(event:any)=>setFile(event.currentTarget.files[0])}
            />
          </Form.Group>
          {blog?
          <Button disabled={!category} onClick={()=>handleUpdateBlog(blog?._id,title, content, "https://miro.medium.com/max/414/1*YS5Oub8REWy8vnOEqBnsyQ.png", category)}  variant="dark">Update</Button>:
          <Button disabled={!url} onClick={handlePublish} variant="dark">Publish</Button>
          }
        </Form>
      </div>
    </Container>
  );
};
