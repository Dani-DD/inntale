import { Manual } from "@/interfaces/Manual";
import useData from "./useData";

const useManuals = () => {
    const {
        fetchedData: manuals,
        error,
        isLoading,
    } = useData<Manual>("http://127.0.0.1:8000/root/manuals/");

    return { manuals, error, isLoading };
};

export default useManuals;
