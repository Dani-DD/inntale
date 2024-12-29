import CampaignGrid from "@/components/main/CampaignGrid";
import ExpandableList from "@/components/sidebar/ExpandableList";
import useCampaigns from "@/hooks/useCampaigns";
import useManuals from "@/hooks/useManuals";
import usePlayers from "@/hooks/usePlayers";
import { Grid, GridItem, Show } from "@chakra-ui/react";

// Testing
const list = ["Dexter", "Debra", "Lundy", "Doakes", "Henry", "Rita", "Brian"];

const HomePage = () => {
    const { campaigns } = useCampaigns();
    const { manuals } = useManuals();
    const { players } = usePlayers();

    console.log(campaigns);
    console.log(manuals);
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
                    lg: "200px 1fr",
                }}
            >
                <GridItem area="nav">navbar</GridItem>
                <Show above="lg">
                    <GridItem area="sidebar">
                        <ExpandableList list={list} />
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
