import { useContext, useEffect } from "react";
import AuthContext from "@/contexts/authContext";
import useWatchlistStore from "@/stores/WatchlistStore";
import usePrivateAxios from "@/hooks/usePrivateAxios";

const LoadWatchlist = () => {
    const { user } = useContext(AuthContext);
    const setWatchlist = useWatchlistStore((s) => s.setWatchlist);
    const axiosInstance = usePrivateAxios();

    useEffect(() => {
        if (!user) return; // Skip fetch if anonymous

        axiosInstance
            .get("root/watchlist/")
            .then((response) => setWatchlist(response.data))
            .catch((error) => console.error("Watchlist fetch error:", error));
    }, [axiosInstance, setWatchlist, user]);

    return null;
};

export default LoadWatchlist;
