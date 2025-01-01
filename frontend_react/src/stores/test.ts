import { create } from "zustand";

interface TestingStore {
    selectedId?: number;
    setSelectedId: (chosenId: number) => void;
}

// We create a custom hook that returns the store object
const useTestStore = create<TestingStore>((set) => ({
    selectedId: undefined, // The initial value of the state: no id has been selected yet.
    setSelectedId: (chosenId: number) => set(() => ({ selectedId: chosenId })),
}));

export default useTestStore;
