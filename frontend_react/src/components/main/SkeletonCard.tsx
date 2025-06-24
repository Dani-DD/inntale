import { Skeleton, Stack } from "@chakra-ui/react";

const SkeletonCard = () => {
    return (
        <Stack marginBottom={"100px"}>
            <Skeleton height="120px" />
            <Skeleton height="80px" />
            <Skeleton height="30px" />
            <Skeleton height="80px" />
            <Skeleton height="20px" />
        </Stack>
    );
};

export default SkeletonCard;
