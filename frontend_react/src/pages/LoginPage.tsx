import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface UserCredentials {
    username: string;
    password: string;
}

const LoginPage = () => {
    const { register, handleSubmit } = useForm<UserCredentials>();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <form method="POST" onSubmit={onSubmit}>
            <Field label="Username" required>
                <Input {...register("username")} />
            </Field>

            <Field label="Password" required>
                <PasswordInput {...register("password")} />
            </Field>

            <Button type="submit">Log In</Button>
        </form>
    );
};

export default LoginPage;
