import AuthContext from "@/contexts/authContext";
import { UserCredentials } from "@/interfaces/allIntefaces";
import { blue_inntale } from "@/utils/colors";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";

// This is the structure of the TS object mapped to a Chakra UI's form
interface ChakraLoginFormElement {
    label: string;
    type: string;
    registerName: keyof UserCredentials;
}

const LoginPage = () => {
    const { register, handleSubmit } = useForm<UserCredentials>();

    const { login } = useContext(AuthContext);

    const onSubmit = handleSubmit((data) => {
        login(data);
    });

    // This array will be used to contruct the form by calling the map method that will convert every object
    // into a Chakra UI's FormControl element
    const formStructure: ChakraLoginFormElement[] = [
        {
            label: "Username",
            type: "text",
            registerName: "username",
        },
        {
            label: "Password",
            type: "password",
            registerName: "password",
        },
    ];

    const chakraLoginForm = formStructure.map((formElement) => (
        <FormControl isRequired>
            <FormLabel>{formElement.label}</FormLabel>
            <Input
                type={formElement.type}
                variant="filled"
                marginBottom="20px"
                {...register(formElement.registerName)}
            />
        </FormControl>
    ));

    return (
        <Box backgroundColor={blue_inntale} padding="30px" paddingTop={"25px"}>
            <Box maxWidth={"500px"} marginLeft="auto" marginRight="auto">
                <form method="POST" onSubmit={onSubmit}>
                    {chakraLoginForm}
                    <Button type="submit" marginTop="20px" marginBottom="80px">
                        Log In
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default LoginPage;
