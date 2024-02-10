import { newProductAtom } from "@/atoms/newProduct";
import { Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { useRecoilState } from "recoil";
import { v4 } from "uuid";

export default function Categories() {
  const [newProductAtomV, setNewProductAtomV] = useRecoilState(newProductAtom);

  const deleteCategory = (id) => {
    const newCategores = newProductAtomV.categories.filter(
      (item) => item.id !== id
    );
    setNewProductAtomV((prev) => ({
      ...prev,
      categories: newCategores,
    }));
  };

  const newCategory = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault()
      setNewProductAtomV((prev) => ({
        ...prev,
        categories: [...prev.categories, { value: e.target.value, id: v4() }],
        categoryValue: '',
      }));
    }
  };

  const onchange = (e) => {
    setNewProductAtomV((prev) => ({
      ...prev,
      categoryValue: e
    }));
  };

  return (
    <>
      <Input
        value={newProductAtomV.categoryValue}
        onKeyDown={(e) => newCategory(e)}
        placeholder="categories"
        name="categories"
        onChange={(e) => onchange(e.target.value)}
      />

      {newProductAtomV.categories.length > 0 &&
        newProductAtomV.categories.map((category) => (
          <Flex
            gap={"6px"}
            color={"black"}
            align={"center"}
            borderRadius={"20px"}
            bg={"blue.300"}
            px={"10px"}
            justifyContent={"space-between"}
            key={category.id}
          >
            <Input defaultValue={category.value} readOnly border={"none"} />
            <Button
              onClick={() => deleteCategory(category.id)}
              colorScheme={"unstyled"}
              color={"black"}
            >
              <IoMdClose fontWeight={900} />
            </Button>
          </Flex>
        ))}
    </>
  );
}
