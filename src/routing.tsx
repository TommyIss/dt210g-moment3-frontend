import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPage from "./Pages/RegisterPage";
import PostsPage from "./Pages/PostsPage";
import PostDetailsPage from "./Pages/PostDetailsPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/posts',
                element: <PostsPage />
            },
            {
                path: '/posts/:id',
                element: <PostDetailsPage />
            },
            {
                path: '/profile',
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                    
                )
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/register',
                element: <RegisterPage />
            }
        ]
    }
])

export default router;