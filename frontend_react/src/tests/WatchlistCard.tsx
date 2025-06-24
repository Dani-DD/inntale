import YouTubeButtonLink from "@/components/main/YouTubeButtonLink";
import usePrivateAxios from "@/hooks/usePrivateAxios";
import { GetWatchlistItem } from "@/interfaces/WatchlistItem";
import useWatchlistStore from "@/stores/WatchlistStore";
import {
    campaignCardBackgroundColor,
    fontCardHeader,
} from "@/utils/applyingStylesToComponents";
import { gold_inntale } from "@/utils/colors";
import { titleCase } from "@/utils/utils";
import {
    Box,
    Card,
    CardFooter,
    CardHeader,
    CloseButton,
    Heading,
    Image,
} from "@chakra-ui/react";

interface Props {
    watchlistItem: GetWatchlistItem;
}

const WatchlistCard = ({ watchlistItem }: Props) => {
    const privateAxiosObject = usePrivateAxios();
    const removeFromWatchlist = useWatchlistStore((s) => s.removeFromWatchlist);

    return (
        <Card
            border="solid"
            textAlign="center"
            size="sm"
            backgroundColor={campaignCardBackgroundColor}
            borderColor={gold_inntale}
            width={"200px"}
            height={"100%"}
            justify={"space-between"}
        >
            <Image
                aspectRatio={"16/9"}
                src={
                    watchlistItem.campaign.thumbnail
                        ? watchlistItem.campaign.thumbnail
                        : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                }
                alt={`${watchlistItem.campaign.name} thumbnail`}
            />
            <CardHeader>
                <Heading as="h1" size="md" fontFamily={fontCardHeader}>
                    {titleCase(watchlistItem.campaign.name)} S
                    {watchlistItem.campaign.season}
                </Heading>
            </CardHeader>

            {/* This box element is just for layout purposes */}
            <Box>
                <CardFooter justifyContent={"center"} marginBottom={"10px"}>
                    <YouTubeButtonLink
                        youtube_link={watchlistItem.campaign.youtube_link}
                        text={"Watch here"}
                        new_page={true}
                        size="sm"
                    />
                </CardFooter>
                <CloseButton
                    size="sm"
                    onClick={() => {
                        privateAxiosObject
                            .delete(`root/watchlist/${watchlistItem.id}/`)
                            .then(() => {
                                removeFromWatchlist(watchlistItem.campaign.id);
                            })
                            .catch((error: Error) =>
                                console.error(
                                    "Watchlist deletion error:",
                                    error.message
                                )
                            );
                    }}
                />
            </Box>
        </Card>
    );
};

export default WatchlistCard;
