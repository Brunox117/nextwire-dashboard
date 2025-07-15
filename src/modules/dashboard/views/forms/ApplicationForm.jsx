import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../../hooks/useForm";
import {
  clearMessage,
  deleteActiveApplication,
  setActiveApplication,
} from "../../../../store/application/applicationSlice";
import {
  createNewApplication,
  startDeletingApplication,
  startSaveApplication,
} from "../../../../store/application/thunks";
import Swal from "sweetalert2";
import { Input } from "../../../../components/ui/input";
import { FormLayout } from "../../components/forms/FormLayout";

const formValidations = {
  name: [(value) => value.trim().length > 0, "El nombre es requerido"],
};

export const ApplicationForm = () => {
  const dispatch = useDispatch();
  const { activeApplication, isSaving, messageSaved } = useSelector(
    (state) => state.application
  );
  const { id, name, onInputChange, setFormState, isFormValid } = useForm(
    activeApplication,
    formValidations
  );

  useEffect(() => {
    dispatch(setActiveApplication({ id, name }));
  }, [dispatch, id, name]);

  const onSaveApplication = () => {
    dispatch(startSaveApplication(activeApplication));
  };

  const onCancel = () => {
    dispatch(deleteActiveApplication());
  };

  const onCreateApplication = () => {
    dispatch(createNewApplication());
    setFormState(activeApplication);
  };

  const onDelete = () => {
    Swal.fire({
      title: "Seguro que quieres borrar la aplicación!",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "SI",
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingApplication());
      } else if (result.isDenied) {
        return;
      }
    });
  };

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Aplicación actualizada/creada", "", "success");
      setTimeout(() => {
        dispatch(createNewApplication());
      }, 100);
    }
    dispatch(clearMessage());
  }, [messageSaved, dispatch]);
  return (
    <FormLayout
      title="Formulario de aplicaciones"
      onCreate={onCreateApplication}
      onDelete={onDelete}
      onSave={onSaveApplication}
      isFormValid={isFormValid}
      isSaving={isSaving}
      onCancel={onCancel}
    >
      <Input
        className="max-w-sm"
        placeholder="Nombre de la aplicación"
        name="name"
        value={name}
        onChange={onInputChange}
      />
    </FormLayout>
  );
};
