import { Campaign } from "@/interfaces/Campaign";
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

const useCampaigns = () => {
    /**
     * This custom hooks returns a plain object that contains the fetched data,
     * any errors and the loading status.
     *
     * All of these 3 properties are tracked and updated using the React state.
     */

    const [campaigns, setCampaigns] = useState<Campaign[]>([] as Campaign[]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch data from the server
    useEffect(() => {
        const controller = new AbortController();
        axios
            .get<Campaign[]>("http://127.0.0.1:8000/root/campaigns/", {
                signal: controller.signal,
            })
            .then((response) => {
                setCampaigns(response.data);
                setIsLoading(false);
            })
            .catch((error: Error) => {
                if (error instanceof CanceledError) return;
                setError(error.message);
                setIsLoading(false);
            });

        return () => controller.abort();
    }, []);

    return { campaigns, error, isLoading };
};

export default useCampaigns;
