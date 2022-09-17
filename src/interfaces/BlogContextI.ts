import { BlogI } from "./BlogI";

export interface BlogContextI{
    blogs?:BlogI[],
    setBlogs:(blogs:BlogI[])=>void,
    fetch:boolean,
    setFetch:(fetch:boolean)=>any,
    blogWithCategories:(category:string)=>void,
    blog?:BlogI,
    setBlog:(blog:BlogI)=>void,
    fullBlog:(blog:BlogI)=>void,
    editBlog:(blog:BlogI)=>void;
    myBlogs:BlogI[],
    handleUpdateBlog:(blogId:string,title:string, content:string, image:string, category:string)=>void
    setQuery:(query:string)=>void,
    query:string,
    loading:boolean
}