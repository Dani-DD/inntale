import AuthContext from "@/contexts/authContext";
import usePrivateAxios from "@/hooks/usePrivateAxios";
import { Campaign } from "@/interfaces/Campaign";
import { PostWatchlistItem } from "@/interfaces/WatchlistItem";
import { campaignCardBackgroundColor } from "@/utils/applyingColorsToComponents";
import { gold_inntale } from "@/utils/colors";
import { titleCase } from "@/utils/utils";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    Image,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaTwitch, FaYoutube } from "react-icons/fa";
import CastAccordion from "./CastAccordion";
import Label from "./Label";
import YouTubeButtonLink from "./YouTubeButtonLink";

interface Props {
    campaign: Campaign;
}

const CampaignCard = ({ campaign }: Props) => {
    const { user } = useContext(AuthContext);
    const privateAxiosObject = usePrivateAxios();

    const labelProps = campaign.is_edited
        ? { text: "Edited", icon: FaYoutube, color: "red" }
        : { text: "Live", icon: FaTwitch, color: "purple" };

    return (
        <Card
            border="solid"
            textAlign="center"
            size="sm"
            backgroundColor={campaignCardBackgroundColor}
            borderColor={gold_inntale}
        >
            <Image
                aspectRatio={"16/9"}
                src={
                    campaign.thumbnail
                        ? campaign.thumbnail
                        : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                }
                alt={`${campaign.name} thumbnail`}
            />
            <CardHeader>
                <Stack alignItems="center">
                    <Heading as="h1" size="lg">
                        {titleCase(campaign.name)} S{campaign.season}
                    </Heading>
                    <Text as="i" fontSize="xl" marginBottom="4px">
                        {titleCase(campaign.manual)}
                    </Text>
                    <Label
                        label_size="lg"
                        label_text={labelProps.text}
                        label_icon={labelProps.icon}
                        color_icon={labelProps.color}
                        size_icon="50px"
                    />
                </Stack>
            </CardHeader>
            <CardBody>
                <CastAccordion cast={campaign.campaign_cast} />
            </CardBody>
            <CardFooter justifyContent={"center"}>
                <VStack justifyContent={"stretch"} alignItems={"stretch"}>
                    <YouTubeButtonLink
                        youtube_link={campaign.youtube_link}
                        text={"Watch here"}
                        new_page={true}
                    />
                    {user && (
                        <Button
                            colorScheme="blue"
                            onClick={() => {
                                const watchlistItem: PostWatchlistItem = {
                                    campaign: campaign.id,
                                };
                                console.log(watchlistItem);

                                privateAxiosObject
                                    .post("root/watchlist/", watchlistItem)
                                    .then((response) =>
                                        console.log(response.data)
                                    )
                                    .catch((error: Error) =>
                                        console.log(error.message)
                                    );
                            }}
                        >
                            Add to watchlist
                        </Button>
                    )}
                </VStack>
            </CardFooter>
        </Card>
    );
};

export default CampaignCard;
