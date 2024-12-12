import Layout from "@/components/Layout";
import { Tokens, User, UserCredentials } from "@/interfaces/allIntefaces";
import { RegistrationForm } from "@/interfaces/allIntefaces";
import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Interfaces
interface AuthContext {
    registration: (userInputs: RegistrationForm) => Promise<void>;
    login: (userInputs: UserCredentials) => Promise<void>;
    user: User | null;
}

// The context
const AuthContext = createContext<AuthContext>({} as AuthContext);
export default AuthContext;

// The custom provider
export const AuthProvider = () => {
    const [user, setUser] = useState<User | null>(() => {
        const stringifyTokens = localStorage.getItem("tokens");

        if (stringifyTokens) {
            const tokens: Tokens = JSON.parse(stringifyTokens);
            return jwtDecode(tokens.access);
        } else {
            return null;
        }
    });

    const navigate = useNavigate();

    function registration(userInputs: RegistrationForm) {
        return axios
            .post("http://127.0.0.1:8000/auth/users/", userInputs)
            .then(() => {
                console.log("New user created.");
                console.log("Redirecting to the homepage.");
                navigate("/");
            })
            .catch((error: Error) => console.log(error.message));
    }

    function login(userInputs: UserCredentials) {
        return axios
            .post<
                Tokens,
                AxiosResponse<Tokens, UserCredentials>,
                UserCredentials
            >("http://127.0.0.1:8000/auth/jwt/create/", userInputs)
            .then((response) => {
                // store the tokens into the local storage
                localStorage.setItem("tokens", JSON.stringify(response.data));

                // decode the tokens and update user
                setUser(jwtDecode(response.data.access));

                navigate("/");
            })
            .catch((error: Error) => console.log(error.message));
    }

    const contextData: AuthContext = {
        registration,
        login,
        user,
    };

    return (
        <AuthContext.Provider value={contextData}>
            <Layout />
        </AuthContext.Provider>
    );
};
