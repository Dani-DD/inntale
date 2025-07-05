import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import LoadWatchlist from "./main/LoadWatchlist";
import { Box } from "@chakra-ui/react";
import { blue_inntale } from "@/utils/colors";

const Layout = () => {
    return (
        <Box
            backgroundColor={blue_inntale}
            display="flex"
            flexDirection={"column"}
            minHeight={"100vh"}
        >
            <Navbar />
            <LoadWatchlist />
            <Outlet />
        </Box>
    );
};

export default Layout;
