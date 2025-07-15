import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../../hooks/useForm";
import {
  clearMessage,
  deleteActiveFamily,
  setActiveFamily,
} from "../../../../store/family/familySlice";
import {
  createNewFamily,
  startDeletingFamily,
  startSaveFamily,
} from "../../../../store/family/thunks";
import Swal from "sweetalert2";
import { FormLayout } from "../../components/forms/FormLayout";
import { Input } from "../../../../components/ui/input";

const formValidations = {
  name: [(value) => value.trim().length > 0, "El nombre es requerido"],
};

export const FamilyForm = () => {
  const dispatch = useDispatch();
  const { activeFamily, isSaving, messageSaved } = useSelector(
    (state) => state.family
  );
  const { id, name, onInputChange, setFormState, isFormValid } = useForm(
    activeFamily,
    formValidations
  );

  useEffect(() => {
    dispatch(setActiveFamily({ id, name }));
  }, [dispatch, id, name]);

  const onSaveFamily = () => {
    dispatch(startSaveFamily(activeFamily));
  };

  const onCancel = () => {
    dispatch(deleteActiveFamily());
  };

  const onCreateFamily = () => {
    dispatch(createNewFamily());
    setFormState(activeFamily);
  };

  const onDelete = () => {
    Swal.fire({
      title: "Seguro que quieres borrar la familia!",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "SI",
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingFamily());
      } else if (result.isDenied) {
        return;
      }
    });
  };

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Familia actualizada/creada", "", "success");
      setTimeout(() => {
        dispatch(createNewFamily());
      }, 100);
    }
    dispatch(clearMessage());
  }, [messageSaved, dispatch]);

  return (
    <FormLayout
      title="Formulario de familias"
      onCreate={onCreateFamily}
      onDelete={onDelete}
      onSave={onSaveFamily}
      isFormValid={isFormValid}
      isSaving={isSaving}
      onCancel={onCancel}
    >
      <Input
        className="max-w-sm"
        placeholder="Nombre de la familia"
        name="name"
        value={name}
        onChange={onInputChange}
      />
    </FormLayout>
  );
};
