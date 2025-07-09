import React from "react";
import { NavBar } from "../components/common/NavBar";
import { HomeView } from "../views/HomeView";
import { Footer } from "../components/common/Footer";

export const DashboardPage = () => {
  return (
    <>
      <NavBar />
      <HomeView />
      <Footer />
    </>
  );
};
