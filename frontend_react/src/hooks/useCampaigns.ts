import { Campaign } from "@/interfaces/Campaign";
import useData from "./useData";
import { Filters } from "@/stores/FiltersStore";
import { ORIGIN } from "@/settings/development";

const useCampaigns = (filters?: Filters) => {
    const {
        fetchedData: campaigns,
        error,
        isLoading,
    } = useData<Campaign>(`${ORIGIN}root/campaigns/`, false, filters);

    return { campaigns, error, isLoading };
};

export default useCampaigns;
