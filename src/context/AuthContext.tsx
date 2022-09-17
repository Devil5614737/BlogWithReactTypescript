import jwtDecode from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";
import { AuthContextI } from "../interfaces/AuthContextI";
import { CurrentUserI } from "../interfaces/User";

export const AuthContext = createContext({} as AuthContextI);

interface AuthContextProviderI {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderI) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserI>();



  useEffect(()=>{
   const token=localStorage.getItem('token')
 if(token){
  const decoded=jwtDecode(token)
  setCurrentUser(decoded as CurrentUserI)
 }
 else{
  setCurrentUser(null as any)
 }
  },[])



  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
