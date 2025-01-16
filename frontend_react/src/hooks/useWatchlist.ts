import { GetWatchlistItem } from "@/interfaces/WatchlistItem";
import useData from "./useData";

const useWatchlist = () => {
    const {
        fetchedData: watchlist,
        isLoading,
        error,
    } = useData<GetWatchlistItem>(
        "http://127.0.0.1:8000/root/watchlist/",
        true
    );

    return { watchlist, isLoading, error };
};

export default useWatchlist;
