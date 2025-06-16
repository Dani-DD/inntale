import useData from "./useData";
import { ORIGIN } from "@/settings/development";
import { Setting } from "@/interfaces/Setting";

const useSettings = () => {
    const {
        fetchedData: settings,
        error,
        isLoading,
    } = useData<Setting>(`${ORIGIN}root/settings/`, false);

    return { settings, error, isLoading };
};

export default useSettings;
