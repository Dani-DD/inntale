import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

interface Props {
    width?: string;
}

const SearchBox = ({ width = "50%" }: Props) => {
    return (
        <form style={{ width }}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    placeholder="Search campaign by name, manual or player"
                    _placeholder={{ color: "black" }}
                    borderRadius={20}
                />
            </InputGroup>
        </form>
    );
};

export default SearchBox;
