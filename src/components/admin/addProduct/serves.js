import { db, storage } from "@/pages/firebase/app-data";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const types = ["image/png", "image/jpeg"];
export let services = {
  handleImageChange: (
    event,
    setNewProductImage,
    setNewProductAtomV,
    setError
  ) => {
    const file = event.target.files[0];
    if (file && types.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProductImage(e.target.result);
        setNewProductAtomV((prev) => ({
          ...prev,
          thumbnail: file,
        }));
        setError("");
      };
      reader.readAsDataURL(file);
    } else {
      setNewProductImage(null);
      setNewProductAtomV((prev) => ({
        ...prev,
        thumbnail: null,
      }));
      setError("Please select a valid image type (jpg or png)");
    }
  },
  handleNewProduct: async (
    newProductAtomV,
    setNewProductAtomV,
    setNewProductImage,
    setLoading,
    setError
  ) => {
    if (
      newProductAtomV.price !== 0 &&
      newProductAtomV.thumbnail !== null &&
      newProductAtomV.title !== "" &&
      newProductAtomV.description !== "" &&
      newProductAtomV.brand !== "" &&
      newProductAtomV.rating !== 0 &&
      newProductAtomV.categories.length !== 0 &&
      newProductAtomV.images.length !== 0
    ) {
      setLoading(true);
      // ! thumbnail img uplading
      let imageRef = ref(
        storage,
        `product-images/${newProductAtomV.thumbnail.name + v4()}`
      );
      await uploadBytes(imageRef, newProductAtomV.thumbnail);
      const thumbnail = await getDownloadURL(imageRef);

      // ! upload multuple images
      const images = [];

      for (let i = 0; i < newProductAtomV.images.length; i++) {
        let newImg = ref(
          storage,
          `product-images/${newProductAtomV.thumbnail.name + v4()}`
        );
        await uploadBytes(newImg, newProductAtomV.images[i]);
        const img = await getDownloadURL(newImg);
        images.push(img);
      }

      const id = v4();

      let productData = {
        title: newProductAtomV.title,
        price: Number(newProductAtomV.price),
        thumbnail,
        id,
        createdAt: String(new Date()).slice(3, 15),
        description: newProductAtomV.description,
        brand: newProductAtomV.brand,
        isOnLoan: newProductAtomV.isOnLoan,
        nasiya: newProductAtomV.nasiya,
        reviews: [],
        categories: newProductAtomV.categories,
        rating: newProductAtomV.rating,
        images,
      };

      const defaultPoduct = {
        title: "",
        price: "",
        thumbnail: null,
        description: "",
        brand: "",
        images: [],
        isOnLoan: false,
        nasiya: { price: "", time: 3 },
        categories: [],
        rating: 0,
        categoryValue: "",
      };

      if (newProductAtomV.isOnLoan) {
        productData.nasiya = newProductAtomV.nasiya;
      } else {
        delete productData.nasiya;
      }

      await setDoc(doc(db, "products", id), productData)
        .then(() => {
          setNewProductAtomV(defaultPoduct);
          setError("");
          setNewProductImage(null);
          setLoading(false);
        })
        .catch((err) => setError(String(err.message)));
    } else {
      setError("fill all inputs");
    }
  },
};
