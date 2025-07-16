import React from "react";
import { useDispatch } from "react-redux";

import { Aplication } from "./Aplication";
import { setActiveApplication } from "../../../../store/applicationSlice/applicationSlice";
import { startDeletingApplicationById } from "../../../../store/applicationSlice/thunks";

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
