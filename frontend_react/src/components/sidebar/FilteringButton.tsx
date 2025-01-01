import { ListElement } from "@/interfaces/ListElement";
import useFiltersStore from "@/stores/FiltersStore";
import { Button, Tag } from "@chakra-ui/react";

/**
 * This component turns an element of the ExpandableList into a button for filtering the campaigns.
 * It needs to know:
 * - the string to render (es: "Brancalonia")
 * - a tag to place near the string (es: 0 to indicate that has been never used)
 * - the id of the element (to handle the onClick event that updates the state with the element id)
 * - what kind of list is (manuals? Players?)
 */

interface Props {
    buttonContent: ListElement;
}

const FilteringButton = ({ buttonContent }: Props) => {
    const setSelectedManual = useFiltersStore((s) => s.setSelectedManual);
    const setSelectedPlayer = useFiltersStore((s) => s.setSelectedPlayer);

    // When the user click on the button, we change the state's value
    const handleClick = () => {
        switch (buttonContent.listType) {
            case "Manual":
                setSelectedManual(buttonContent.elementId);
                break;

            case "Player":
                setSelectedPlayer(buttonContent.elementId);
                break;
        }
    };

    return (
        <>
            <Button
                variant="link"
                size="md"
                border="1px"
                padding={"7px 15px"}
                color={"black"}
                onClick={handleClick}
            >
                {buttonContent.name}

                {buttonContent.tag !== undefined && (
                    <Tag marginLeft={"5px"}>{buttonContent.tag}</Tag>
                )}
            </Button>
        </>
    );
};

export default FilteringButton;
