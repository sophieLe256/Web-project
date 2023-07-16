import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./component/header";
import { Sidebar } from "./component/sidebar";
import { Footer } from "./component/footer";

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
