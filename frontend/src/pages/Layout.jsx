import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";

function Layout() {
  return (
    <div>
      <ToastContainer />
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
