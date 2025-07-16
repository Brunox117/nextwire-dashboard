import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewCategory,
  addNewEmptyCategory,
  categoryUpdated,
  deleteActiveCategory,
  deleteCategoryById,
  savingNewCategory,
  setActiveCategory,
  setCategories,
  setSaving,
} from "./categorySlice";
import { FirebaseDB } from "../../firebase/config";
import { loadCategories } from "../../helpers/firebaseDB/loadFromFirebase";

export const createNewCategory = () => {
  return async (dispatch) => {
    dispatch(savingNewCategory());
    const newCategory = {
      id: "",
      name: "",
    };
    dispatch(addNewEmptyCategory());
    dispatch(setActiveCategory(newCategory));
  };
};

export const startSaveCategory = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { activeCategory } = getState().category;
    const categoryToFirestore = { ...activeCategory };

    if (categoryToFirestore.id === "") {
      const newDoc = doc(collection(FirebaseDB, `categories/`));
      categoryToFirestore.id = newDoc.id;
      await setDoc(newDoc, categoryToFirestore);
      dispatch(setActiveCategory(categoryToFirestore));
      dispatch(addNewCategory(categoryToFirestore));
    } else {
      delete categoryToFirestore.id;
      const docRef = doc(FirebaseDB, `categories/${activeCategory.id}`);
      await setDoc(docRef, categoryToFirestore, { merge: true });
      dispatch(categoryUpdated(activeCategory));
    }
  };
};

export const startDeletingCategory = () => {
  return async (dispatch, getState) => {
    const { activeCategory } = getState().category;
    if (activeCategory.id === "") {
      dispatch(deleteActiveCategory());
    } else {
      const docRef = doc(FirebaseDB, `categories/${activeCategory.id}`);
      await deleteDoc(docRef);
      dispatch(deleteCategoryById(activeCategory.id));
    }
  };
};
//Method to delete an unselected category
//For example when we are in the category list and we want to delete a category from there
export const startDeletingCategoryById = (category) => {
  return async (dispatch, getState) => {
    const { activeCategory } = getState().category;
    if (activeCategory && activeCategory.id === category.id) {
      dispatch(startDeletingCategory());
    }
    //If the category isn't selected, we delete it from the database and the state
    //No need to clear the active category because it's not selected
    if (category.id !== "") {
      const docRef = doc(FirebaseDB, `categories/${category.id}`);
      await deleteDoc(docRef);
      dispatch(deleteCategoryById(category.id));
    }
  };
};

export const startLoadingCategories = () => {
  return async (dispatch) => {
    const categories = await loadCategories();
    dispatch(setCategories(categories));
  };
};
