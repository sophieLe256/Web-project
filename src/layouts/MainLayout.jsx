import React from "react";
import { Header } from "../component/header";
import { Footer } from "../component/footer";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <>     
      <Outlet />   
    </>
  );
};
