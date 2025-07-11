import React from "react";
import { Product } from "./Product";
import { useDispatch } from "react-redux";
import { setActiveProduct } from "../../../../store/productsSlice/productSlice";
import { startDeletingProductById } from "../../../../store/productsSlice/thunks";

export const ProductList = ({ products }) => {
  const dispatch = useDispatch();
  const onEdit = (product) => {
    dispatch(setActiveProduct(product));
  };
  const onDelete = (product) => {
    console.log({ product });
    dispatch(startDeletingProductById(product));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
