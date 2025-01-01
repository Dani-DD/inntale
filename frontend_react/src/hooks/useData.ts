import { Filters } from "@/stores/FiltersStore";
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

const useData = <T>(endpoint: string, filters?: Filters) => {
    const [fetchedData, setFetchedData] = useState<T[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    console.log(filters);

    // Fetch data
    useEffect(() => {
        const controller = new AbortController();

        axios
            .get<T[]>(endpoint, {
                signal: controller.signal,
                params: {
                    manual: filters?.selected_manual,
                    campaign_cast__player: filters?.selected_player,
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
