import React, { useEffect } from "react";
import { FormLayout } from "../../components/forms/FormLayout";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../../hooks/useForm";
import {
  clearMessage,
  deleteActiveProduct,
  setActiveProduct,
} from "../../../../store/productsSlice/productSlice";
import Swal from "sweetalert2";
import {
  createNewProduct,
  startDeletingProduct,
  startSaveProduct,
} from "../../../../store/productsSlice/thunks";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";

const formValidations = {
  name: [(value) => value.trim().length > 0, "El nombre es requerido"],
  description: [
    (value) => value.trim().length > 0,
    "La descripción es requerida",
  ],
  // image_url: [
  //   (value) => value.trim().length > 0,
  //   "La URL de la imagen es requerida",
  // ],
};

export const ProductForm = () => {
  const dispatch = useDispatch();
  const { activeProduct, isSaving, messageSaved } = useSelector(
    (state) => state.product
  );
  // id: "",
  // name: "",
  // description: "",
  // image_url: "",
  const { id, name, description, onInputChange, setFormState, isFormValid } =
    useForm(activeProduct, formValidations);

  useEffect(() => {
    dispatch(
      setActiveProduct({
        id,
        name,
        description,
        // image_url,
      })
    );
  }, [dispatch, name, description, id]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Producto actualizado/creado", "", "success");
      setTimeout(() => {
        dispatch(createNewProduct());
      }, 100);
    }
    dispatch(clearMessage());
  }, [messageSaved, dispatch]);

  const onSaveProduct = () => {
    dispatch(startSaveProduct());
  };

  const onCancel = () => {
    dispatch(deleteActiveProduct());
  };

  const onCreateProduct = () => {
    dispatch(createNewProduct());
    setFormState(activeProduct);
  };

  const onDelete = () => {
    Swal.fire({
      title: "Seguro que quieres borrar el producto!",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "SI",
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingProduct());
      } else if (result.isDenied) {
        return;
      }
    });
  };

  // const onFileInputChange = ({target}) => {
  //   if(target.files === 0) return;
  //   console.log('Aqui se subiria la foto')
  // }

  return (
    <FormLayout
      title="Formulario de productos"
      onCreate={onCreateProduct}
      onDelete={onDelete}
      onSave={onSaveProduct}
      isFormValid={isFormValid}
      isSaving={isSaving}
      onCancel={onCancel}
    >
      <Input
        className="max-w-sm"
        placeholder="Nombre del producto"
        name="name"
        value={name}
        onChange={onInputChange}
      />

      <Textarea
        className="mt-2"
        placeholder="Descripción del producto"
        name="description"
        value={description}
        onChange={onInputChange}
      />
    </FormLayout>
  );
};
