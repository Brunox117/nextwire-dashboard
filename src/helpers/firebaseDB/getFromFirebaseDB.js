import { useDispatch } from "react-redux";
import { startLoadingProducts } from "../../store/productsSlice/thunks";
import { useEffect } from "react";

export const useProducts = () => {
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(startLoadingProducts());
  });
};
