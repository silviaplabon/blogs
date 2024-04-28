
import './App.css'
import useAuthCheck from "./hooks/useAuthCheck";

import PrivateRoute from './routes/privateRoute';
import Register from './pages/register';
import Login from './pages/login';
import BlogDetails from './components/blogs/blogDetails';
import AddABlog from './components/blogs/addABlog'
import Home from './pages/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import EditABlog from './components/blogs/editABlog';
import SearchBlogs from './components/searchBlogs/searchBlogs';

function App() {
    const authChecked = useAuthCheck();
    const isLoggedIn = useAuth();

    return !authChecked ? (
        <div>Checking authentication....</div>
    ) : (
        <BrowserRouter>
        <Routes>
            <Route index path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />      
              <Route  path="/blogs/:id" element={<BlogDetails />} />
              <Route  path="/blogs/edit/:id" element={<EditABlog />} />
              <Route  path="/blogs/addABlog" element={<AddABlog/>} />
              <Route   path="/blogs"  element={<Home />} />
              <Route path="/"  element={<Home />} />
              <Route path="/search"  element={<SearchBlogs />} />
        </Routes>
    </BrowserRouter>
    );
}
export default App
