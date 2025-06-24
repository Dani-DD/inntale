import AuthContext from "@/contexts/authContext";
import useWatchlistStore from "@/stores/WatchlistStore";
import WatchlistCard from "@/tests/WatchlistCard";
import { blue_inntale } from "@/utils/colors";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const UserPage = () => {
    const { user } = useContext(AuthContext);
    const watchlist = useWatchlistStore((s) => s.watchlist);

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <Wrap
            backgroundColor={blue_inntale}
            spacing="20px"
            padding="10px"
            justify={{ base: "center", md: "flex-start" }}
        >
            {watchlist &&
                watchlist.map((item) => (
                    <WrapItem>
                        <WatchlistCard
                            key={item.campaign.id}
                            watchlistItem={item}
                        />
                    </WrapItem>
                ))}
        </Wrap>
    );
};

export default UserPage;
