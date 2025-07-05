import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import LoadWatchlist from "./main/LoadWatchlist";
import { blue_inntale } from "@/utils/colors";
import { Box } from "@chakra-ui/react";

const Layout = () => {
    return (
        <Box
            backgroundColor={blue_inntale}
            display="flex"
            flexDirection="column"
            minHeight="100vh"
        >
            <Navbar />
            <LoadWatchlist />
            <Outlet />
        </Box>
    );
};

export default Layout;
