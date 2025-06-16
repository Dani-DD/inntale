import { Spinner, Text } from "@chakra-ui/react";
import ExpandableList from "./ExpandableList";
import { titleCase } from "@/utils/utils";
import { ListItem } from "@/interfaces/ListItem";
import useSettings from "@/hooks/useSettings";

const SettingsList = () => {
    const { settings, error, isLoading } = useSettings();

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    /**
     * The ExpandableList component needs an array of ListItem objects,
     * so we convert the "settings" variable (an array of Setting objects) into it.
     */
    const settingsList: ListItem[] = settings.map((setting) => {
        return {
            id: setting.id,
            logo: setting.image,
            name: titleCase(setting.name),
            counter: setting.total_use,
            itemType: "Setting",
        };
    });

    /**
     * The first element of the list will be used to built a button that cleans up the selected filter
     */
    settingsList.unshift({
        id: undefined,
        name: "All settings",
        counter: undefined,
        itemType: "Setting",
    });

    return <ExpandableList list={settingsList} header="Settings" />;
};

export default SettingsList;
