import { Circle, HStack, Text } from "@chakra-ui/react";

const Test = () => {
    return (
        <HStack>
            <Circle size="30px" bg="tomato" color="white" fontSize={"lg"}>
                4
            </Circle>
            <Text>Andrea Guagnini</Text>
        </HStack>
    );
};

export default Test;
