import useCampaigns from "@/hooks/useCampaigns";
import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import CampaignCard from "./CampaignCard";

const CampaignGrid = () => {
    const { campaigns, error, isLoading } = useCampaigns();

    return (
        <>
            {/*Handle errors*/}
            {error && <Text>{error}</Text>}

            <SimpleGrid
                columns={{ sm: 1, md: 2, lg: 3 }}
                spacing="10"
                padding="10"
            >
                {isLoading && <Spinner />}
                {campaigns.map((campaign) => (
                    <CampaignCard campaign={campaign} key={campaign.id} />
                ))}
            </SimpleGrid>
        </>
    );
};

export default CampaignGrid;
