import Layout from "@/components/Layout";
import { Tokens, User, UserCredentials } from "@/interfaces/allIntefaces";
import { Registration } from "@/interfaces/allIntefaces";
import { ORIGIN } from "@/settings/development";
import { handleAxiosError } from "@/utils/utils";
import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Interfaces
interface AuthContext {
    registration: (userInputs: Registration) => Promise<void>;
    login: (userInputs: UserCredentials) => Promise<void>;
    logout: () => void;
    user: User | null;
    setUser: (user: User) => void;
    tokens: Tokens | null;
    setTokens: (tokens: Tokens) => void;
}

// The context
const AuthContext = createContext<AuthContext>({} as AuthContext);
export default AuthContext;

// The custom provider
export const AuthProvider = () => {
    const [tokens, setTokens] = useState<Tokens | null>(() => {
        // To set an initial value, let's check if there are already tokens in the localStorage
        const stringifyTokens = localStorage.getItem("tokens");
        return stringifyTokens ? JSON.parse(stringifyTokens) : null;
    });

    const [user, setUser] = useState<User | null>(() => {
        // To set an initial value, let's check if there is already an access token.
        // If so, let's decode it to get the User
        const stringifyTokens = localStorage.getItem("tokens");

        if (stringifyTokens) {
            const tokens: Tokens = JSON.parse(stringifyTokens);
            return jwtDecode(tokens.access);
        } else {
            return null;
        }
    });

    const navigate = useNavigate();

    const contextData: AuthContext = {
        registration: (userInputs: Registration) => {
            return axios
                .post(`${ORIGIN}auth/users/`, userInputs)
                .then(() => {
                    console.log("New user created.");
                    console.log("Redirecting to the home page.");
                    navigate("/");
                })
                .catch(handleAxiosError);
        },

        login: (userInputs: UserCredentials) => {
            return axios
                .post<
                    Tokens,
                    AxiosResponse<Tokens, UserCredentials>,
                    UserCredentials
                >(`${ORIGIN}auth/jwt/create/`, userInputs)
                .then((response) => {
                    // store the tokens into the local storage
                    localStorage.setItem(
                        "tokens",
                        JSON.stringify(response.data)
                    );

                    setTokens(response.data);
                    // decode the tokens and update user
                    setUser(jwtDecode(response.data.access));

                    navigate("/");
                })
                .catch(handleAxiosError);
        },

        logout: () => {
            // remove tokens from local storage
            localStorage.removeItem("tokens");
            setTokens(null);
            setUser(null);
            navigate("/");
        },

        user,
        setUser,
        tokens,
        setTokens,
    };

    useEffect(() => {
        console.log("Application start");
    }, [user, tokens]);

    return (
        <AuthContext.Provider value={contextData}>
            <Layout />
        </AuthContext.Provider>
    );
};
