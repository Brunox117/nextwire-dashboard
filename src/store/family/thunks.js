import { loadFamiliesFromSupabase } from "../../helpers/supabaseDB/loadFromSupabase";
import { supabaseDB } from "../../helpers/supabaseDB/supabaseInstance";
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
    const familyToSupabase = { ...activeFamily };
    if (familyToSupabase.id === "") {
      const { data, error } = await supabaseDB
        .from("families")
        .insert([{ name: familyToSupabase.name }])
        .select()
        .single();
      if (error) {
        console.log(error);
        return;
      }
      dispatch(setActiveFamily(data));
      dispatch(addNewFamily(data));
    } else {
      const { error } = await supabaseDB
        .from("families")
        .update({ name: familyToSupabase.name })
        .eq("id", activeFamily.id);
      if (error) {
        console.log(error);
        return;
      }
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
      await supabaseDB.from("families").delete().eq("id", activeFamily.id);
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
      await supabaseDB.from("families").delete().eq("id", family.id);
      dispatch(deleteFamilyById(family.id));
    }
  };
};

export const startLoadingFamilies = () => {
  return async (dispatch) => {
    const families = await loadFamiliesFromSupabase();
    dispatch(setFamilies(families));
  };
};
