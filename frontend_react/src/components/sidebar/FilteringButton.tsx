import { Button, Tag } from "@chakra-ui/react";

interface Props {
    children: string;
    tag: number;
}

const FilteringButton = ({ children, tag }: Props) => {
    return (
        <>
            <Button
                variant="link"
                size="md"
                border="1px"
                padding={"7px 15px"}
                color={"black"}
            >
                {children}
                <Tag marginLeft={"5px"}>{tag}</Tag>
            </Button>
        </>
    );
};

export default FilteringButton;
