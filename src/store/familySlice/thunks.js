import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { loadFamilies } from "../../helpers/firebaseDB/loadFromFirebase";
import {
  addNewEmptyFamily,
  addNewFamily,
  deleteActiveFamily,
  deleteFamilyById,
  familyUpdated,
  savingNewFamily,
  setActiveFamily,
  setFamilies,
  setSaving,
} from "./familySlice";
import { FirebaseDB } from "../../firebase/config";

export const createNewFamily = () => {
  return async (dispatch) => {
    dispatch(savingNewFamily());
    const newFamily = {
      id: "",
      name: "",
    };
    dispatch(addNewEmptyFamily());
    dispatch(setActiveFamily(newFamily));
  };
};

export const startSaveFamily = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { activeFamily } = getState().family;
    const familyToFirestore = { ...activeFamily };
    if (familyToFirestore.id === "") {
      const newDoc = doc(collection(FirebaseDB, `families/`));
      familyToFirestore.id = newDoc.id;
      await setDoc(newDoc, familyToFirestore);
      dispatch(setActiveFamily(familyToFirestore));
      dispatch(addNewFamily(familyToFirestore));
    } else {
      delete familyToFirestore.id;
      const docRef = doc(FirebaseDB, `families/${activeFamily.id}`);
      await setDoc(docRef, familyToFirestore, { merge: true });
      dispatch(familyUpdated(activeFamily));
    }
  };
};

export const startDeletingFamily = () => {
  return async (dispatch, getState) => {
    const { activeFamily } = getState().family;
    console.log({ activeFamily });
    if (activeFamily.id === "") {
      dispatch(deleteActiveFamily());
    } else {
      await deleteDoc(doc(FirebaseDB, `families/${activeFamily.id}`));
      dispatch(deleteFamilyById(activeFamily.id));
    }
  };
};
//Method to delete an unselected application
//For example when we are in the application list and we want to delete a application from there
export const startDeletingFamilyById = (family) => {
  return async (dispatch, getState) => {
    const { activeFamily } = getState().family;
    console.log(`activeFamily: ${activeFamily} y family: ${family}`);
    if (activeFamily && activeFamily.id === family.id) {
      dispatch(startDeletingFamily());
    }
    //If the application isn't selected, we delete it from the database and the state
    //No need to clear the active application because it's not selected
    if (family.id !== "") {
      await deleteDoc(doc(FirebaseDB, `families/${family.id}`));
      dispatch(deleteFamilyById(family.id));
    }
  };
};

export const startLoadingFamilies = () => {
  return async (dispatch) => {
    const families = await loadFamilies();
    dispatch(setFamilies(families));
  };
};
