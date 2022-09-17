import { CurrentUserI } from "./User";

export interface AuthContextI{
currentUser?:CurrentUserI,
setCurrentUser:(currentUser:CurrentUserI)=>void
}