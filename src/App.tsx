
import { Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { BlogContextProvider } from './context/BlogContext'
import BlogPage from './pages/BlogPage'
import { CreateBlog } from './pages/CreateBlog'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'

function App() {
const token=localStorage.getItem('token')

  return (
  <>
<AuthContextProvider>
<BlogContextProvider>
<Routes>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/create-blog' element={token?<CreateBlog/>:<Login/>}/>
    <Route path='/show-blog' element={token?<BlogPage/>:<Login/>}/>
    <Route path='/profile' element={token?<Profile/>:<Login/>}/>
  </Routes>
</BlogContextProvider>
</AuthContextProvider>

  </>
  )
}

export default App