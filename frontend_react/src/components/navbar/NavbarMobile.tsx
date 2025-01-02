import { Link as LinkChakra, Image, HStack, VStack } from "@chakra-ui/react";
import logoMobile from "../../assets/inntale_transparent_logo.png";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";

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
            <SearchBox width="100%" />
        </VStack>
    );
};

export default NavbarMobile;
