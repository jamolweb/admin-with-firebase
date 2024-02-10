import React from "react";
import { Box, Button, GridItem, Heading, Image, Text } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";

const MotionGridItem = motion(GridItem);

const ProductGridItem = ({ product, onEdit, deleteProduct, index }) => {
  return (
    <MotionGridItem
      initial={{ opacity: 0, translateY: 150 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index / 5 }}
      borderRadius="lg"
      p="4"
      border="1px solid #E0E0E0"
      mb="4"
      key={product.id}
      boxShadow="0px 0px 10px gray"
      display={"flex"}
      _hover={{ boxShadow: "0px 0px 30px gray" }}
      flexDirection="column"
      justifyContent="space-between"
      w={"auto"}
      width={"300px"}
    >
      <Box> 
        <Image
          w="100%"
          h="250px"
          objectFit={"contain"}
          src={product.thumbnail}
          alt={`Thumbnail for ${product.title}`}
          mb={"10px"}
        />
        <Heading fontSize={{ base: "15px" }} mb="2" color="#333333" w="250px">
          {product.title}
        </Heading>
        <Text fontSize="md" color="#4CAF50" mb="4">
          {product.price.toLocaleString()} so'm
        </Text>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Button
          alignItems="center"
          colorScheme="blue"
          mb="2"
          onClick={() => onEdit(product)}
        >
          <BiEditAlt fontSize="20px" />
          Edit
        </Button>
        <Button
          alignItems="center"
          colorScheme="red"
          onClick={() => deleteProduct(product.id)}
        >
          <MdDelete fontSize="20px" />
          Delete
        </Button>
      </Box>
    </MotionGridItem>
  );
};

export default ProductGridItem;
{
  /* <GridItem
                borderRadius="lg"
                p="4"
                border="1px solid #E0E0E0"
                mb="4"
                key={product.id}
                boxShadow="0px 0px 10px gray"
                display={"flex"}
                _hover={{ boxShadow: "0px 0px 30px gray" }}
                flexDirection="column"
                justifyContent="space-between"
                w={"auto"}
                width={"300px"}
              >
                <Box>
                  <Image
                    w="100%"
                    h="250px"
                    objectFit="contain"
                    src={product.thumbnail}
                    alt={`Thumbnail for ${product.title}`}
                    mb={"10px"}
                  />
                  <Heading
                    fontSize={{ base: "15px" }}
                    mb="2"
                    color="#333333"
                    w="250px"
                  >
                    {product.title}
                  </Heading>
                  <Text fontSize="md" color="#4CAF50" mb="4">
                    {product.price.toLocaleString()} so'm
                  </Text>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Button
                    alignItems="center"
                    colorScheme="blue"
                    mb="2"
                    onClick={() => onEdit(product)}
                  >
                    <BiEditAlt fontSize="20px" />
                    Edit
                  </Button>
                  <Button
                    alignItems="center"
                    colorScheme="red"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <MdDelete fontSize="20px" />
                    Delete
                  </Button>
                </Box>
              </GridItem> */
}
