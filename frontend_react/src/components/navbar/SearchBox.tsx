import useFiltersStore from "@/stores/FiltersStore";
import { blue_inntale } from "@/utils/colors";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";

interface SearchBarForm {
    search: string;
}

interface Props {
    width?: string;
}

const SearchBox = ({ width = "50%" }: Props) => {
    const { register, handleSubmit, reset } = useForm<SearchBarForm>();

    const setSearch = useFiltersStore((s) => s.setSearch);

    const onSubmit = handleSubmit((data) => {
        console.log(data.search);
        setSearch(data.search);
        reset();
    });

    return (
        <form style={{ width }} onSubmit={onSubmit}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    placeholder="Search by name, manual, player or setting"
                    _placeholder={{ color: "black" }}
                    borderRadius={20}
                    backgroundColor={"white"}
                    _hover={{ backgroundColor: "whiteAlpha.700" }}
                    {...register("search")}
                />
            </InputGroup>
        </form>
    );
};

export default SearchBox;
