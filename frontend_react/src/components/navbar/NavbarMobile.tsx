import AuthContext from "@/contexts/authContext";
import { HStack, Image, Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logoMobile from "../../assets/inntale_transparent_logo.png";
import SearchBox from "./SearchBox";

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
                        <NavLink to="/login" onClick={() => logout()}>
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
                        <NavLink to="/login">
                            <Text
                                _hover={{
                                    color: "white",
                                    borderBottom: "1px solid white",
                                }}
                            >
                                Login
                            </Text>
                        </NavLink>
                        <NavLink to="/registration">
                            <Text
                                _hover={{
                                    color: "white",
                                    borderBottom: "1px solid white",
                                }}
                            >
                                Register
                            </Text>
                        </NavLink>
                    </>
                )}
            </HStack>
            <SearchBox width="100%" />
        </Box>
    );
};

export default NavbarMobile;
