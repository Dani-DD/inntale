import useCampaigns from "@/hooks/useCampaigns";
import { SimpleGrid, Text } from "@chakra-ui/react";
import CampaignCard from "./CampaignCard";
import useFiltersStore from "@/stores/FiltersStore";
import { campaignGridBackgroundColor } from "@/utils/applyingStylesToComponents";
import useWatchlistStore from "@/stores/WatchlistStore";
import SkeletonCard from "./SkeletonCard";

const CampaignGrid = () => {
    // Fetching the user's watchlist
    const watchlist = useWatchlistStore((s) => s.watchlist);

    // Fetching campaigns
    const filters = useFiltersStore((s) => s.filters);
    const { campaigns, error, isLoading } = useCampaigns(filters);

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
            {isLoading
                ? [0, 1, 2, 3, 4].map(() => <SkeletonCard />)
                : campaigns.map((campaign) => (
                      <CampaignCard
                          campaign={campaign}
                          key={campaign.id}
                          inWatchlist={watchlist.some(
                              (item) => item.campaign.id === campaign.id
                          )}
                      />
                  ))}
        </SimpleGrid>
    );
};

export default CampaignGrid;
