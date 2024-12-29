import CampaignGrid from "@/components/main/CampaignGrid";
import ManualsList from "@/components/sidebar/ManualsList";
import useCampaigns from "@/hooks/useCampaigns";
import usePlayers from "@/hooks/usePlayers";
import { Grid, GridItem, Show } from "@chakra-ui/react";

const HomePage = () => {
    const { campaigns } = useCampaigns();
    const { players } = usePlayers();

    console.log(campaigns);
    console.log(players);

    return (
        <>
            <Grid
                templateAreas={{
                    base: `"nav" "main"`,
                    lg: `"nav nav" "sidebar main"`,
                }}
                templateColumns={{
                    base: "1fr",
                    lg: "250px 1fr",
                }}
            >
                <GridItem area="nav">navbar</GridItem>
                <Show above="lg">
                    <GridItem area="sidebar">
                        <ManualsList />
                    </GridItem>
                </Show>
                <GridItem area="main">
                    <CampaignGrid />
                </GridItem>
            </Grid>
        </>
    );
};

export default HomePage;
