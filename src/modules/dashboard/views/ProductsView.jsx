import React from "react";
import { CreateBox } from "../components/forms/CreateBox";
import { useDispatch, useSelector } from "react-redux";
import { createNewProduct } from "../../../store/productsSlice/thunks";
import { ProductForm } from "./forms/ProductForm";
import { Product } from "../components/products/Product";
import { ProductList } from "../components/products/ProductList";

export const ProductsView = () => {
  const { activeProduct, products: productsFromFirebase } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  const onClickAddProduct = () => {
    dispatch(createNewProduct());
  };
  return (
    <div>
      {!activeProduct ? (
        <CreateBox title="Agrega un producto" onClick={onClickAddProduct} />
      ) : (
        <>
          <ProductForm />
          <Product product={activeProduct} />
        </>
      )}
      <ProductList products={productsFromFirebase} />
    </div>
  );
};
