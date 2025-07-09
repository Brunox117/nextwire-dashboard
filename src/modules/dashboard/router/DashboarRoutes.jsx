import { Route, Routes } from "react-router";
import { HomeView } from "../views/HomeView";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
    </Routes>
  );
};
