import { ResponsiveValue, Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Props {
    label_size: ResponsiveValue<string> | undefined;
    label_text: string;
    label_icon: IconType;
    color_icon: string;
    size_icon: string | number | undefined;
}

const Label = (props: Props) => {
    return (
        <Tag size={props.label_size}>
            <TagLabel>{props.label_text}</TagLabel>
            <TagRightIcon
                as={props.label_icon}
                color={props.color_icon}
                size={props.size_icon}
            />
        </Tag>
    );
};

export default Label;
