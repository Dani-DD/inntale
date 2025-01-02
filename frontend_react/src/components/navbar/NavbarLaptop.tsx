import { HStack, Image } from "@chakra-ui/react";
import logoLaptop from "../../assets/inntale_logo2.png";
import { NavLink, Link } from "react-router-dom";

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
            <HStack height="100%" spacing="35px" padding="15px">
                <HStack spacing="10px">
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/registration">Register</NavLink>
                </HStack>
            </HStack>
        </HStack>
    );
};

export default NavbarLaptop;
