import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

/**
 * This component renders the player's profile picture with its name and the character who plays.
 */

interface Props {
    profile_pic: string;
    player: string;
    character: string;
}

const PlayerCredit = ({ profile_pic, player, character }: Props) => {
    return (
        <Flex>
            <Avatar src={profile_pic} name={player} />
            <Box ml="3" marginBottom={"20px"}>
                <Text fontWeight="bold" textAlign="left">
                    {player}
                </Text>
                <Text fontSize="sm" textAlign="left">
                    as {character}
                </Text>
            </Box>
        </Flex>
    );
};

export default PlayerCredit;
