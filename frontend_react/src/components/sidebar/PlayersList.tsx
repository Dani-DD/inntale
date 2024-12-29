import { Spinner, Text } from "@chakra-ui/react";
import ExpandableList, { ListElement } from "./ExpandableList";
import { titleCase } from "@/utils/utils";
import usePlayers from "@/hooks/usePlayers";

const PlayersList = () => {
    const { players, error, isLoading } = usePlayers();

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    /**
     * The ExpandableList component needs an array of ListElement objects,
     * so we convert the "players" variable (an array of Player objects) into it.
     */
    const playersList: ListElement[] = players.map((player) => {
        return {
            name: titleCase(`${player.first_name} ${player.last_name}`),
            tag: player.appearances,
        };
    });

    return <ExpandableList list={playersList} />;
};

export default PlayersList;
