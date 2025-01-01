import { create } from "zustand";

// url query parameters
export interface Filters {
    selected_manual?: number;
    selected_player?: number;
}

interface FiltersStore {
    filters: Filters;
    setSelectedManual: (chosenId: number) => void;
    setSelectedPlayer: (chosenId: number) => void;
}

// We create a custom hook that returns the store object
const useFiltersStore = create<FiltersStore>((set) => ({
    filters: {},
    setSelectedManual: (chosenId) =>
        set((initialState) => ({
            filters: {
                ...initialState.filters,
                selected_manual: chosenId,
            },
        })),
    setSelectedPlayer: (chosenId) =>
        set((initialState) => ({
            filters: {
                ...initialState.filters,
                selected_player: chosenId,
            },
        })),
}));

export default useFiltersStore;
