import { newProductAtom } from "@/atoms/newProduct";
import { Flex, Input, Text } from "@chakra-ui/react";
import { ImImages } from "react-icons/im";
import { useRecoilState } from "recoil";

export default function Images() {
  const [newProductAtomV, setNewProductAtomV] = useRecoilState(newProductAtom);

  const onChange = (e) => {
    setNewProductAtomV((prev) => ({
      ...prev,
      images: [...e.target.files],
    }));
  };

  return (
    <div>
      <Input
        display={"none"}
        onChange={onChange}
        type="file"
        accept="image/*"
        name="file"
        multiple
        id="images"
      />
      <Flex mb={newProductAtomV.images.length ? "10px" : "0"}>
        <label style={{ width: "100%" }} htmlFor="images">
          <Flex
            px={"10px"}
            align={"center"}
            gap={"27px"}
            w={"100%"}
            h={"100%"}
            bg={"gray.300"}
            borderRadius={"7px"}
          >
            <ImImages ml={"10px"} />
            <Text>{newProductAtomV.images.length} chosen images</Text>
          </Flex>
        </label>
      </Flex>
    </div>
  );
}
