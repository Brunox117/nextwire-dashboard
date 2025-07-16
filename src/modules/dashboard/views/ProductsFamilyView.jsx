import React from "react";

import { Family } from "../components/families/Family";
import { useDispatch, useSelector } from "react-redux";

import { CreateBox } from "../components/forms/CreateBox";
import { FamilyList } from "../components/families/FamilyList";
import { createNewFamily } from "../../../store/familySlice/thunks";
import { FamilyForm } from "./forms/FamilyForm";

export const ProductsFamilyView = () => {
  const { activeFamily, families } = useSelector((state) => state.family);
  const dispatch = useDispatch();
  const onClickAddNewFamily = () => {
    dispatch(createNewFamily());
  };

  return (
    <>
      {!activeFamily ? (
        <CreateBox title="Agrega una familia" onClick={onClickAddNewFamily} />
      ) : (
        <>
          <FamilyForm />
          <Family family={activeFamily} />
        </>
      )}
      <FamilyList families={families} />
    </>
  );
};
