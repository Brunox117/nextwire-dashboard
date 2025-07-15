import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startLoadingProductsFromSupabase } from "../../store/productsSlice/thunks";
import { startLoadingCategories } from "../../store/categorySlice/thunks";
import { startLoadingApplications } from "../../store/application/thunks";
import { startLoadingFamilies } from "../../store/family/thunks";

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

export const useApplicationsFromSupabase = () => {
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(startLoadingApplications());
  });
};

export const useFamiliesFromSupabase = () => {
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(startLoadingFamilies());
  });
};
