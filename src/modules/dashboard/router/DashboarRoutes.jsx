import { Route, Routes, Navigate } from "react-router";
import { HomeView } from "../views/HomeView";
import { CategoriesView } from "../views/CategoriesView";
import { ProductsView } from "../views/ProductsView";
import { ProductsAplicationView } from "../views/ProductsAplicationView";
import { ProductsFamilyView } from "../views/ProductsFamilyView";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsView />} />
      <Route path="/products" element={<ProductsView />} />
      <Route path="/categories" element={<CategoriesView />} />
      <Route path="/application" element={<ProductsAplicationView />} />
      <Route path="/family" element={<ProductsFamilyView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
