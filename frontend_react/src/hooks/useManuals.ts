import { Manual } from "@/interfaces/Manual";
import useData from "./useData";
import { ORIGIN } from "@/settings/development";

const useManuals = () => {
    const {
        fetchedData: manuals,
        error,
        isLoading,
    } = useData<Manual>(`${ORIGIN}root/manuals/`, false);

    return { manuals, error, isLoading };
};

export default useManuals;
