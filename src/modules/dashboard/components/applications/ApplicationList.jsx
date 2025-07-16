import React from "react";
import { useDispatch } from "react-redux";
import { setActiveApplication } from "../../../../store/application/applicationSlice";
import { startDeletingApplicationById } from "../../../../store/application/thunks";
import { Aplication } from "./Aplication";

export const ApplicationList = ({ applications }) => {
  const dispatch = useDispatch();
  const onEdit = (application) => {
    dispatch(setActiveApplication(application));
  };
  const onDelete = (application) => {
    dispatch(startDeletingApplicationById(application));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {applications.map((application) => (
        <Aplication
          key={application.id}
          application={application}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
