export interface PostedByI {
  displayPic: string;
  email: string;
  username: string;
  _id: string;
}

export interface commentI{
  text:string,
  _id:string,
 postedBy:{
  _id:string,
  username:string
 }
}

export interface BlogI {
  _id: string,
  title:string,
  category: string,
  comments: commentI[],
  content: string,
  createdAt: string,
  image: string,
  likes: [],
  postedBy: PostedByI,
}
