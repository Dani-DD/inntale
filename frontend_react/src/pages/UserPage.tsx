import AuthContext from "@/contexts/authContext";
import useWatchlist from "@/hooks/useWatchlist";
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
    const { watchlist } = useWatchlist();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <Box backgroundColor={blue_inntale} padding="20px">
            <Heading>User's informations</Heading>
            <UnorderedList>
                <ListItem>{user!.first_name}</ListItem>
                <ListItem>{user!.last_name}</ListItem>
                <ListItem>{user!.email}</ListItem>
                <ListItem>{user!.username}</ListItem>
            </UnorderedList>

            <Heading>User's watchlist</Heading>
            <UnorderedList>
                {watchlist.map((watchlistItem) => (
                    <>
                        <ListItem>{`${watchlistItem.campaign.name} S${watchlistItem.campaign.season}`}</ListItem>
                        <Button colorScheme="red">Remove from watchlist</Button>
                    </>
                ))}
            </UnorderedList>
        </Box>
    );
};

export default UserPage;
