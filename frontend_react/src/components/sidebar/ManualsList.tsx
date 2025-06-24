import useManuals from "@/hooks/useManuals";
import { Text } from "@chakra-ui/react";
import ExpandableList from "./ExpandableList";
import { titleCase } from "@/utils/utils";
import { ListItem } from "@/interfaces/ListItem";
import SkeletonList from "./SkeletonList";

const ManualsList = () => {
    const { manuals, error, isLoading } = useManuals();

    if (isLoading) {
        return <SkeletonList />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    /**
     * The ExpandableList component needs an array of ListItem objects,
     * so we convert the "manuals" variable (an array of Manual objects) into it.
     */
    const manualsList: ListItem[] = manuals.map((manual) => {
        return {
            id: manual.id,
            logo: manual.image,
            name: titleCase(manual.name),
            counter: manual.total_use,
            itemType: "Manual",
        };
    });

    /**
     * The first element of the list will be used to built a button that cleans up the selected filter
     */
    manualsList.unshift({
        id: undefined,
        name: "All manuals",
        counter: undefined,
        itemType: "Manual",
    });

    return <ExpandableList list={manualsList} header="Manuals" />;
};

export default ManualsList;
