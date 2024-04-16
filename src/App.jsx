
import './App.css'
import useAuthCheck from "./hooks/useAuthCheck";

import PrivateRoute from './routes/privateRoute';
import Register from './pages/register';
import Login from './pages/login';
import BlogDetails from './components/blogs/blogDetails';
import AddABlog from './components/blogs/addABlog'
import Home from './pages/home'
import PublicRoute from './routes/publicRoute';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';


function App() {
    const authChecked = useAuthCheck();

    return !authChecked ? (
        <div>Checking authentication....</div>
    ) : (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                 <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <Home/>
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/blog/:id"
                    element={
                        <PrivateRoute>
                            <BlogDetails />
                        </PrivateRoute>
                    }
                />
                 <Route
                    path="/blog/addABlog"
                    element={
                        <PrivateRoute>
                           <AddABlog></AddABlog>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}
export default App
