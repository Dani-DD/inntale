import { create } from "zustand";
import { GetWatchlistItem } from "@/interfaces/WatchlistItem";

interface WatchlistStore {
    watchlist: GetWatchlistItem[];
    setWatchlist: (items: GetWatchlistItem[]) => void;
    addToWatchlist: (item: GetWatchlistItem) => void;
    removeFromWatchlist: (campaignId: number) => void;
}

const useWatchlistStore = create<WatchlistStore>((set) => ({
    watchlist: [],
    setWatchlist: (items) => set({ watchlist: items }),
    addToWatchlist: (item) =>
        set((state) => ({
            watchlist: [...state.watchlist, item],
        })),
    removeFromWatchlist: (campaignId) =>
        set((state) => ({
            watchlist: state.watchlist.filter(
                (item) => item.campaign.id !== campaignId
            ),
        })),
}));

export default useWatchlistStore;
