import React from "react";
import { Category } from "./Category";
import { useDispatch } from "react-redux";
import { setActiveCategory } from "../../../../store/categorySlice/categorySlice";
import { startDeletingCategoryById } from "../../../../store/categorySlice/thunks";

export const CategoriesList = ({ categories }) => {
  const dispatch = useDispatch();
  const onEdit = (category) => {
    dispatch(setActiveCategory(category));
  };
  const onDelete = (category) => {
    dispatch(startDeletingCategoryById(category));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
