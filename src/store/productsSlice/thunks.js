import {
  addNewEmptyProduct,
  addNewProduct,
  deleteActiveProduct,
  deleteProductById,
  productUpdated,
  savingNewProduct,
  setActiveProduct,
  setProducts,
  setSaving,
} from "./productSlice";
import { imgDelete } from "../../helpers/imgDelete";
import { loadProductsFromSupabase } from "../../helpers/supabaseDB/loadFromSupabase";
import { supabaseDB } from "../../helpers/supabaseDB/supabaseInstance";

export const createNewProduct = () => {
  return async (dispatch) => {
    dispatch(savingNewProduct());
    const newProduct = {
      id: "",
      name: "",
      description: "",
      image_url: "",
    };
    dispatch(addNewEmptyProduct());
    dispatch(setActiveProduct(newProduct));
  };
};

export const startSaveProduct = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { activeProduct } = getState().product;
    const productToFirestore = { ...activeProduct };

    if (productToFirestore.id === "") {
      // Crear producto nuevo
      const { data, error } = await supabaseDB
        .from("products")
        .insert([
          {
            name: productToFirestore.name,
            description: productToFirestore.description,
            image_url: "url",
          },
        ])
        .select()
        .single();

      if (error) {
        console.log(error);
        return;
      }
      console.log(`el producto creado desde supabase es: ${data}`);
      dispatch(setActiveProduct(data));
      dispatch(addNewProduct(data));
    } else {
      // Editar producto existente
      const { error } = await supabaseDB
        .from("products")
        .update({
          name: productToFirestore.name,
          description: productToFirestore.description,
          image_url: "url",
        })
        .eq("id", activeProduct.id);
      if (error) {
        // Manejar error
        return;
      }
      dispatch(productUpdated(activeProduct));
    }
  };
};

export const startDeletingProduct = () => {
  return async (dispatch, getState) => {
    const { activeProduct } = getState().product;
    // TODO: Delete image from supabase storage
    const image_url = activeProduct.image_url;
    if (image_url !== "") {
      await imgDelete(image_url);
    }
    if (activeProduct.id === "") {
      dispatch(deleteActiveProduct());
    } else {
      await supabaseDB.from("products").delete().eq("id", activeProduct.id);
      dispatch(deleteProductById(activeProduct.id));
    }
  };
};

export const startDeletingProductById = (product) => {
  return async (dispacth, getState) => {
    const { activeProduct } = getState().product;
    if (activeProduct && activeProduct.id === product.id) {
      dispacth(startDeletingProduct());
    }
    // TODO: Delete image from supabase storage
    // const image_url = product.image_url;
    // if (image_url !== "") {
    //   await imgDelete(image_url);
    // }
    if (product.id === "") {
      console.log(`product.id = ${product.id}`);
    } else {
      console.log(`products/${product.id}`);
      await supabaseDB.from("products").delete().eq("id", product.id);
      dispacth(deleteProductById(product.id));
    }
  };
};

export const startLoadingProducts = () => {
  return async (dispatch) => {
    const products = await loadProductsFromSupabase();
    dispatch(setProducts(products));
  };
};

export const startLoadingProductsFromSupabase = () => {
  return async (dispatch) => {
    const products = await loadProductsFromSupabase();
    dispatch(setProducts(products));
  };
};
