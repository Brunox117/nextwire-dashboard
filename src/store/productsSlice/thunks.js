import { collection, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewEmptyProduct,
  addNewProduct,
  productUpdated,
  savingNewProduct,
  setActiveProduct,
  setSaving,
} from "./productSlice";
import { FirebaseDB } from "../../firebase/config";

export const createNewProduct = () => {
  return async (dispatch) => {
    dispatch(savingNewProduct());
    const newProduct = {
      id: "ABC123",
      name: "",
      description: "",
    };
    await dispatch(addNewEmptyProduct(newProduct));
    dispatch(setActiveProduct(newProduct));
  };
};

export const startSaveProduct = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { activeProduct } = getState().product;
    const productToFirestore = { ...activeProduct };

    if (productToFirestore.id === "") {
      const newDoc = doc(collection(FirebaseDB, `products/`));
      productToFirestore.id = newDoc.id;
      const setDocResp = await setDoc(newDoc, productToFirestore);
      dispatch(setActiveProduct(productToFirestore));
      dispatch(addNewProduct(productToFirestore));
    } else {
      delete productToFirestore.id;
      const docRef = doc(FirebaseDB, `products/${activeProduct.id}`);
      await setDoc(docRef, productToFirestore, { merge: true });
      dispatch(productUpdated(activeProduct));
    }
  };
};
