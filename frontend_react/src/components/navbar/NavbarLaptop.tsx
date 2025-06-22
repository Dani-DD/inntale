import { HStack, Image, Text } from "@chakra-ui/react";
import logoLaptop from "../../assets/inntale_logo2.png";
import { NavLink, Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { useContext } from "react";
import AuthContext from "@/contexts/authContext";
import DrawerWithForm from "./DrawerWithForm";
import ReusableForm from "./ReusableForm";
import { loginFormFields, registrationFormFields } from "@/utils/utils";

const NavbarLaptop = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <HStack spacing="35px" padding="15px" justifyContent="space-between">
            <Link to="/">
                <Image
                    src={logoLaptop}
                    alt="InnTale logo"
                    height="100px"
                    objectFit={"contain"}
                />
            </Link>
            <SearchBox />
            <HStack height="100%" spacing="35px" padding="15px">
                <HStack spacing="25px">
                    {user ? (
                        <>
                            <NavLink to="/me">
                                <Text
                                    _hover={{
                                        color: "white",
                                        borderBottom: "1px solid white",
                                    }}
                                >
                                    {user.username}
                                </Text>
                            </NavLink>
                            <NavLink to="/" onClick={() => logout()}>
                                <Text
                                    _hover={{
                                        color: "white",
                                        borderBottom: "1px solid white",
                                    }}
                                >
                                    Logout
                                </Text>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <DrawerWithForm
                                openButtonText={"Log in"}
                                drawerHeaderText={"Access to your account"}
                                formComponent={
                                    <ReusableForm
                                        inputFields={loginFormFields}
                                        isRegistrationForm={false}
                                        form_id_attribute={"login-form"}
                                    />
                                }
                                button_form_attribute={"login-form"}
                                textSubmitButton={"Log in"}
                            />
                            <DrawerWithForm
                                openButtonText={"Register"}
                                drawerHeaderText={"Create your account"}
                                formComponent={
                                    <ReusableForm
                                        inputFields={registrationFormFields}
                                        isRegistrationForm={true}
                                        form_id_attribute={"registration-form"}
                                    />
                                }
                                button_form_attribute={"registration-form"}
                                textSubmitButton={"Register"}
                            />
                        </>
                    )}
                </HStack>
            </HStack>
        </HStack>
    );
};

export default NavbarLaptop;
