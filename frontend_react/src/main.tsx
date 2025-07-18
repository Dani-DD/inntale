import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./components/routes.tsx";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ChakraProvider>
            <RouterProvider router={router} />
        </ChakraProvider>
    </StrictMode>
);

// main.tsx -> routes.tsx -> AuthProvider (authContext.tsx) -> Layout
