import { ListItem } from "@/interfaces/ListItem";
import useFiltersStore from "@/stores/FiltersStore";
import { Button, Image, HStack, Text } from "@chakra-ui/react";

/**
 * Each list item of the sidebar is made of by:
 * - a logo/image (the manual's logo, the player's pic, ...).
 * - a name (the manual's name, the player's full name, ...).
 * - a counter, that represents how many times a manual has been used, a player has played, ...
 *
 * [ logo ] [ name ] (counter)
 * like: [ andross pic ] [ Andrea Guagnini ] ( 4 )
 *
 * This component is used to update the url query parameter: for example, if the user click the
 * FilteringButton that represents the manual with id equals to 4, than the following filter is applied:
 * /root/campaigns/?manual=4 (check out useFiltersStore at src/components/store/FiltersStore.ts)
 * This is why we've need of the id of the item (manual, player, ...) (as you can see in the Props interface below).
 *
 * Beside, we've also need to specify the type of the item:
 * - Does it represent a manual? Then we need to update ?manual.
 * - Does it represent a player? Then we need to update ?player, instead.
 * - and so on.
 *
 * There is an exception: the first item of the list.
 * This button is made only by the name: no logo and counter (this is why, in the Props interface, are set as optional):
 *
 * [ name ]
 * like: All players
 *
 * In fact, this is a special button which purpose is to remove the selected (if any)
 * url query parameter. How? By setting it to "undefined".
 * This is why, in the Props interface, the id is set as "optional"
 */

interface Props {
    buttonContent: ListItem;
}

const FilteringButton = ({
    buttonContent: { id, logo, name, counter, itemType },
}: Props) => {
    const setSelectedManual = useFiltersStore((s) => s.setSelectedManual);
    const setSelectedPlayer = useFiltersStore((s) => s.setSelectedPlayer);
    const setSelectedSetting = useFiltersStore((s) => s.setSelectedSetting);

    // When the user click on the button, we change the state's value
    const handleClick = () => {
        switch (itemType) {
            case "Manual":
                setSelectedManual(id);
                break;

            case "Player":
                setSelectedPlayer(id);
                break;
            case "Setting":
                setSelectedSetting(id);
                break;
        }
    };

    return (
        <HStack
            justifyContent={"start"}
            alignItems={"center"}
            // border={"3px solid green"}
            maxWidth={"100%"}
        >
            {logo && (
                <Image
                    src={logo}
                    alt={`Logo ${name}`}
                    boxSize={"32px"}
                    objectFit={"contain"}
                    // aspectRatio={"1:1"}
                    borderRadius={"6px"}
                    // border="3px solid black"
                />
            )}
            <Button
                variant="link"
                size="md"
                textAlign={"left"}
                color={"black"}
                marginBottom={"8px"}
                onClick={handleClick}
                _hover={{
                    color: "white",
                }}
                // border="3px solid red"
                maxWidth={"100%"}
                // New one!
                margin={"0px"}
            >
                <Text
                    // border={"2px solid pink"}
                    maxWidth={"100%"}
                    whiteSpace={"normal"}
                    overflowWrap={"break-word"}
                >{`${name}${counter ? ` ( ${counter} )` : ""}`}</Text>
            </Button>
        </HStack>
    );
};

export default FilteringButton;
