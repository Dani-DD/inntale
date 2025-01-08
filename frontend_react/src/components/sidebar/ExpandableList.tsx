import { Button, Flex, Stack } from "@chakra-ui/react";
import FilteringButton from "./FilteringButton";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { ListElement } from "@/interfaces/ListElement";
import { showAllButtonBackgroundColor } from "@/utils/applyingColorsToComponents";

/**
 * This component represents an expandable/collapsable list.
 * The last element of the list is the button that set the list's status (expanded or collapsed).
 * It needs the list to render.
 * In this case, due to project requirements (see FilteringButton component), each element of the list
 * is an object described in the ListElement interface.
 *
 * This object is constructed and returned by the parent component.
 */

interface Props {
    list: ListElement[];
}

const ExpandableList = ({ list }: Props) => {
    const [showAll, setShowAll] = useState<boolean>(false);

    // Initial values: the list is collapsed by default.
    let buttonText = "show all";
    let buttonIcon = <IoIosArrowDown />;
    let lastElement = 4;

    if (showAll) {
        buttonText = "hide";
        buttonIcon = <IoIosArrowUp />;
        lastElement = list.length;
    }

    return (
        <Stack>
            {/* list's elements */}
            {list.slice(0, lastElement).map((listElement) => (
                <FilteringButton
                    buttonContent={listElement}
                    key={
                        listElement.listType === "Manual"
                            ? `manual_${listElement.elementId}`
                            : `player_${listElement.elementId}`
                    }
                />
            ))}
            {/* button to toggle list's status */}
            <Flex marginBottom="20px">
                <Button
                    size="md"
                    border="1px"
                    height={"30px"}
                    color={"black"}
                    leftIcon={buttonIcon}
                    marginBottom="30px"
                    onClick={() => setShowAll(!showAll)}
                    backgroundColor={showAllButtonBackgroundColor}
                >
                    {buttonText}
                </Button>
            </Flex>
        </Stack>
    );
};

export default ExpandableList;
