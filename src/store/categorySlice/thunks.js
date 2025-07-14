import { loadCategoriesFromSupabase } from "../../helpers/supabaseDB/loadFromSupabase";
import { supabaseDB } from "../../helpers/supabaseDB/supabaseInstance";
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
    const categoryToSupabase = { ...activeCategory };
    if (categoryToSupabase.id === "") {
      const { data, error } = await supabaseDB
        .from("categories")
        .insert([{ name: categoryToSupabase.name }])
        .select()
        .single();
      if (error) {
        console.log(error);
        return;
      }
      dispatch(setActiveCategory(data));
      dispatch(addNewCategory(data));
    } else {
      const { error } = await supabaseDB
        .from("categories")
        .update({ name: categoryToSupabase.name })
        .eq("id", activeCategory.id);
      if (error) {
        console.log(error);
        return;
      }
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
      await supabaseDB.from("categories").delete().eq("id", activeCategory.id);
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
      await supabaseDB.from("categories").delete().eq("id", category.id);
      dispatch(deleteCategoryById(category.id));
    }
  };
};

export const startLoadingCategories = () => {
  return async (dispatch) => {
    const categories = await loadCategoriesFromSupabase();
    dispatch(setCategories(categories));
  };
};
