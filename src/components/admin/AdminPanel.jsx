import { authModalState } from "@/atoms/admin-body";
import { Box, Flex } from "@chakra-ui/react";
import { IoMdBasket } from "react-icons/io";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useRecoilState } from "recoil";
import AddProduct from "./addProduct/addProduct";
import Products from "./products/products";
import AdminLogo from "./styled components/AdminLogo";
import StyledFlex from "./styled components/styled  buttons/StyledButtons";
import { useState } from "react";

export default function AdminPanel() {
  const [adminBody, setAdminBody] = useRecoilState(authModalState);

  return (
    <Flex w={"100%"}>
      <Box
        w={{ base: "58px", md: "300px" }}
        p={"3px"}
        pr={"10px"}
        py={"10px"}
        h={"100vh"}
        borderRight={"1px solid gray"}
        position={"sticky"}
        right={"0"}
        top={"0px"}
      >
        <AdminLogo />
        <StyledFlex
          onClick={() => setAdminBody({ value: "addProduct" })}
          icon={<MdProductionQuantityLimits />}
          text="add product"
          mt={{ base: "20px", md: "150px" }}
        />
        <StyledFlex
          onClick={() => setAdminBody({ value: "products" })}
          icon={<IoMdBasket />}
          text="products"
          mt={{ base: "-5px", md: "20px" }}
        />
      </Box>
      <Box w={"89%"}>
        {adminBody.value === "addProduct" && <AddProduct />}
        {adminBody.value === "products" && <Products />}
      </Box>
    </Flex>
  );
}
