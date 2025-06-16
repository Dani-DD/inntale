import CampaignGrid from "@/components/main/CampaignGrid";
import DynamicHeading from "@/components/main/DynamicHeading";
import SortSelector from "@/components/main/SortSelector";
import ManualsList from "@/components/sidebar/ManualsList";
import PlayersList from "@/components/sidebar/PlayersList";
import SettingsList from "@/components/sidebar/SettingsList";
import useFiltersStore from "@/stores/FiltersStore";
import {
    mainBackgroundColor,
    mainBorderWidth,
    sidebarBackgroundColor,
} from "@/utils/applyingStylesToComponents";
import { Grid, GridItem, Show } from "@chakra-ui/react";

const HomePage = () => {
    const ordering = useFiltersStore((s) => s.filters.ordering);
    return (
        <>
            <Grid
                templateAreas={{
                    base: `"main"`,
                    lg: `"sidebar main"`,
                }}
                templateColumns={{
                    base: "1fr",
                    lg: "250px 1fr",
                }}
            >
                <Show above="lg">
                    <GridItem
                        area="sidebar"
                        backgroundColor={sidebarBackgroundColor}
                        paddingLeft="5"
                        paddingTop="150px"
                    >
                        <ManualsList />
                        <PlayersList />
                        <SettingsList />
                    </GridItem>
                </Show>
                <GridItem
                    area="main"
                    backgroundColor={mainBackgroundColor}
                    borderWidth={mainBorderWidth}
                    paddingLeft="10"
                >
                    <DynamicHeading />
                    <SortSelector orderBy={ordering} />
                    <CampaignGrid />
                </GridItem>
            </Grid>
        </>
    );
};

export default HomePage;
