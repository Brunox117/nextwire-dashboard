import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { loadApplications } from "../../helpers/firebaseDB/loadFromFirebase";
import {
  addNewApplication,
  addNewEmptyApplication,
  applicationUpdated,
  deleteActiveApplication,
  deleteApplicationById,
  savingNewApplication,
  setActiveApplication,
  setApplications,
  setSaving,
} from "./applicationSlice";
import { FirebaseDB } from "../../firebase/config";

export const createNewApplication = () => {
  return async (dispatch) => {
    dispatch(savingNewApplication());
    const newApplication = {
      id: "",
      name: "",
    };
    dispatch(addNewEmptyApplication());
    dispatch(setActiveApplication(newApplication));
  };
};

export const startSaveApplication = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { activeApplication } = getState().application;
    const applicationToFirestore = { ...activeApplication };
    if (applicationToFirestore.id === "") {
      const newDoc = doc(collection(FirebaseDB, `applications/`));
      applicationToFirestore.id = newDoc.id;
      await setDoc(newDoc, applicationToFirestore);
      dispatch(setActiveApplication(applicationToFirestore));
      dispatch(addNewApplication(applicationToFirestore));
    } else {
      delete applicationToFirestore.id;
      const docRef = doc(FirebaseDB, `applications/${activeApplication.id}`);
      await setDoc(docRef, applicationToFirestore, { merge: true });
      dispatch(applicationUpdated(activeApplication));
    }
  };
};

export const startDeletingApplication = () => {
  return async (dispatch, getState) => {
    const { activeApplication } = getState().application;
    console.log({ activeApplication });
    if (activeApplication.id === "") {
      dispatch(deleteActiveApplication());
    } else {
      await deleteDoc(doc(FirebaseDB, `applications/${activeApplication.id}`));
      dispatch(deleteApplicationById(activeApplication.id));
    }
  };
};
//Method to delete an unselected application
//For example when we are in the application list and we want to delete a application from there
export const startDeletingApplicationById = (application) => {
  return async (dispatch, getState) => {
    const { activeApplication } = getState().application;
    console.log(
      `activeApplication: ${activeApplication} y application: ${application}`
    );
    if (activeApplication && activeApplication.id === application.id) {
      dispatch(startDeletingApplication());
    }
    //If the application isn't selected, we delete it from the database and the state
    //No need to clear the active application because it's not selected
    if (application.id !== "") {
      await deleteDoc(doc(FirebaseDB, `applications/${application.id}`));
      dispatch(deleteApplicationById(application.id));
    }
  };
};

export const startLoadingApplications = () => {
  return async (dispatch) => {
    const applications = await loadApplications();
    dispatch(setApplications(applications));
  };
};
