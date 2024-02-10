import { Flex, Heading, Input, Select } from "@chakra-ui/react";
import React from "react";

export default function Nasiya({
  updatedProduct,
  setUpdatedProduct,
  handleSelectChange,
}) {
  return (
    <>
      <Heading fontSize="20px" mb="2">
        Nasiya:
      </Heading>
      <Flex>
        <Input
          placeholder="nasiya price"
          type="number"
          value={updatedProduct.nasiya.price}
          onChange={(e) =>
            setUpdatedProduct((prev) => ({
              ...prev,
              nasiya: {
                price: e.target.value,
                time: prev.nasiya.time,
              },
            }))
          }
        />
        <Select
          w={"150px"}
          onChange={handleSelectChange}
          value={updatedProduct.nasiya.time}
        >
          <option value="3">3 oyga</option>
          <option value="6">6 oyga</option>
          <option value="12">12 oyga</option>
          <option value="24">24 oyga</option>
        </Select>
      </Flex>
    </>
  );
}
