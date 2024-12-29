import { Button } from "@chakra-ui/react";

interface Props {
    children: string;
}

const FilteringButton = ({ children }: Props) => {
    return (
        <Button
            width={"100px"}
            variant="link"
            size="md"
            border="1px"
            padding={"7px 15px"}
            color={"black"}
        >
            {children}
        </Button>
    );
};

export default FilteringButton;
