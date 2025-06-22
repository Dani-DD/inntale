import AuthContext from "@/contexts/authContext";
import { HStack, Image, Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logoMobile from "../../assets/inntale_transparent_logo.png";
import SearchBox from "./SearchBox";
import DrawerWithForm from "./DrawerWithForm";
import ReusableForm from "./ReusableForm";
import { loginFormFields, registrationFormFields } from "@/utils/utils";

const NavbarMobile = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <Box padding="10px">
            <HStack justifyContent={"space-around"} marginBottom="10px">
                <Link to="/">
                    <Image src={logoMobile} alt="InnTale logo" width="100px" />
                </Link>
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
            <SearchBox width="100%" />
        </Box>
    );
};

export default NavbarMobile;
