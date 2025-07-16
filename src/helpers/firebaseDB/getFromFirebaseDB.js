import { useDispatch } from "react-redux";
import { startLoadingProducts } from "../../store/productsSlice/thunks";
import { useEffect } from "react";
import { startLoadingCategories } from "../../store/categorySlice/thunks";
import { startLoadingApplications } from "../../store/applicationSlice/thunks";
import { startLoadingFamilies } from "../../store/familySlice/thunks";

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

export const useApplications = () => {
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(startLoadingApplications());
  });
};

export const useFamilies = () => {
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(startLoadingFamilies());
  });
};

