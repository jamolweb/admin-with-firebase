import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { RiAdminFill } from "react-icons/ri";

export default function AdminLogo() {
  return (
    <Flex gap={"5px"} p={"10px"} align={"center"}>
      <RiAdminFill color="green" fontSize={"30px"} />
      <Heading fontSize={"25px"} display={{ base: 'none', md: 'flex'}}>AdminPanel</Heading>
    </Flex>
  );
}
