import useManuals from "@/hooks/useManuals";
import usePlayers from "@/hooks/usePlayers";
import useSettings from "@/hooks/useSettings";
import { Manual } from "@/interfaces/Manual";
import { Player } from "@/interfaces/Player";
import { Setting } from "@/interfaces/Setting";
import useFiltersStore, { Filters } from "@/stores/FiltersStore";
import { fontDynamicHeading } from "@/utils/applyingStylesToComponents";
import { gold_inntale } from "@/utils/colors";
import { titleCase } from "@/utils/utils";
import { Box, Heading } from "@chakra-ui/react";

/**
 * This component renders a dynamic heading that changes with the selected filter.
 * No filter: "All campaigns".
 * With filters: "Campaigns with:" and below a list of strings that represent the selected filters.
 * For example:
 *
 * Campaigns with: <- Main header
 * - Brancalonia      <- sub-header
 * - Andrea Guagnini  <- sub-header
 * - Original IP      <- sub-header
 *
 * With a searched manual/player/campaign/...: "- Searching for: <searched string>"
 *
 */

const DynamicHeading = () => {
    // No filters? So render "All campaigns", otherwise "Campaigns with:"
    const filters = useFiltersStore((s) => s.filters);
    const headingText = Object.values(filters).every((val) => !val)
        ? "All Campaigns"
        : "Campaigns with:";

    // This function creates the strings for the sub-headers
    const createSubHeadingText = <T extends { id: number }>(
        list: T[],
        property: string
    ) => {
        if (property === "search")
            return filters.search ? `Searching for: ${filters.search}` : "";

        const query_id = filters[property as keyof Filters];

        if (query_id === undefined) return "";

        const item = list.find((item) => item.id === query_id);

        switch (property) {
            case "selected_manual": {
                // In this case, "item" is surely a Manual
                // To avoid TypeScript's warnings for converting a generic T type into a Manual,
                // we need to use a double Type Assertion
                const manual: Manual = item as unknown as Manual;
                return manual ? manual.name : "";
            }

            case "selected_player": {
                const player: Player = item as unknown as Player;
                return player
                    ? `${titleCase(player.first_name)} ${titleCase(
                          player.last_name
                      )}`
                    : "";
            }
            case "selected_setting": {
                const setting: Setting = item as unknown as Setting;
                return setting ? setting.name : "";
            }
        }
    };

    const { manuals } = useManuals();
    const { players } = usePlayers();
    const { settings } = useSettings();

    const subHeadingStrings = [
        {
            filter: "selected_manual",
            list: manuals as Manual[],
        },
        {
            filter: "selected_player",
            list: players as Player[],
        },
        {
            filter: "selected_setting",
            list: settings as Setting[],
        },
        {
            filter: "search",
            list: [] as any[],
        },
    ].map((obj) => createSubHeadingText(obj.list, obj.filter));

    return (
        <Box marginBottom={"4"}>
            {/* Main header */}
            <Heading
                as="h1"
                fontFamily={fontDynamicHeading}
                width={"fit-content"}
                color={gold_inntale}
                paddingBottom={"8px"}
                borderBottom={`2px solid ${gold_inntale}`}
            >
                {headingText}
            </Heading>
            {/* Sub-headers */}
            {subHeadingStrings.map(
                (name, index) =>
                    name && (
                        <Heading
                            key={index}
                            as="h2"
                            fontSize="20px"
                            fontFamily={fontDynamicHeading}
                            width={"fit-content"}
                            paddingLeft={"30px"}
                            marginTop="10px"
                        >
                            {`- ${name}`}
                        </Heading>
                    )
            )}
        </Box>
    );
};

export default DynamicHeading;
