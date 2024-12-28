import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

const useData = <T>(endpoint: string) => {
    const [fetchedData, setFetchedData] = useState<T[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch data
    useEffect(() => {
        const controller = new AbortController();

        axios
            .get<T[]>(endpoint, { signal: controller.signal })
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
    }, []);

    return { fetchedData, error, isLoading };
};

export default useData;
