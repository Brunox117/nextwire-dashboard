import { Route, Routes } from "react-router";
import { LoginPage } from "../pages/LoginPage";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<LoginPage />} />
    </Routes>
  );
};
