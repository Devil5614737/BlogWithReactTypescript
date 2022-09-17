import { client } from "./client";

 const login=(email:string,password:string)=>client.post('/login',{email,password})
 const signup=(username:string,email:string,password:string,displayPic:string)=>client.post('/signup',{username,email,password,displayPic})


 export default {login,signup};