import React, { useEffect } from "react";
import { FormLayout } from "../../components/forms/FormLayout";
import { Input } from "../../../../components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../../hooks/useForm";
import {
  createNewCategory,
  startDeletingCategory,
  startSaveCategory,
} from "../../../../store/categorySlice/thunks";
import {
  clearMessage,
  setActiveCategory,
  deleteActiveCategory,
} from "../../../../store/categorySlice/categorySlice";
import Swal from "sweetalert2";

const formValidations = {
  name: [(value) => value.trim().length > 0, "El nombre es requerido"],
};

export const CategoryForm = () => {
  const dispatch = useDispatch();
  const { activeCategory, isSaving, messageSaved } = useSelector(
    (state) => state.category
  );
  const { id, name, onInputChange, setFormState, isFormValid } = useForm(
    activeCategory,
    formValidations
  );

  useEffect(() => {
    dispatch(setActiveCategory({ id, name }));
  }, [dispatch, id, name]);

  const onSaveCategory = () => {
    dispatch(startSaveCategory(activeCategory));
  };

  const onCancel = () => {
    dispatch(deleteActiveCategory());
  };

  const onCreateCategory = () => {
    dispatch(createNewCategory());
    setFormState(activeCategory);
  };

  const onDelete = () => {
    Swal.fire({
      title: "Seguro que quieres borrar la categoría!",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "SI",
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingCategory());
      } else if (result.isDenied) {
        return;
      }
    });
  };

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Categoría actualizada/creada", "", "success");
      setTimeout(() => {
        dispatch(createNewCategory());
      }, 100);
    }
    dispatch(clearMessage());
  }, [messageSaved, dispatch]);

  return (
    <FormLayout
      title="Formulario de categorías"
      onCreate={onCreateCategory}
      onDelete={onDelete}
      onSave={onSaveCategory}
      isFormValid={isFormValid}
      isSaving={isSaving}
      onCancel={onCancel}
    >
      <Input
        className="max-w-sm"
        placeholder="Nombre de la categoría"
        name="name"
        value={name}
        onChange={onInputChange}
      />
    </FormLayout>
  );
};
