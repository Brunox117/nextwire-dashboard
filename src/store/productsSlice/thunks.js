import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewEmptyProduct,
  addNewProduct,
  deleteActiveProduct,
  deleteProductById,
  productUpdated,
  savingNewProduct,
  setActiveProduct,
  setProducts,
  setSaving,
} from "./productSlice";
import { FirebaseDB } from "../../firebase/config";
import { imgDelete } from "../../helpers/imgDelete";
import { loadProducts } from "../../helpers/firebaseDB/loadFromFirebase";

export const createNewProduct = () => {
  return async (dispatch) => {
    dispatch(savingNewProduct());
    const newProduct = {
      id: "",
      name: "",
      description: "",
      imageUrl: "",
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
      await setDoc(newDoc, productToFirestore);
      // const setDocResp = await setDoc(newDoc, productToFirestore);
      // console.log(setDocResp);
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

export const startDeletingProduct = () => {
  return async (dispatch, getState) => {
    const { activeProduct } = getState().product;
    const imageUrl = activeProduct.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    if (activeProduct.id === "") {
      dispatch(deleteActiveProduct());
    } else {
      const docRef = doc(FirebaseDB, `products/${activeProduct.id}`);
      await deleteDoc(docRef);
      dispatch(deleteProductById(activeProduct.id));
    }
  };
};

export const startDeletingProductById = (product) => {
  return async (dispacth, getState) => {
    const { activeProduct } = getState().product;
    if (activeProduct && activeProduct.id === product.id) {
      dispacth(startDeletingProduct());
    }
    const imageUrl = product.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    if (product.id === "") {
      console.log(`product.id = ${product.id}`);
    } else {
      const docRef = doc(FirebaseDB, `products/${product.id}`);
      await deleteDoc(docRef);
      dispacth(deleteProductById(product.id));
    }
  };
};

export const startLoadingProducts = () => {
  return async (dispatch) => {
    const products = await loadProducts();
    dispatch(setProducts(products));
  };
};
