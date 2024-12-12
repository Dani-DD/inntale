import { HStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <HStack
            border={"2px solid black"}
            height={"50px"}
            justifyContent={"space-around"}
            marginBottom={"20px"}
        >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/registration">Register</NavLink>
        </HStack>
    );
};

export default Navbar;
