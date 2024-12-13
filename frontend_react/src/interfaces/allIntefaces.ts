/**
 *
 *
 */

export interface User {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
}

export interface DecodedToken extends User {
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

export interface RegistrationForm extends User {
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
