import { RegistrationForm } from "@/pages/RegistrationPage";
import axios from "axios";
import { createContext, ReactNode } from "react";

interface AuthContext {
    registration: (userInputs: RegistrationForm) => void;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export default AuthContext;

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    function registration(userInputs: RegistrationForm) {
        axios
            .post("http://127.0.0.1:8000/auth/users/", userInputs)
            .then(() => {
                console.log("New user created.");
                console.log("Redirecting to the homepage.");
            })
            .catch((error: Error) => console.log(error.message));
    }

    const contextData: AuthContext = {
        registration,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
