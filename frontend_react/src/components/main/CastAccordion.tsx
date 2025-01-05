import { Cast } from "@/interfaces/Cast";
import { titleCase } from "@/utils/utils";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Heading,
} from "@chakra-ui/react";
import PlayerCredit from "./PlayerCredit";

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
                    {cast.map((cast_member) => (
                        <PlayerCredit
                            key={cast_member.id}
                            profile_pic={cast_member.profile_pic}
                            player={titleCase(cast_member.player)}
                            character={titleCase(cast_member.character)}
                        />
                    ))}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default CastAccordion;
