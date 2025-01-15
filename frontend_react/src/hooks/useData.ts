import { Filters } from "@/stores/FiltersStore";
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import usePrivateAxios from "./usePrivateAxios";

const useData = <T>(
    endpoint: string,
    isEndpointProtected: boolean,
    filters?: Filters
) => {
    const [fetchedData, setFetchedData] = useState<T[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    let axiosObject = usePrivateAxios();
    if (!isEndpointProtected) {
        axiosObject = axios;
    }

    // Fetch data
    useEffect(() => {
        const controller = new AbortController();

        axiosObject
            .get<T[]>(endpoint, {
                signal: controller.signal,
                params: {
                    manual: filters?.selected_manual,
                    campaign_cast__player: filters?.selected_player,
                    search: filters?.search,
                    ordering: filters?.ordering,
                },
            })
            .then((response) => {
                setIsLoading(false);
                setFetchedData(response.data);
            })
            .catch((error: Error) => {
                if (error instanceof CanceledError) return;
                setError(error.message);
                setIsLoading(false);
            });

        return () => controller.abort();
    }, [filters]);

    return { fetchedData, error, isLoading };
};

export default useData;
