import { createSlice } from "@reduxjs/toolkit";

export const familySlice = createSlice({
  name: "family",
  initialState: {
    isSaving: false,
    messageSaved: "",
    activeFamily: null,
    families: [],
    // application: {
    //   id: 'ABC123',
    //   name: '',
    // }
  },
  reducers: {
    savingNewFamily: (state) => {
      state.isSaving = true;
    },
    addNewEmptyFamily: (state) => {
      state.isSaving = false;
    },
    setActiveFamily: (state, action) => {
      state.activeFamily = action.payload;
    },
    setFamilies: (state, action) => {
      state.families = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    clearFamiliesOnLogout: (state) => {
      (state.isSaving = false),
        (state.messageSaved = ""),
        (state.families = []),
        (state.activeFamily = null);
    },
    familyUpdated: (state, action) => {
      state.isSaving = false;
      state.families = state.families.map((family) => {
        if (family.id === action.payload.id) {
          return action.payload;
        }
        return family;
      });
      state.messageSaved = ":D";
    },
    addNewFamily: (state, action) => {
      state.isSaving = false;
      state.families.push(action.payload);
      state.messageSaved = ":D";
    },
    deleteFamilyById: (state, action) => {
      state.activeFamily = null;
      state.families = state.families.filter(
        (family) => family.id !== action.payload
      );
    },
    deleteActiveFamily: (state) => {
      state.activeFamily = null;
    },
    clearMessage: (state) => {
      state.messageSaved = "";
    },
  },
});

export const {
  savingNewFamily,
  addNewEmptyFamily,
  setActiveFamily,
  setFamilies,
  setSaving,
  clearFamiliesOnLogout,
  familyUpdated,
  addNewFamily,
  deleteActiveFamily,
  deleteFamilyById,
  clearMessage,
} = familySlice.actions;
