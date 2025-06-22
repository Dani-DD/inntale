export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
}

export interface DecodedToken extends User {
    // id: number;
    // first_name: string;
    // last_name: string;
    // email: string;
    // username: string;
    user_id: number;
    exp: number;
    iat: number;
    jti: string;
    token_type: string;
}

// This is the structure of the JSON object sent to the server for performing registration
export interface Registration extends User {
    // first_name: string;
    // last_name: string;
    // email: string;
    // username: string;
    password: string;
    repeat_password: string;
}

export interface UserCredentials {
    username: string;
    password: string;
}

export interface Tokens {
    access: string;
    refresh: string;
}
