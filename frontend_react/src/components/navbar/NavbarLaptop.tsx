import { HStack, Image } from "@chakra-ui/react";
import logoLaptop from "../../assets/inntale_logo2.png";
import { NavLink, Link } from "react-router-dom";
import SearchBox from "./SearchBox";

const NavbarLaptop = () => {
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
            <HStack
                height="100%"
                spacing="35px"
                padding="15px"
                border="2px solid red"
            >
                <HStack spacing="10px" border="2px solid green">
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/registration">Register</NavLink>
                </HStack>
            </HStack>
        </HStack>
    );
};

export default NavbarLaptop;
