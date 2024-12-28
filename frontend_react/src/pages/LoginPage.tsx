import AuthContext from "@/contexts/authContext";
import { UserCredentials } from "@/interfaces/allIntefaces";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
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
            <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input {...register("username")} />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register("password")} />
            </FormControl>

            <Button type="submit">Log In</Button>
        </form>
    );
};

export default LoginPage;
