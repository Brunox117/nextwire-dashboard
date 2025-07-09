import React from "react";
import { NavBar } from "../components/common/NavBar";
import { Footer } from "../components/common/Footer";
import { DashboardRoutes } from "../router/DashboarRoutes";

export const DashboardPage = () => {
  return (
    <>
      <NavBar />
      <div className="bg--300 h-screen">
        <DashboardRoutes />
      </div>
      <Footer />
    </>
  );
};
