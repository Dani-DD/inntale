import { Button } from "@chakra-ui/react";
import { SlSocialYoutube } from "react-icons/sl";

interface Props {
    youtube_link: string;
    text: string;
    new_page: boolean;
    width?: string;
    size?: string;
}

const YouTubeButtonLink = ({
    youtube_link,
    text,
    new_page,
    width,
    size = "md",
}: Props) => {
    return (
        <Button
            colorScheme="red"
            leftIcon={<SlSocialYoutube size={"20px"} />}
            as="a"
            href={youtube_link}
            target={new_page ? "_blank" : ""}
            width={width}
            size={size}
        >
            {text}
        </Button>
    );
};

export default YouTubeButtonLink;
