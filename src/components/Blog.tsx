import { useContext, useEffect } from "react";
import { BlogContext } from "../context/BlogContext";
import { BlogContextI } from "../interfaces/BlogContextI";
import { BlogI, PostedByI } from "../interfaces/BlogI";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AuthContextI } from "../interfaces/AuthContextI";

interface PropsI {
  title: string;
  content: string;
  image: string;
  postedBy: PostedByI;
  category: string;
  item: BlogI;
  createdAt: string;
}

export const Blog = ({
  title,
  content,
  image,
  postedBy,
  category,
  item,
  createdAt,
}: PropsI) => {
  const { fullBlog } = useContext<BlogContextI>(BlogContext);
  const { currentUser } = useContext<AuthContextI>(AuthContext);
  const navigate=useNavigate()

useEffect(()=>{
  if(!fullBlog){
    navigate('/')
  }
},[fullBlog])



  return (
    <motion.div
    whileInView={{
      x: [0, 0],
      y: [100, 0],
      opacity: [0, 1],
    }}
    transition={{ duration: 0.5, type: "spring" }}
      className="card mb-4 p-3"
    >
      <div className=""
      
      >
        <div className="d-flex  gap-4">
          <img
            style={{
              width: 20,
              height: 20,
              borderRadius: "100%",
              objectFit: "cover",
            }}
            src={postedBy?.displayPic}
            alt="user"
          />
          <p style={{ fontSize: 15, fontWeight: 500 }}>{postedBy?.username}</p>
          <p style={{ fontSize: 12, color: "grey" ,marginTop:3}}>{formatDistanceToNow(new Date(createdAt),{addSuffix:true})}</p>
        </div>
        <div className="d-flex ">
          <div className="">
            <h3       onClick={() => {
            !currentUser?alert('login required'):fullBlog(item)
            }} className="title"  style={{ fontWeight: 600 ,cursor:'pointer',maxWidth:'90%'}}>{title}</h3>
            <p style={{ fontSize: 15, color: "#909090",maxWidth:'80%' }}>
              {content.substring(0, 340) + "..."}
            </p>
          <a href="#!" style={{fontSize:12,borderRadius:3,outline:'1px solid black' ,padding:'.4em 1em',display:'inline-block'}}>
              {category}

          </a>
          </div>
          <img className="img" style={{width:200,height:200,objectFit:'cover'}} src={image} alt="blog thumbnail" />
        </div>
      </div>
    </motion.div>
  );
};
