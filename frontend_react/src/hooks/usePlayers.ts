import { Player } from "@/interfaces/Player";
import useData from "./useData";

const usePlayers = () => {
    const {
        fetchedData: players,
        error,
        isLoading,
    } = useData<Player>("http://127.0.0.1:8000/root/players/");

    return { players, error, isLoading };
};

export default usePlayers;
