export interface User {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
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
