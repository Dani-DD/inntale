import { Button, Stack } from "@chakra-ui/react";
import FilteringButton from "./FilteringButton";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export interface ListElement {
    id: string;
    name: string;
    tag: number;
}

interface Props {
    list: ListElement[];
}

const ExpandableList = ({ list }: Props) => {
    /**
     * This component represents an expandable/collapsable list.
     * The last element of the list is the button that set the list's status.
     */

    const [showAll, setShowAll] = useState<boolean>(false);

    // Initial values: the list is collapsed by default.
    let buttonText = "show all";
    let buttonIcon = <IoIosArrowDown />;
    let lastElement = 3;

    if (showAll) {
        buttonText = "hide";
        buttonIcon = <IoIosArrowUp />;
        lastElement = list.length;
    }

    return (
        <Stack>
            {/* list's elements */}
            {list.slice(0, lastElement).map((listElement) => (
                <FilteringButton tag={listElement.tag} key={listElement.id}>
                    {listElement.name}
                </FilteringButton>
            ))}
            {/* button to toggle list's status */}
            <Button
                size="md"
                border="1px"
                padding={"7px 15px"}
                color={"black"}
                leftIcon={buttonIcon}
                onClick={() => setShowAll(!showAll)}
            >
                {buttonText}
            </Button>
        </Stack>
    );
};

export default ExpandableList;
