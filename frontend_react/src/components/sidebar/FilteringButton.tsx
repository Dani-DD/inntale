import { ListElement } from "@/interfaces/ListElement";
import useFiltersStore from "@/stores/FiltersStore";
import { gold_inntale } from "@/utils/colors";
import { Button, Circle, HStack } from "@chakra-ui/react";

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
        <HStack justifyContent={"start"} alignItems={"start"}>
            {buttonContent.tag !== undefined && (
                <Circle
                    size="25px"
                    bg="white"
                    color={gold_inntale}
                    fontSize={"md"}
                    fontWeight={"bold"}
                >
                    {buttonContent.tag}
                </Circle>
            )}
            <Button
                variant="link"
                size="md"
                textAlign={"left"}
                color={"black"}
                marginBottom={"8px"}
                onClick={handleClick}
                // border="2px solid black"
                _hover={{
                    color: "white",
                }}
            >
                {buttonContent.name}
            </Button>
        </HStack>
    );
};

export default FilteringButton;
