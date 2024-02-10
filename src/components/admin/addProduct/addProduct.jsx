import { newProductAtom } from "@/atoms/newProduct";
import { newProductImageAtom } from "@/atoms/newProductImage";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useRecoilState } from "recoil";
import Categories from "./Categories";
import Images from "./Images";
import IsOnLoan from "./isOnLoan";
import { services } from "./serves";

export default function addProduct() {
  const [newProductAtomV, setNewProductAtomV] = useRecoilState(newProductAtom);
  const [newProductImage, setNewProductImage] =
    useRecoilState(newProductImageAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handling input values
  const onChange = (e) => {
    setNewProductAtomV((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box
      w={{ base: "auto", sm: "400px" }}
      p={{ base: "10px", sm: "20px", md: "30px", lg: "40px" }}
    >
      <Heading
        fontFamily={"monospace"}
        fontSize={{ base: "22px", sm: "25px", md: "30px" }}
      >
        new product
      </Heading>
      <Box
        mt={"20px"}
        fontFamily={"monospace"}
        display={"flex"}
        flexDirection={"column"}
        gap={"15px"}
      >
        {/* title input */}
        <Input
          value={newProductAtomV.title}
          placeholder={'title'}
          name={'title'}
          onChange={(e) => onChange(e)}
        />

        {/* price input */}
        <Input
          type="number"
          value={newProductAtomV.price}
          placeholder="price"
          name="price"
          onChange={(e) => onChange(e)}
        />

        {/* description input */}
        <Input
          type="text"
          value={newProductAtomV.description}
          placeholder="description"
          name="description"
          onChange={(e) => onChange(e)}
        />

        {/* brand input */}
        <Input
          type="text"
          value={newProductAtomV.brand}
          placeholder="brand"
          name="brand"
          onChange={(e) => onChange(e)}
        />

        {/* rating input */}
        <Input
          value={newProductAtomV.rating}
          type="number"
          placeholder="rating"
          name="rating"
          onChange={(e) => onChange(e)}
        />

        {/* category section */}
        <Categories />

        {/* isonloan section */}
        <IsOnLoan />

        {/* select images */}
        <Images />

        {/* img input */}
        <>
          <label style={{ width: "100%" }} htmlFor="thumbnail">
            <Flex
              px={"10px"}
              align={"center"}
              gap={"5px"}
              w={"100%"}
              h={"100%"}
              bg={"#CB4335"}
              _hover={{ bg: "red" }}
              borderRadius={"7px"}
            >
              <FaCloudUploadAlt ml={"10px"} />
              <Text>Choose thumbnail</Text>
            </Flex>
          </label>
          <Input
            accept="image/*"
            type="file"
            onChange={(event) =>
              services.handleImageChange(
                event,
                setNewProductImage,
                setNewProductAtomV,
                setError
              )
            }
            id="thumbnail"
            display={"none"}
          />
        </>

        {/* selectod image */}
        {newProductImage && (
          <>
            <Heading fontSize={"18px"} color={"red"}>
              thumbnail for products:
            </Heading>
            <Image src={newProductImage} alt="Selected" maxWidth={"auto"} />
          </>
        )}

        {/* erorr */}
        <Text
          fontStyle={900}
          fontSize={{ base: "15px", sm: "17px" }}
          color={"red"}
        >
          {error}
        </Text>

        {/* add new product */}
        <Button
          onClick={() =>
            services.handleNewProduct(
              newProductAtomV,
              setNewProductAtomV,
              setNewProductImage,
              setLoading,
              setError
            )
          }
          isLoading={loading}
          colorScheme={"facebook"}
        >
          add product
        </Button>
      </Box>
    </Box>
  );
}
