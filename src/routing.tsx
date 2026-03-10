import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import LoginPage from "./Pages/LoginPage";


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
                element: <ProfilePage />
            },
            {
                path: '/login',
                element: <LoginPage />
            }
        ]
    }
])

export default router;