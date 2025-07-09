import { Route, Routes } from "react-router";
import { DashboardPage } from "../modules/dashboard/pages/DashboardPage";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { DashboardRoutes } from "../modules/dashboard/router/DashboarRoutes";
import { AuthRoutes } from "../modules/auth/routes/AuthRoutes";

export const AppRouter = () => {
  const { status } = useCheckAuth();
  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<DashboardRoutes />} />
      ) : (
        <Route path="/*" element={<AuthRoutes />} />
      )}
    </Routes>
  );
};
