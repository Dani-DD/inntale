import useCampaigns from "@/hooks/useCampaigns";
import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import CampaignCard from "./CampaignCard";
import useFiltersStore from "@/stores/FiltersStore";
import { campaignGridBackgroundColor } from "@/utils/applyingColorsToComponents";

const CampaignGrid = () => {
    const filters = useFiltersStore((s) => s.filters);
    console.log(filters);
    const { campaigns, error, isLoading } = useCampaigns(filters);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <SimpleGrid
            columns={{ sm: 1, md: 2, lg: 3 }}
            spacing="10"
            padding="10"
            paddingLeft="0"
            backgroundColor={campaignGridBackgroundColor}
        >
            {campaigns.map((campaign) => (
                <CampaignCard campaign={campaign} key={campaign.id} />
            ))}
        </SimpleGrid>
    );
};

export default CampaignGrid;
