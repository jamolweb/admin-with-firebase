import { newProductAtom } from "@/atoms/newProduct";
import { Checkbox, Flex, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

export default function isOnLoan() {
  const [newProductAtomV, setNewProductAtomV] = useRecoilState(newProductAtom);

  const handleSelectChange = (event) => {
    setNewProductAtomV((prev) => ({
      ...prev,
      nasiya: { price: prev.nasiya.price, time: Number(event.target.value) },
    }));
  };

  return (
    <>
      <Checkbox
        onChange={() =>
          setNewProductAtomV((prev) => ({ ...prev, isOnLoan: !prev.isOnLoan }))
        }
        isChecked={newProductAtomV.isOnLoan}
      >
        isOnLoan
      </Checkbox>
      {newProductAtomV.isOnLoan && (
        <Flex>
          <Input
            placeholder="nasiya price"
            type="number"
            value={newProductAtomV.nasiya.price}
            onChange={(e) =>
              setNewProductAtomV((prev) => ({
                ...prev,
                nasiya: { price: e.target.value, time: prev.nasiya.time },
              }))
            }
          />
          <Select
            w={"50px"}
            onChange={handleSelectChange}
            value={newProductAtomV.nasiya.time}
          >
            <option value="3">3 oyga</option>
            <option value="6">6 oyga</option>
            <option value="12">12 oyga</option>
            <option value="24">24 oyga</option>
          </Select>
        </Flex>
      )}
    </>
  );
}
