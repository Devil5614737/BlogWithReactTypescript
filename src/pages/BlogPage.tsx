import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Image } from 'react-bootstrap'
import { AiOutlineComment } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { BlogContext } from '../context/BlogContext'
import { BlogContextI } from '../interfaces/BlogContextI'
import Api from '../api/blog';
import { formatDistanceToNow } from 'date-fns'
import { AuthContext } from '../context/AuthContext'
import { AuthContextI } from '../interfaces/AuthContextI'


export default function BlogPage() {
  const navigate=useNavigate();
  const {blog,setFetch}=useContext<BlogContextI>(BlogContext);
  const {currentUser}=useContext<AuthContextI>(AuthContext);
  const[text,setText]=useState<string>('');



useEffect(()=>{
  if(!blog){

    navigate('/')
  }
},[blog]);



const handleComment=async(blogId:string)=>{
  if(!currentUser) return alert('login required to comment')
  setFetch(true)
if(text){
const result=await Api.comment(blogId,text)
if(result.status===200){
  alert('comment is under review')
}
}
}



  return (
  <>
    <Container>
        <Navbar/>
        <div className='d-flex gap-3 my-4 ' >
            <Image style={{width:50,height:50,borderRadius:'100%'}} src={blog?.postedBy.displayPic} alt='user'/>
            <div className="my-2" style={{lineHeight:.5}}>
                <p style={{fontSize:15,fontWeight:500}}>{blog?.postedBy.username}
</p>
                <p style={{fontSize:12,color:'grey'}}>{formatDistanceToNow(new Date(blog?.createdAt as string),{addSuffix:true})}</p>
            </div>
        </div>
        <div className="">
<h3 style={{fontWeight:"bold",fontSize:27,lineHeight:1.6}}>{blog?.title}</h3>
<Image className='w-100  my-3' style={{objectFit:'cover',height:400}} src={blog?.image} alt='blog thumbnail'/>
<p style={{lineHeight:1.7}}>{blog?.content}</p>
        </div>
<div className="d-flex gap-4">
 
  <div className="d-flex gap-1">
  <AiOutlineComment size={26} style={{cursor:'pointer'}}/>
  <p>{blog?.comments.length}</p>
  </div>
</div>
<div className="">
  {blog?.comments.map(item=>
  <p key={item._id} style={{fontWeight:500}}>{item.postedBy.username} <span style={{fontWeight:400}}>{item.text}</span></p>
    )}
</div>
<Form className='d-block' style={{position:'relative'}}>
  <Form.Control
  value={text}
  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
    setText(event.currentTarget.value)
  }
  as='textarea' placeholder='What are your thought?'/>
  <Button 
  variant='outline-success'
  onClick={()=>{handleComment(blog?._id as any)
  setText("")
  }} 
  className='my-2' style={{position:'absolute',right:0}}>Submit</Button>
</Form>


    </Container>
  </>
  )
}

