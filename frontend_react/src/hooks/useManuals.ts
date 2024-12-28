import { Manual } from "@/interfaces/Manual";
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

const useManuals = () => {
    const [manuals, setManuals] = useState<Manual[]>([] as Manual[]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const controller = new AbortController();
        axios
            .get<Manual[]>("http://127.0.0.1:8000/root/manuals/", {
                signal: controller.signal,
            })
            .then((response) => {
                setIsLoading(false);
                setManuals(response.data);
            })
            .catch((error: Error) => {
                if (error instanceof CanceledError) return;
                setIsLoading(false);
                setError(error.message);
            });
    }, []);

    return { manuals, error, isLoading };
};

export default useManuals;
