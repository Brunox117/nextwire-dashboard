import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateBox } from "../components/forms/CreateBox";
import { createNewCategory } from "../../../store/categorySlice/thunks";
import { Category } from "../components/categories/Category";
import { CategoryForm } from "./forms/CategoryForm";
import { CategoriesList } from "../components/categories/CategoriesList";

export const CategoriesView = () => {
  const { activeCategory, categories: categoriesFromFirebase } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();
  const onClickAddNewCategory = () => {
    dispatch(createNewCategory());
  };
  return (
    <>
      {!activeCategory ? (
        <CreateBox
          title="Agrega una categoría"
          onClick={onClickAddNewCategory}
        />
      ) : (
        <>
          <CategoryForm />
          <Category category={activeCategory} />
        </>
      )}
      <CategoriesList categories={categoriesFromFirebase} />
    </>
  );
};
