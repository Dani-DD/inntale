import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const Test = () => {
    return (
        <Flex>
            <Avatar src="https://bit.ly/sage-adebayo" />
            <Box ml="3">
                <Text fontWeight="bold">Andrea Guagnini</Text>
                <Text fontSize="sm">as Rendar</Text>
            </Box>
        </Flex>
    );
};

export default Test;
