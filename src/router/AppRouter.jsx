import { Route, Routes } from "react-router";
import { DashboardPage } from "../modules/dashboard/pages/DashboardPage";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { AuthRoutes } from "../modules/auth/routes/AuthRoutes";
import { Loading } from "../components/ui/loading";

export const AppRouter = () => {
  const { status } = useCheckAuth();
  
  if (status === "checking") {
    return <Loading />;
  }
  
  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<DashboardPage />} />
      ) : (
        <Route path="/*" element={<AuthRoutes />} />
      )}
    </Routes>
  );
};
