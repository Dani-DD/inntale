import CampaignGrid from "@/components/main/CampaignGrid";
import ManualsList from "@/components/sidebar/ManualsList";
import PlayersList from "@/components/sidebar/PlayersList";
import { Grid, GridItem, Show } from "@chakra-ui/react";

const HomePage = () => {
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
                        <PlayersList />
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
