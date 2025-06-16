import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import FilteringButton from "./FilteringButton";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { ListItem } from "@/interfaces/ListItem";
import { showAllButtonBackgroundColor } from "@/utils/applyingStylesToComponents";

/**
 * This component represents an expandable/collapsable list.
 * It has 3 main elements:
 * - the last item of the list, that is a button used to set the list's status (expanded or collapsed).
 * - the other list items (represented with the FilteringButton.tsx component)
 * - a header
 *
 * This component is used to render many types of lists, like a Player[], a Manual[] or a Setting[].
 * How?
 * Each list needs to be converted into the appropriate format that this component is able to render: ListItem.ts
 * The conversion from a Player[] (or any other kind of list) to a ListItem[] is made by the parent component
 * (like <ManualsList /> or <PlayersList />). Doing so, the only thing that this component have to think is rendering the list.
 */

interface Props {
    header: string;
    list: ListItem[];
}

const ExpandableList = ({ header, list }: Props) => {
    const [showAll, setShowAll] = useState<boolean>(false);

    // Initial values: the list is collapsed by default.
    let buttonText = "show all";
    let buttonIcon = <IoIosArrowDown />;
    let listLenght = 5;

    if (showAll) {
        buttonText = "hide";
        buttonIcon = <IoIosArrowUp />;
        listLenght = list.length;
    }

    return (
        <Stack>
            <Heading>{header}</Heading>
            {/* list's elements */}
            {list.slice(0, listLenght).map((listItem) => (
                <FilteringButton
                    buttonContent={listItem}
                    key={
                        listItem.itemType === "Manual"
                            ? `manual_${listItem.id}`
                            : `player_${listItem.id}`
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
