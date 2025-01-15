import { Campaign } from "@/interfaces/Campaign";
import useData from "./useData";
import { Filters } from "@/stores/FiltersStore";

const useCampaigns = (filters?: Filters) => {
    const {
        fetchedData: campaigns,
        error,
        isLoading,
    } = useData<Campaign>(
        "http://127.0.0.1:8000/root/campaigns/",
        false,
        filters
    );

    return { campaigns, error, isLoading };
};

export default useCampaigns;
