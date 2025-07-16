import { createSlice } from "@reduxjs/toolkit";

export const applicationSlice = createSlice({
  name: "application",
  initialState: {
    isSaving: false,
    messageSaved: "",
    activeApplication: null,
    applications: [],
    // application: {
    //   id: 'ABC123',
    //   name: '',
    // }
  },
  reducers: {
    savingNewApplication: (state) => {
      state.isSaving = true;
    },
    addNewEmptyApplication: (state) => {
      state.isSaving = false;
    },
    setActiveApplication: (state, action) => {
      state.activeApplication = action.payload;
    },
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    clearApplicationsOnLogout: (state) => {
      (state.isSaving = false),
        (state.messageSaved = ""),
        (state.applications = []),
        (state.activeCategory = null);
    },
    applicationUpdated: (state, action) => {
      state.isSaving = false;
      state.applications = state.applications.map((application) => {
        if (application.id === action.payload.id) {
          return action.payload;
        }
        return application;
      });
      state.messageSaved = ":D";
    },
    addNewApplication: (state, action) => {
      state.isSaving = false;
      state.applications.push(action.payload);
      state.messageSaved = ":D";
    },
    deleteApplicationById: (state, action) => {
      state.activeApplication = null;
      state.applications = state.applications.filter(
        (application) => application.id !== action.payload
      );
    },
    deleteActiveApplication: (state) => {
      state.activeApplication = null;
    },
    clearMessage: (state) => {
      state.messageSaved = "";
    },
  },
});

export const {
  savingNewApplication,
  addNewEmptyApplication,
  setActiveApplication,
  setApplications,
  setSaving,
  clearApplicationsOnLogout,
  applicationUpdated,
  addNewApplication,
  deleteActiveApplication,
  deleteApplicationById,
  clearMessage,
} = applicationSlice.actions;
