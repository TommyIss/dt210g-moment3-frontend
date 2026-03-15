import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPage from "./Pages/RegisterPage";


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