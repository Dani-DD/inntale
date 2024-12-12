import AuthContext from "@/contexts/authContext";
import { Button, HStack } from "@chakra-ui/react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <HStack
            border={"2px solid black"}
            height={"50px"}
            justifyContent={"space-around"}
            marginBottom={"20px"}
        >
            <NavLink to="/">Home</NavLink>

            {user ? (
                <>
                    <p>{user.username}</p>
                    <Button onClick={logout}>Logout</Button>
                </>
            ) : (
                <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/registration">Register</NavLink>
                </>
            )}
        </HStack>
    );
};

export default Navbar;
