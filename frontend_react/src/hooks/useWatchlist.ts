import { GetWatchlistItem } from "@/interfaces/WatchlistItem";
import useData from "./useData";
import { ORIGIN } from "@/settings/development";

const useWatchlist = () => {
    const {
        fetchedData: watchlist,
        isLoading,
        error,
    } = useData<GetWatchlistItem>(`${ORIGIN}root/watchlist/`, true);

    return { watchlist, isLoading, error };
};

export default useWatchlist;
