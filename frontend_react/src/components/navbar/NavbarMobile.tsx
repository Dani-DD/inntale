import AuthContext from "@/contexts/authContext";
import { HStack, Image, Box } from "@chakra-ui/react";
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
                        <NavLink to="/me">{user.username}</NavLink>
                        <NavLink to="/login" onClick={() => logout()}>
                            Logout
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/registration">Register</NavLink>
                    </>
                )}
            </HStack>
            <SearchBox width="100%" />
        </Box>
    );
};

export default NavbarMobile;
