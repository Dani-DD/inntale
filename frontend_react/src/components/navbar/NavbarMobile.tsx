import { Link as LinkChakra, Image, HStack, VStack } from "@chakra-ui/react";
import logoMobile from "../../assets/inntale_transparent_logo.png";
import { Link } from "react-router-dom";

const NavbarMobile = () => {
    return (
        <VStack padding="5px 25px">
            <HStack>
                <LinkChakra>Login</LinkChakra>
                <Link to="/">
                    <Image src={logoMobile} alt="InnTale logo" width="100px" />
                </Link>
                <LinkChakra marginRight="10px">Register</LinkChakra>
            </HStack>
        </VStack>
    );
};

export default NavbarMobile;
