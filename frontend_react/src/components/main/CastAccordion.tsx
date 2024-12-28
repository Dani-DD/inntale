import { Cast } from "@/interfaces/Cast";
import { titleCase } from "@/utils/utils";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Heading,
    ListItem,
    UnorderedList,
} from "@chakra-ui/react";

interface Props {
    cast: Cast[];
}

const CastAccordion = ({ cast }: Props) => {
    return (
        <Accordion allowToggle>
            <AccordionItem>
                <AccordionButton>
                    <Heading
                        as="h2"
                        size="md"
                        margin={0}
                        flex="1"
                        textAlign="left"
                    >
                        Cast
                    </Heading>

                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <UnorderedList styleType="none" margin={0} paddingLeft={0}>
                        {cast.map((cast_member) => (
                            <ListItem key={cast_member.id}>
                                {titleCase(cast_member.player)} as{" "}
                                {titleCase(cast_member.character)}
                            </ListItem>
                        ))}
                    </UnorderedList>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default CastAccordion;
