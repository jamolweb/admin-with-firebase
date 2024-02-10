import { atom } from "recoil";

const defaultModalState = {
    value: 'addProduct'
}

export const authModalState = atom({
  key: "authModalState",
  default: defaultModalState
})