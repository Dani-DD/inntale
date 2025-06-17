import { Box, Show } from "@chakra-ui/react";
import NavbarLaptop from "./NavbarLaptop";
import NavbarMobile from "./NavbarMobile";
import {
    fontNavbar,
    navbarBackgroundColor,
} from "@/utils/applyingStylesToComponents";

const Navbar = () => {
    return (
        <Box backgroundColor={navbarBackgroundColor} fontFamily={fontNavbar}>
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
