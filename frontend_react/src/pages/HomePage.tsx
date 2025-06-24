import CampaignGrid from "@/components/main/CampaignGrid";
import DynamicHeading from "@/components/main/DynamicHeading";
import SortSelector from "@/components/main/SortSelector";
import ManualsList from "@/components/sidebar/ManualsList";
import PlayersList from "@/components/sidebar/PlayersList";
import SettingsList from "@/components/sidebar/SettingsList";
import useFiltersStore from "@/stores/FiltersStore";
import {
    fontSidebar,
    mainBackgroundColor,
    mainBorderWidth,
    sidebarBackgroundColor,
} from "@/utils/applyingStylesToComponents";
import { blue_inntale } from "@/utils/colors";
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
                    lg: "252px 1fr",
                }}
                backgroundColor={blue_inntale}
            >
                <Show above="lg">
                    <GridItem
                        area="sidebar"
                        backgroundColor={sidebarBackgroundColor}
                        paddingLeft="5"
                        paddingTop="160px"
                        fontFamily={fontSidebar}
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
                    paddingTop={"30px"}
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
