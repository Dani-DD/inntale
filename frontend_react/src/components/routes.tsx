import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/authContext";
import UserPage from "@/pages/UserPage";
import PrivatePage from "@/pages/PrivatePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthProvider />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },

            {
                path: "/registration",
                element: <RegistrationPage />,
            },

            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/me",
                element: <UserPage />,
            },
            {
                path: "/protected-endpoint",
                element: <PrivatePage />,
            },
        ],
    },
]);

export default router;
