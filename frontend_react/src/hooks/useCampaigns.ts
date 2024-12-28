import { Campaign } from "@/interfaces/Campaign";
import useData from "./useData";

const useCampaigns = () => {
    const {
        fetchedData: campaigns,
        error,
        isLoading,
    } = useData<Campaign>("http://127.0.0.1:8000/root/campaigns/");

    return { campaigns, error, isLoading };
};

export default useCampaigns;
