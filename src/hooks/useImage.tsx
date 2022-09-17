import { useEffect, useState } from "react"

export const useImage=(file:File)=>{
const[url,setUrl]=useState<string>("");
const[error,setError]=useState<string>("");



const postData = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "tzo42pxi");
    data.append("cloud_name", "dwtpwuwax");
    fetch("https://api.cloudinary.com/v1_1/dwtpwuwax/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url)
      })
      .catch((err) => {
        setError(err);
      });
  };




useEffect(()=>{
postData()
},[file])


return {url,error}
}