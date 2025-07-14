import { useDispatch } from "react-redux";
import { startLoadingProducts } from "../../store/productsSlice/thunks";
import { useEffect } from "react";
import { startLoadingCategories } from "../../store/categorySlice/thunks";

export const useProducts = () => {
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(startLoadingProducts());
  });
};

export const useCategories = () => {
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(startLoadingCategories());
  });
};
