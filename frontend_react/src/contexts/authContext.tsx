import { Tokens, User, UserCredentials } from "@/interfaces/allIntefaces";
import { RegistrationForm } from "@/interfaces/allIntefaces";
import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useState } from "react";

interface AuthContext {
    registration: (userInputs: RegistrationForm) => Promise<void>;
    login: (userInputs: UserCredentials) => Promise<void>;
    user: User | null;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export default AuthContext;

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(() => {
        const stringifyTokens = localStorage.getItem("tokens");

        if (stringifyTokens) {
            const tokens: Tokens = JSON.parse(stringifyTokens);
            return jwtDecode(tokens.access);
        } else {
            return null;
        }
    });

    function registration(userInputs: RegistrationForm) {
        return axios
            .post("http://127.0.0.1:8000/auth/users/", userInputs)
            .then(() => {
                console.log("New user created.");
                console.log("Redirecting to the homepage.");
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

                // decode the tokens
                setUser(jwtDecode(response.data.access));
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
            {children}
        </AuthContext.Provider>
    );
};
