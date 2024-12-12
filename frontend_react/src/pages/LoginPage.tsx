import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import AuthContext from "@/contexts/authContext";
import { UserCredentials } from "@/interfaces/allIntefaces";
import { Input } from "@chakra-ui/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
    const { register, handleSubmit } = useForm<UserCredentials>();

    const { login } = useContext(AuthContext);

    const onSubmit = handleSubmit((data) => {
        login(data);
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
