import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewEmptyProduct,
  addNewProduct,
  deleteActiveProduct,
  deleteProductById,
  productUpdated,
  savingNewProduct,
  setActiveProduct,
  setPhotoToActiveProduct,
  setProducts,
  setSaving,
} from "./productSlice";
import { FirebaseDB } from "../../firebase/config";
import { imgDelete } from "../../helpers/imgDelete";
import { loadProducts } from "../../helpers/firebaseDB/loadFromFirebase";
import { fileUpload } from "../../helpers/imgUpload";

export const createNewProduct = () => {
  return async (dispatch) => {
    dispatch(savingNewProduct());
    const newProduct = {
      id: "",
      name: "",
      description: "",
      imageUrl: "",
    };
    dispatch(addNewEmptyProduct());
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

export const startUploadingImg = (file) => {
  return async (dispatch, getState) => {
    const { activeProduct } = getState().product;
    const imageUrl = activeProduct.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    dispatch(setSaving());
    const imgUrl = await fileUpload(file);
    dispatch(setPhotoToActiveProduct(imgUrl));
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
      console.log(`products/${product.id}`);
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
