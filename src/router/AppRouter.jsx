import { Route, Routes } from "react-router";
import { DashboardPage } from "../dashboard/pages/DashboardPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<DashboardPage />} />
    </Routes>
  );
};
