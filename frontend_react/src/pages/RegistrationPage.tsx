import AuthContext from "@/contexts/authContext";
import { RegistrationForm } from "@/interfaces/allIntefaces";
import { blue_inntale } from "@/utils/colors";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

// This is the structure of the TS object mapped to a Chakra UI's form
interface ChakraRegistrationFormElement {
    label: string;
    placeholder: string;
    type: string;
    registerName: keyof RegistrationForm;
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

    // This array will be used to contruct the form by calling the map method that will convert every object
    // into a Chakra UI's FormControl element
    const formStructure: ChakraRegistrationFormElement[] = [
        {
            label: "First name",
            placeholder: "John",
            type: "text",
            registerName: "first_name",
        },
        {
            label: "Last name",
            placeholder: "Doe",
            type: "text",
            registerName: "last_name",
        },
        {
            label: "Email",
            placeholder: "john_doe@email.com",
            type: "email",
            registerName: "email",
        },
        {
            label: "Username",
            placeholder: "MightyJoe",
            type: "text",
            registerName: "username",
        },
        {
            label: "Password",
            placeholder: "**********",
            type: "password",
            registerName: "password",
        },
        {
            label: "Repeat password",
            placeholder: "**********",
            type: "password",
            registerName: "repeat_password",
        },
    ];

    const chakraRegistrationForm = formStructure.map((formElement) => (
        <FormControl isRequired>
            <FormLabel>{formElement.label}</FormLabel>
            <Input
                placeholder={formElement.placeholder}
                _placeholder={{ opacity: 1, color: "gray.500" }}
                type={formElement.type}
                variant="filled"
                marginBottom="20px"
                {...register(formElement.registerName)}
            />
        </FormControl>
    ));

    return (
        // Container to provide a background color
        <Box backgroundColor={blue_inntale} padding="30px" paddingTop={"25px"}>
            {/* Container to provide a max size to the form */}
            <Box maxWidth={"500px"} marginLeft="auto" marginRight="auto">
                <form method="POST" onSubmit={onSubmit}>
                    {chakraRegistrationForm}

                    {!doPasswordsMatch && (
                        <Text color={"red"}>Passwords must match</Text>
                    )}

                    <Button type="submit" marginTop="20px" marginBottom="80px">
                        Submit
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default RegistrationPage;
