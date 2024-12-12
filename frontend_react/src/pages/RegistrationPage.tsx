import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import AuthContext from "@/contexts/authContext";
import { Input, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

export interface RegistrationForm {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    repeat_password: string;
}

const RegistrationPage = () => {
    const { registration } = useContext(AuthContext);

    const [doPasswordsMatch, setPasswordMatch] = useState<boolean>(true);

    const { register, handleSubmit } = useForm<RegistrationForm>();

    const onSubmit = handleSubmit((data) => {
        console.log("Inserted inputs: ", data);

        if (data.password != data.repeat_password) {
            setPasswordMatch(false);
        } else {
            // send the http-post-request containing user's data
            registration(data);
        }
    });

    return (
        <form method="POST" onSubmit={onSubmit}>
            <Field label="First name" required>
                <Input placeholder="John" {...register("first_name")} />
            </Field>

            <Field label="Last name" required>
                <Input placeholder="Doe" {...register("last_name")} />
            </Field>

            <Field label="Email" required>
                <Input
                    placeholder="john_doe@email.com"
                    type="email"
                    {...register("email")}
                />
            </Field>

            <Field label="Username" required>
                <Input placeholder="MightyJoe" {...register("username")} />
            </Field>

            <Field label="Password" required>
                <PasswordInput
                    placeholder="**********"
                    type="password"
                    {...register("password")}
                />
            </Field>

            <Field label="Repeat password" required>
                <PasswordInput
                    placeholder="**********"
                    type="password"
                    {...register("repeat_password")}
                />
            </Field>

            {!doPasswordsMatch && (
                <Text color={"red"}>Passwords must match</Text>
            )}

            <Button type="submit">Submit</Button>
        </form>
    );
};

export default RegistrationPage;
