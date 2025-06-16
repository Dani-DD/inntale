import { Player } from "@/interfaces/Player";
import useData from "./useData";
import { ORIGIN } from "@/settings/development";

const usePlayers = () => {
    const {
        fetchedData: players,
        error,
        isLoading,
    } = useData<Player>(`${ORIGIN}root/players/`, false);

    return { players, error, isLoading };
};

export default usePlayers;
