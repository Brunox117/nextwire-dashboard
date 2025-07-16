import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    isSaving: false,
    messageSaved: "",
    categories: [],
    activeCategory: null,
    // category: {
    //     id: 'ABC123',
    //     name: ''
    // }
  },
  reducers: {
    savingNewCategory: (state) => {
      state.isSaving = true;
    },
    addNewEmptyCategory: (state) => {
      state.isSaving = false;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    clearCategoriesOnLogout: (state) => {
      (state.isSaving = false),
        (state.messageSaved = ""),
        (state.categories = []),
        (state.activeCategory = null);
    },
    categoryUpdated: (state, action) => {
      state.isSaving = false;
      state.categories = state.categories.map((category) => {
        if (category.id === action.payload.id) {
          return action.payload;
        }
        return category;
      });
      state.messageSaved = ":D";
    },
    addNewCategory: (state, action) => {
      state.isSaving = false;
      state.categories.push(action.payload);
      state.messageSaved = ":D";
    },
    deleteCategoryById: (state, action) => {
      state.activeCategory = null;
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    deleteActiveCategory: (state) => {
      state.activeCategory = null;
    },
    clearMessage: (state) => {
      state.messageSaved = "";
    },
  },
});

export const {
  savingNewCategory,
  addNewEmptyCategory,
  setActiveCategory,
  setCategories,
  setSaving,
  clearCategoriesOnLogout,
  categoryUpdated,
  addNewCategory,
  deleteCategoryById,
  deleteActiveCategory,
  clearMessage,
} = categorySlice.actions;
