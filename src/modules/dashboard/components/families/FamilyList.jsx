import React from "react";
import { useDispatch } from "react-redux";
import { setActiveFamily } from "../../../../store/family/familySlice";
import { startDeletingFamilyById } from "../../../../store/family/thunks";
import { Family } from "./Family";

export const FamilyList = ({ families }) => {
  const dispatch = useDispatch();
  const onEdit = (family) => {
    dispatch(setActiveFamily(family));
  };
  const onDelete = (family) => {
    dispatch(startDeletingFamilyById(family));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {families.map((family) => (
        <Family
          key={family.id}
          family={family}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
