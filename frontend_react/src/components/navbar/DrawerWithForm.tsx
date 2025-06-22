import { drawerHeaderColor } from "@/utils/applyingStylesToComponents";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
    openButtonText: string;
    drawerHeaderText: string;
    formComponent: ReactNode;
    button_form_attribute: string;
    textSubmitButton: string;
}

const DrawerWithForm = ({
    openButtonText,
    drawerHeaderText,
    formComponent,
    button_form_attribute,
    textSubmitButton,
}: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef<HTMLButtonElement>(null);

    return (
        <>
            {/* Button to trigger the opening */}
            <Button
                ref={btnRef}
                onClick={onOpen}
                variant={"link"}
                borderRadius={"0"}
                color={"black"}
                _hover={{ color: "white", borderBottom: "1px solid white" }}
            >
                {openButtonText}
            </Button>

            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader color={drawerHeaderColor}>
                        {drawerHeaderText}
                    </DrawerHeader>

                    {/* Here's your form */}
                    <DrawerBody>{formComponent}</DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" form={button_form_attribute}>
                            {textSubmitButton}
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default DrawerWithForm;
