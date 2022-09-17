import React, { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Container } from "react-bootstrap";
import { Navbar } from "../components/Navbar";
import { BlogI } from "../interfaces/BlogI";
import Api from "../api/blog";
import { AuthContext } from "../context/AuthContext";
import { AuthContextI } from "../interfaces/AuthContextI";
import { BlogContext } from "../context/BlogContext";
import { BlogContextI } from "../interfaces/BlogContextI";

const Profile = () => {
  const { currentUser } = useContext<AuthContextI>(AuthContext);
  const { editBlog ,setFetch,myBlogs} = useContext<BlogContextI>(BlogContext);




  const removeBlog = (id: string) => {
    setFetch(true);
    Api.removeBlog(id);
  };



  return (
    <Container>
      <Navbar />
      <div className="my-3">
        <h1>{currentUser?.username}</h1>
      </div>
      <div className="">
        <p>My Blogs ({myBlogs?.length})</p>

        <div className="my-5">
          {myBlogs?.map((item: BlogI) => (
            <Card  key={item._id} className="mb-3">
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.content.substring(0, 200) + "..."}</Card.Text>

                <div>
                  <Button
                  variant='outline-primary'
                   onClick={() => editBlog( item)}>Edit</Button>
                  <Button
                  variant='outline-danger'
                    onClick={() => removeBlog(item._id)}
                    className="mx-2"
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Profile;
