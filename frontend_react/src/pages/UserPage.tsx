import AuthContext from "@/contexts/authContext";
import useWatchlistStore from "@/stores/WatchlistStore";
import WatchlistCard from "@/tests/WatchlistCard";
import { fontUserPageHeading } from "@/utils/applyingStylesToComponents";
import { blue_inntale, gold_inntale } from "@/utils/colors";
import { Box, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const UserPage = () => {
    const { user } = useContext(AuthContext);
    const watchlist = useWatchlistStore((s) => s.watchlist);

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <Box
            backgroundColor={blue_inntale}
            border={`2px solid ${blue_inntale}`}
        >
            <Heading
                fontFamily={fontUserPageHeading}
                color={gold_inntale}
                paddingTop="5px"
                width={"fit-content"}
                margin={"60px auto 50px auto"}
                borderTop={`2px solid ${gold_inntale}`}
                borderBottom={`2px solid ${gold_inntale}`}
            >
                Your watchlist
            </Heading>
            <Wrap
                backgroundColor={blue_inntale}
                spacing="20px"
                padding="30px"
                justify={{ base: "center", md: "flex-start" }}
            >
                {watchlist &&
                    watchlist.map((item) => (
                        <WrapItem
                            key={`ChakraWrapItem-for-watchlistItem-${item.id}`}
                        >
                            <WatchlistCard
                                key={`WatchlistCard-for-watchlistItem-${item.id}`}
                                watchlistItem={item}
                            />
                        </WrapItem>
                    ))}
            </Wrap>
        </Box>
    );
};

export default UserPage;
