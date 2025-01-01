import useManuals from "@/hooks/useManuals";
import { Spinner, Text } from "@chakra-ui/react";
import ExpandableList from "./ExpandableList";
import { titleCase } from "@/utils/utils";
import { ListElement } from "@/interfaces/ListElement";

const ManualsList = () => {
    const { manuals, error, isLoading } = useManuals();

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    /**
     * The ExpandableList component needs an array of ListElement objects,
     * so we convert the "manuals" variable (an array of Manual objects) into it.
     */
    const manualsList: ListElement[] = manuals.map((manual) => {
        return {
            elementId: manual.id,
            name: titleCase(manual.name),
            tag: manual.total_use,
            listType: "Manual",
        };
    });

    /**
     * The first element of the list will be used to built a button that cleans up the selected filter
     */
    manualsList.unshift({
        elementId: undefined,
        name: "All manuals",
        tag: undefined,
        listType: "Manual",
    });

    return <ExpandableList list={manualsList} />;
};

export default ManualsList;
