import AuthContext from "@/contexts/authContext";
import usePrivateAxios from "@/hooks/usePrivateAxios";
import useWatchlistStore from "@/stores/WatchlistStore";
import { blue_inntale } from "@/utils/colors";
import {
    Box,
    Button,
    Heading,
    ListItem,
    UnorderedList,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const UserPage = () => {
    const { user } = useContext(AuthContext);
    const privateAxiosObject = usePrivateAxios();

    const watchlist = useWatchlistStore((s) => s.watchlist);
    const removeFromWatchlist = useWatchlistStore((s) => s.removeFromWatchlist);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <Box backgroundColor={blue_inntale} padding="20px">
            <Heading>User's informations</Heading>
            <UnorderedList>
                <ListItem>{user.first_name}</ListItem>
                <ListItem>{user.last_name}</ListItem>
                <ListItem>{user.email}</ListItem>
                <ListItem>{user.username}</ListItem>
            </UnorderedList>

            <Heading mt="8">User's watchlist</Heading>
            <UnorderedList>
                {watchlist.map((watchlistItem) => (
                    <Box key={watchlistItem.id} mb="4">
                        <ListItem>
                            {`${watchlistItem.campaign.name} S${watchlistItem.campaign.season}`}
                        </ListItem>
                        <Button
                            mt="2"
                            colorScheme="red"
                            onClick={() => {
                                privateAxiosObject
                                    .delete(
                                        `root/watchlist/${watchlistItem.id}/`
                                    )
                                    .then(() => {
                                        removeFromWatchlist(
                                            watchlistItem.campaign.id
                                        );
                                    })
                                    .catch((error: Error) =>
                                        console.error(
                                            "Watchlist deletion error:",
                                            error.message
                                        )
                                    );
                            }}
                        >
                            Remove from watchlist
                        </Button>
                    </Box>
                ))}
            </UnorderedList>
        </Box>
    );
};

export default UserPage;
