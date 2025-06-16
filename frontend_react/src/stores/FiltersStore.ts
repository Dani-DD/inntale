import { create } from "zustand";

// url query parameters
export interface Filters {
    selected_manual?: number;
    selected_player?: number;
    selected_setting?: number;
    search?: string;
    ordering?: string;
}

interface FiltersStore {
    filters: Filters;
    setSelectedManual: (chosenId: number | undefined) => void;
    setSelectedPlayer: (chosenId: number | undefined) => void;
    setSelectedSetting: (chosenId: number | undefined) => void;
    setSearch: (searchString: string) => void;
    setOrdering: (ordering: string) => void;
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
    setSelectedSetting: (chosenId) =>
        set((initialState) => ({
            filters: {
                ...initialState.filters,
                selected_setting: chosenId,
            },
        })),
    setSearch: (searchString) =>
        set(() => ({
            filters: {
                search: searchString,
            },
        })),
    setOrdering: (ordering) => {
        set((initialState) => ({
            filters: {
                ...initialState,
                ordering: ordering,
            },
        }));
    },
}));

export default useFiltersStore;
