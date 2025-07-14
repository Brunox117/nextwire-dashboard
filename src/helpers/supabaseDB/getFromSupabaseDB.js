import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startLoadingProductsFromSupabase } from "../../store/productsSlice/thunks";

export const useProductsFromSupabase = () => {
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(startLoadingProductsFromSupabase());
  });
};
