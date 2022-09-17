import { create } from 'apisauce';

export const client=create({
    baseURL:"https://blog-app211.herokuapp.com/api"
});



client.addAsyncRequestTransform(async (request)=>{
    const authToken=localStorage.getItem('token');
    if(!authToken) return ;
    request.headers["x-auth-token"]=authToken
      });