import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface Props {
    profile_pic: string;
    player: string;
    character: string;
}

const PlayerCredit = ({ profile_pic, player, character }: Props) => {
    return (
        <Flex>
            <Avatar src={profile_pic} name={player} />
            <Box ml="3" marginBottom={"7px"}>
                <Text fontWeight="bold">{player}</Text>
                <Text fontSize="sm" textAlign="left">
                    as {character}
                </Text>
            </Box>
        </Flex>
    );
};

export default PlayerCredit;
