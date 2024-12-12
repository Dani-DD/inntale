import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./components/routes.tsx";
import { Provider } from "./components/ui/provider.tsx";
import { AuthProvider } from "./contexts/authContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </Provider>
    </StrictMode>
);
