import useFiltersStore from "@/stores/FiltersStore";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { SlArrowDown } from "react-icons/sl";

/**
 * This component renders a dropdown menu that contains options to order fetched campaigns.
 */

const SortSelector = () => {
    const setOrdering = useFiltersStore((s) => s.setOrdering);

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

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<SlArrowDown />}>
                Sort by
            </MenuButton>
            <MenuList>
                {orderingOptions.map((option) => (
                    <MenuItem onClick={() => setOrdering(option.orderingParam)}>
                        {option.label}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};

export default SortSelector;
