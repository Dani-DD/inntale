import { Skeleton, Stack } from "@chakra-ui/react";

const SkeletonList = () => {
    return (
        <Stack marginBottom={"100px"}>
            <Skeleton height="40px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" width={"100px"} />
        </Stack>
    );
};

export default SkeletonList;
