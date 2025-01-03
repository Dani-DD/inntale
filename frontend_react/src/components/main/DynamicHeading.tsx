import useManuals from "@/hooks/useManuals";
import usePlayers from "@/hooks/usePlayers";
import useFiltersStore from "@/stores/FiltersStore";
import { titleCase } from "@/utils/utils";
import { Heading, Text } from "@chakra-ui/react";

/**
 * This component renders a dynamic heading that change with the selected filter.
 * No filter: "All campaigns"
 * With a manual selected: "<manual> campaigns"
 * With a player selected: "campaigns with <player>"
 * With both manual and player selected: a combination of the previous two.
 * With a searched manual/player/campaign: "Searching <searched string>"
 */

const DynamicHeading = () => {
    const { manuals } = useManuals();
    const { players } = usePlayers();
    const manual_id = useFiltersStore((s) => s.filters.selected_manual);
    const player_id = useFiltersStore((s) => s.filters.selected_player);
    const filters = useFiltersStore((s) => s.filters);

    let headingText = "Campaigns";

    // No filter
    if (
        filters.selected_manual === undefined &&
        filters.selected_player === undefined &&
        (filters.search === undefined || filters.search === "")
    ) {
        headingText = "All Campaigns";
    }

    if (filters.selected_manual) {
        const manual_name = titleCase(
            manuals?.find((manual) => manual.id === manual_id)!.name
        );
        headingText = `${manual_name}'s ${headingText}`;
    }

    if (filters.selected_player) {
        const player = players?.find((player) => player.id === player_id);
        headingText += ` with ${titleCase(player!.first_name)} ${titleCase(
            player!.last_name
        )}`;
    }

    return (
        <>
            <Heading as="h1" paddingLeft="10">
                {headingText}
            </Heading>
            {filters.search && <Text>Searching: {filters.search}</Text>}
        </>
    );
};

export default DynamicHeading;
