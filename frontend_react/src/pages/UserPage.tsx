import AuthContext from "@/contexts/authContext";
import useWatchlist from "@/hooks/useWatchlist";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const UserPage = () => {
    const { user } = useContext(AuthContext);
    const { watchlist } = useWatchlist();
    console.log(watchlist);

    if (!user) {
        <Navigate to="/login" />;
    }

    return (
        <>
            <UnorderedList>
                <ListItem>{user!.first_name}</ListItem>
                <ListItem>{user!.last_name}</ListItem>
                <ListItem>{user!.email}</ListItem>
                <ListItem>{user!.username}</ListItem>
            </UnorderedList>
        </>
    );
};

export default UserPage;
