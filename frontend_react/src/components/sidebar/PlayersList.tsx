import { Spinner, Text } from "@chakra-ui/react";
import ExpandableList from "./ExpandableList";
import { titleCase } from "@/utils/utils";
import usePlayers from "@/hooks/usePlayers";
import { ListItem } from "@/interfaces/ListItem";

const PlayersList = () => {
    const { players, error, isLoading } = usePlayers();

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    /**
     * The ExpandableList component needs an array of ListItem objects,
     * so we convert the "players" variable (an array of Player objects) into it.
     */
    const playersList: ListItem[] = players.map((player) => {
        return {
            id: player.id,
            logo: player.profile_pic,
            name: titleCase(`${player.first_name} ${player.last_name}`),
            counter: player.appearances,
            itemType: "Player",
        };
    });

    /**
     * The first element of the list will be used to built a button that cleans up the selected filter
     */
    playersList.unshift({
        id: undefined,
        name: "All players",
        counter: undefined,
        itemType: "Player",
    });

    return <ExpandableList list={playersList} header="Players" />;
};

export default PlayersList;
