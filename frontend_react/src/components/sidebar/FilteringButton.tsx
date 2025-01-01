import { ListElement } from "@/interfaces/ListElement";
import useTestStore from "@/stores/test";
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
    const { setSelectedId } = useTestStore();

    // When the user click on the button, we change the state's value
    const handleClick = () => {
        setSelectedId(buttonContent.elementId);
        switch (buttonContent.listType) {
            case "Manual":
                console.log("A manual has been selected.");
                break;

            case "Player":
                console.log("A player has been selected.");
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
                <Tag marginLeft={"5px"}>{buttonContent.tag}</Tag>
            </Button>
        </>
    );
};

export default FilteringButton;
