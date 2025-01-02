import { Box, Show } from "@chakra-ui/react";
import NavbarLaptop from "./NavbarLaptop";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
    return (
        <Box>
            <Show above="650px">
                <NavbarLaptop />
            </Show>
            <Show below="649px">
                <NavbarMobile />
            </Show>
        </Box>
    );
};

export default Navbar;
