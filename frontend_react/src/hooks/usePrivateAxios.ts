/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthContext from "@/contexts/authContext";
import { DecodedToken, Tokens } from "@/interfaces/allIntefaces";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";

interface RefreshResponse {
    access: string;
}

const BASE_URL = "http://127.0.0.1:8000/";

const usePrivateAxios = () => {
    const { tokens, setTokens, setUser } = useContext(AuthContext);

    const customAxiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `JWT ${tokens?.access}`,
        },
    });

    customAxiosInstance.interceptors.request.use(async (request) => {
        // Check if access token is expired
        const decodedAccessToken: DecodedToken = jwtDecode(tokens!.access);
        const isExpired = dayjs.unix(decodedAccessToken.exp).diff(dayjs()) < 1;

        if (!isExpired) {
            console.log("Token still valid.");
            return request;
        }

        // Refresh token
        console.log("Token expired: requiring a new one...");
        try {
            const response = await axios.post<
                RefreshResponse,
                AxiosResponse<RefreshResponse, any>,
                any
            >(`${BASE_URL}auth/jwt/refresh/`, {
                refresh: tokens!.refresh,
            });

            const newTokens: Tokens = {
                access: response.data.access,
                refresh: tokens!.refresh,
            };

            // Update dependencies
            localStorage.setItem("tokens", JSON.stringify(newTokens));
            setTokens(newTokens);
            setUser(jwtDecode(newTokens.access));

            // Update the access token in the header
            request.headers.Authorization = `JWT ${newTokens.access}`;
        } catch (error) {
            if (error instanceof Error) console.log(error.message);
            else console.log("An expected error occurs.");
        }
        return request;
    });

    return customAxiosInstance;
};

export default usePrivateAxios;
