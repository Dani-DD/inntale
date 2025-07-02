import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/authContext";
import UserPage from "@/pages/UserPage";
import TestPage from "../tests/TestPage";

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
                path: "/me",
                element: <UserPage />,
            },
            {
                path: "/test",
                element: <TestPage />,
            },
        ],
    },
]);

export default router;
