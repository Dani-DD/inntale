/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthContext from "@/contexts/authContext";
import { Registration, UserCredentials } from "@/interfaces/allIntefaces";
import { labelFormColor } from "@/utils/applyingStylesToComponents";
import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";

export interface InputField<T> {
    inputType: string;
    labelText: string;
    name: keyof T;
}

interface Props {
    inputFields: InputField<UserCredentials>[] | InputField<Registration>[];
    isRegistrationForm: boolean;
    form_id_attribute: string;
}

const ReusableForm = ({
    inputFields,
    isRegistrationForm,
    form_id_attribute,
}: Props) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<UserCredentials | Registration>();

    const { login, registration } = useContext(AuthContext);
    const onSubmit = handleSubmit(async (data) => {
        try {
            if (isRegistrationForm) {
                await registration(data as Registration);
            }

            await login(data);
        } catch (err) {
            console.log("Handling errors...");
            const serverErrors = err as Record<string, string[] | string>;
            Object.entries(serverErrors).forEach(([field, messages]) => {
                const message = Array.isArray(messages)
                    ? messages[0]
                    : messages;
                const targetField = field === "detail" ? "password" : field;

                setError(targetField as keyof UserCredentials, {
                    type: "manual",
                    message,
                });
            });
        }
    });

    return (
        <form method="POST" onSubmit={onSubmit} id={form_id_attribute}>
            {inputFields.map((inputField) => (
                <FormControl
                    isRequired
                    key={`${isRegistrationForm ? "register" : "login"}-${
                        inputField.name
                    }`}
                >
                    <FormLabel color={labelFormColor}>
                        {inputField.labelText}
                    </FormLabel>
                    <Input
                        type={inputField.inputType}
                        variant="filled"
                        marginBottom="20px"
                        {...register(inputField.name)}
                    />
                    {(errors as any)[`${inputField.name}`]?.message && (
                        <Text color="red.400" marginBottom={"10px"}>
                            {(errors as any)[`${inputField.name}`]?.message}
                        </Text>
                    )}
                </FormControl>
            ))}
        </form>
    );
};

export default ReusableForm;
