import useManuals from "@/hooks/useManuals";
import { Spinner, Text } from "@chakra-ui/react";
import ExpandableList, { ListElement } from "./ExpandableList";
import { titleCase } from "@/utils/utils";

const ManualsList = () => {
    const { manuals, error, isLoading } = useManuals();

    /**
     * The ExpandableList component needs an array of ListElement objects,
     * so we convert the "manuals" variable (an array of Manual objects) into it.
     */
    const manualsList: ListElement[] = manuals.map((manual) => {
        return {
            name: titleCase(manual.name),
            tag: manual.total_use,
        };
    });

    return (
        <>
            {error && <Text>{error}</Text>}
            {isLoading && <Spinner />}
            <ExpandableList list={manualsList} />
        </>
    );
};

export default ManualsList;
