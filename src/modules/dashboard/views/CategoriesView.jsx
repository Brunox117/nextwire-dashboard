import React from "react";
import { useDispatch } from "react-redux";
import { CreateBox } from "../components/forms/CreateBox";

export const CategoriesView = () => {
  const dispatch = useDispatch();
  const onClickAddNewCategory = () => {
    // dispatch(createNewCategory());
  };
  return (
    <>
      <CreateBox title="Agrega una categoría" onClick={onClickAddNewCategory} />
    </>
  );
};
