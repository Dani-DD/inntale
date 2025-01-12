import { HStack, Image } from "@chakra-ui/react";
import logoLaptop from "../../assets/inntale_logo2.png";
import { NavLink, Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { useContext } from "react";
import AuthContext from "@/contexts/authContext";

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
                <HStack spacing="10px">
                    {user ? (
                        <>
                            <p>{user.username}</p>
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
            </HStack>
        </HStack>
    );
};

export default NavbarLaptop;
