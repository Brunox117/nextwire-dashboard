import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startLoadingProductsFromSupabase } from "../../store/productsSlice/thunks";
import { startLoadingCategories } from "../../store/categorySlice/thunks";

export const useProductsFromSupabase = () => {
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(startLoadingProductsFromSupabase());
  });
};

export const useCategoriesFromSupabase = () => {
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(startLoadingCategories());
  });
};
