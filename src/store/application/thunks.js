import { loadApplicationsFromSupabase } from "../../helpers/supabaseDB/loadFromSupabase";
import { supabaseDB } from "../../helpers/supabaseDB/supabaseInstance";
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
    const applicationToSupabase = { ...activeApplication };
    if (applicationToSupabase.id === "") {
      const { data, error } = await supabaseDB
        .from("applications")
        .insert([{ name: applicationToSupabase.name }])
        .select()
        .single();
      if (error) {
        console.log(error);
        return;
      }
      dispatch(setActiveApplication(data));
      dispatch(addNewApplication(data));
    } else {
      const { error } = await supabaseDB
        .from("applications")
        .update({ name: applicationToSupabase.name })
        .eq("id", activeApplication.id);
      if (error) {
        console.log(error);
        return;
      }
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
      await supabaseDB
        .from("applications")
        .delete()
        .eq("id", activeApplication.id);
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
      await supabaseDB.from("applications").delete().eq("id", application.id);
      dispatch(deleteApplicationById(application.id));
    }
  };
};

export const startLoadingApplications = () => {
  return async (dispatch) => {
    const applications = await loadApplicationsFromSupabase();
    dispatch(setApplications(applications));
  };
};
