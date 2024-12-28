import AuthContext from "@/contexts/authContext";
import { RegistrationForm } from "@/interfaces/allIntefaces";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

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
            <FormControl isRequired>
                <FormLabel>First name</FormLabel>
                <Input placeholder="John" {...register("first_name")} />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Last name</FormLabel>
                <Input placeholder="Doe" {...register("last_name")} />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder="john_doe@email.com"
                    type="email"
                    {...register("email")}
                />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input placeholder="MightyJoe" {...register("username")} />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                    placeholder="**********"
                    type="password"
                    {...register("password")}
                />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Repeat password</FormLabel>
                <Input
                    placeholder="**********"
                    type="password"
                    {...register("repeat_password")}
                />
            </FormControl>

            {!doPasswordsMatch && (
                <Text color={"red"}>Passwords must match</Text>
            )}

            <Button type="submit">Submit</Button>
        </form>
    );
};

export default RegistrationPage;
