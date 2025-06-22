import { InputField } from "@/components/navbar/ReusableForm";
import { Registration, UserCredentials } from "@/interfaces/allIntefaces";
import axios from "axios";

export const titleCase = (string: string) => {
    return string
        .split(" ")
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" ");
};

// Used in authContext.tsx
export const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data);
        throw error.response.data;
    } else {
        throw {
            non_field_errors: ["An unexpected error occurred."],
        };
    }
};

// Used for building forms in NavbarLaptop and NavbarMobile with ReusableForm
export const loginFormFields: InputField<UserCredentials>[] = [
    // Field for inserting the username
    {
        inputType: "text",
        labelText: "Username",
        name: "username",
    },
    // Field for inserting the password
    {
        inputType: "password",
        labelText: "Password",
        name: "password",
    },
];

export const registrationFormFields: InputField<Registration>[] = [
    // Field for inserting the first name
    {
        inputType: "text",
        labelText: "First name",
        name: "first_name",
    },

    // Field for inserting the last name
    {
        inputType: "text",
        labelText: "Last name",
        name: "last_name",
    },

    // Field for inserting the email
    {
        inputType: "email",
        labelText: "Email",
        name: "email",
    },

    // Field for inserting the username
    {
        inputType: "text",
        labelText: "Username",
        name: "username",
    },

    // Field for inserting the password
    {
        inputType: "password",
        labelText: "Password",
        name: "password",
    },

    // Field for repeating the password
    {
        inputType: "password",
        labelText: "Repeat password",
        name: "repeat_password",
    },
];
