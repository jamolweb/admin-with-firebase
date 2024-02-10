import { auth, db } from "@/pages/firebase/app-data";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ProductsSkeleton from "../ProductsSkeleton";
import Nasiya from "./Nasiya";
import SingleProduct from "./SingProduct";
import UpdataProductModal from "./UpdateProductModal";

const Main = () => {
  let [products, setProducts] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const finalRef = React.useRef(null);
  let [user] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ? get products
  let reference = collection(db, "products");
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(reference);
      const data = snapshot.docs.map((doc) => doc.data());
      setProducts(data);
    };

    fetchData();
  }, []);

  // ? handle input values
  const updatedProductHandler = (e) => {
    setUpdatedProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ! delete product
  const deleteProduct = async (id) => {
    if (user) {
      if (user?.email === "jamoladdinisnatdinov2@gmail.com") {
        // try {
        //   await deleteDoc(doc(db, "products", id));
        //   const newProducts = products.filter((item) => item.id !== id);
        //   setProducts(newProducts);
        // } catch (error) {
        //   console.log("Error deleting document:", error);
        //   alert("product is not deleted!!!!");
        // }
        alert(`Product deletid.`);
      } else {
        alert("you're not admin");
      }
    } else {
      alert("you're not singined");
    }
  };

  // * edit products
  const onEdit = (product) => {
    // if (user) {
    //   if (user?.email === "jamoladdinisnatdinov2@gmail.com") {
    onOpen();
    setUpdatedProduct(product);
    //   } else {
    //     alert("you're not admin");
    //   }
    // } else {
    //   alert("you're not singined");
    // }
  };

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

  console.log(updatedProduct);

  return (
    <Box>
      {products.length ? (
        <Flex
          pt={"140px"}
          p={{ base: "10px", sm: "15px", md: "25px", lg: "35px" }}
          flexWrap={"wrap"}
          gap={"10px"}
        >
          {products.map((product, index) => (
            <SingleProduct
              key={product.id}
              product={product}
              onEdit={onEdit}
              deleteProduct={deleteProduct}
              index={index}
            />
          ))}{" "}
        </Flex>
      ) : (
        <ProductsSkeleton />
      )}
      <UpdataProductModal
        updatedProduct={updatedProduct}
        setUpdatedProduct={setUpdatedProduct}
        handleSelectChange={handleSelectChange}
        isOpen={isOpen} 
        onClose={onClose}
      />
    </Box>
  );
};

export default Main;