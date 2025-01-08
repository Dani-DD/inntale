import useFiltersStore from "@/stores/FiltersStore";
import {
    sortSelectorBackgroundColor,
    sortSelectorBorderWidth,
} from "@/utils/applyingColorsToComponents";
import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { SlArrowDown } from "react-icons/sl";

/**
 * This component renders a dropdown menu that contains options to order fetched campaigns.
 */

interface Props {
    orderBy?: string;
}

const SortSelector = ({ orderBy }: Props) => {
    const setOrdering = useFiltersStore((s) => s.setOrdering);

    /**
     * This array is mapped into a list of MenuItem and is needed because
     * the MenuItem's children prop doesn't match with the ordering param.
     * In other words, we can't write something like:
     * <MenuItem onClick={() => setOrdering("name, season")}>name, season</MenuItem>
     *
     * So, we associate the ordering param with a more human readable string.
     */
    const orderingOptions = [
        {
            label: "name (ascending)",
            orderingParam: "name, season",
        },
        {
            label: "name (descending)",
            orderingParam: "-name, -season",
        },
        {
            label: "release date (ascending)",
            orderingParam: "release_date",
        },
        {
            label: "release date (descending)",
            orderingParam: "-release_date",
        },
    ];

    /**
     * To dinamically change the text of the MenuButton, based on the current ordering param,
     * we get that param from the store (in the parent component) and find the associated label
     * in the orderingOptions array.
     */
    const selectedOrder = orderingOptions.find(
        (option) => option.orderingParam === orderBy
    )?.label;

    return (
        <Box
            backgroundColor={sortSelectorBackgroundColor}
            borderWidth={sortSelectorBorderWidth}
            borderColor={"black"}
        >
            <Menu>
                <MenuButton as={Button} rightIcon={<SlArrowDown />}>
                    {`Sort by ${selectedOrder ? selectedOrder : ""}`}
                </MenuButton>
                <MenuList>
                    {orderingOptions.map((option) => (
                        <MenuItem
                            onClick={() => setOrdering(option.orderingParam)}
                            key={option.label}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Box>
    );
};

export default SortSelector;
