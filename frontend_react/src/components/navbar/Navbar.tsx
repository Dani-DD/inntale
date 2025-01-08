import { Box, Show } from "@chakra-ui/react";
import NavbarLaptop from "./NavbarLaptop";
import NavbarMobile from "./NavbarMobile";
import { navbarBackgroundColor } from "@/utils/applyingColorsToComponents";

const Navbar = () => {
    return (
        <Box backgroundColor={navbarBackgroundColor}>
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
