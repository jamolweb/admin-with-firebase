import { atom } from "recoil";
export const newProductAtom = atom({
  key: "newProductAtom",
  default: {
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
  },
});

