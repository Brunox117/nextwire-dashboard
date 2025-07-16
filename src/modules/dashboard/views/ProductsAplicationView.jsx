import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateBox } from "../components/forms/CreateBox";
import { ApplicationForm } from "./forms/ApplicationForm";
import { ApplicationList } from "../components/applications/ApplicationList";
import { Aplication } from "../components/applications/Aplication";
import { createNewApplication } from "../../../store/applicationSlice/thunks";

export const ProductsAplicationView = () => {
  const { activeApplication, applications } = useSelector(
    (state) => state.application
  );
  const dispatch = useDispatch();
  const onClickAddNewApplication = () => {
    dispatch(createNewApplication());
  };
  return (
    <>
      {!activeApplication ? (
        <CreateBox
          title="Agrega una aplicación"
          onClick={onClickAddNewApplication}
        />
      ) : (
        <>
          <ApplicationForm />
          <Aplication application={activeApplication} />
        </>
      )}
      <ApplicationList applications={applications} />
    </>
  );
};
