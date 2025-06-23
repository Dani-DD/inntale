// LoadWatchlist.tsx
import { useEffect } from "react";
import useWatchlistStore from "@/stores/WatchlistStore";
import usePrivateAxios from "@/hooks/usePrivateAxios";

const LoadWatchlist = () => {
    const setWatchlist = useWatchlistStore((s) => s.setWatchlist);
    const axiosInstance = usePrivateAxios();

    useEffect(() => {
        axiosInstance
            .get("root/watchlist/")
            .then((response) => setWatchlist(response.data))
            .catch((error) => console.error("Watchlist fetch error:", error));
    }, [axiosInstance, setWatchlist]);

    return null; // It doesn't render anything
};

export default LoadWatchlist;
