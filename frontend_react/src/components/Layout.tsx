import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import LoadWatchlist from "./main/LoadWatchlist";

const Layout = () => {
    return (
        <>
            <Navbar />
            <LoadWatchlist />
            <Outlet />
        </>
    );
};

export default Layout;
