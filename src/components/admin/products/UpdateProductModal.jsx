import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Nasiya from "./Nasiya";
import { useRef } from "react";
import { CiEdit } from "react-icons/ci";
import { HiOutlineXMark } from "react-icons/hi2";
import { BsUpload } from "react-icons/bs";

export default function UpdataProductModal({
  setUpdatedProduct,
  updatedProduct,
  isOpen,
  onClose,
}) {
  const finalRef = useRef(null);

  // * update product
  const updateProduct = () => {
    // onClose();
    alert("product updated");
  };

  // * nasiya selector
  const handleSelectChange = (event) => {
    setUpdatedProduct((prev) => ({
      ...prev,
      nasiya: { price: prev.nasiya.price, time: Number(event.target.value) },
    }));
  };

  // ? handle input values
  const updatedProductHandler = (e) => {
    setUpdatedProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Modal
      size={"full"}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent p={{ base: "10px", xl: "10px 200px" }}>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Title */}
          <Heading fontSize="20px" mb="2">
            Title:
          </Heading>
          <Input
            name="title"
            value={updatedProduct.title}
            onChange={(e) => updatedProductHandler(e)}
            variant="filled"
            mb="4"
          />

          {/* Price */}
          <Heading fontSize="20px" mb="2">
            Price:
          </Heading>
          <Input
            name="price"
            value={updatedProduct.price}
            onChange={(e) => updatedProductHandler(e)}
            mb="4"
            type="number"
          />

          {/* Brand */}
          <Heading fontSize="20px" mb="2">
            Brand:
          </Heading>
          <Input
            name="brand"
            value={updatedProduct.brand}
            onChange={(e) => updatedProductHandler(e)}
            variant="filled"
            mb="4"
          />
          {/* Rating */}
          <Heading fontSize="20px" mb="2">
            Rating:
          </Heading>
          <Input
            name="rating"
            value={updatedProduct.rating}
            onChange={(e) => updatedProductHandler(e)}
            mb="4"
            type="number"
          />
          {/* Description */}
          <Heading fontSize="20px" mb="2">
            Description:
          </Heading>

          <Textarea
            name="description"
            onChange={(e) => updatedProductHandler(e)}
            value={updatedProduct.description}
            minH={"200px"}
            mb={"20px"}
          />

          {/* nasiya */}
          {updatedProduct.isOnLoan && (
            <Nasiya
              updatedProduct={updatedProduct}
              setUpdatedProduct={setUpdatedProduct}
              handleSelectChange={handleSelectChange}
            />
          )}

          <Flex
            display={{ base: "block", md: "flex" }}
            gap={"10px"}
            mt={"15px"}
          >
            <Box
              border={"1px solid black"}
              w={"250px"}
              h={"250px"}
              p={"8px"}
            >
              <Image
                w={"100%"}
                h={"100%"}
                objectFit={"contain"}
                src={updatedProduct.thumbnail}
                zIndex={1}
              />

              <label className="edit-product-thumbnail" htmlFor="thumbnail">
                <BsUpload />
              </label>
              <Input id="thumbnail" type="file" display={"none"} />
            </Box>

            {/* catogories */}
            <Box w={{ base: "100%", md: "60%" }} p={"10px"}>
              <Heading fontSize="20px" mb="2">
                Categories:
              </Heading>
              <Input placeholder="new category" />
              {updatedProduct.categories?.map((category) => {
                return (
                  <Flex key={category.id}>
                    <Text>{category.value}</Text>
                    <Flex>
                      <CiEdit />
                      <HiOutlineXMark />
                    </Flex>
                  </Flex>
                );
              })}
            </Box>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={() => updateProduct()}>
            Update Product
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
