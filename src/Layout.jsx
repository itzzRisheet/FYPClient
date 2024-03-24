import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import DahsNavbar from "./components/dashNavbar";

import ConditionalNavbar from "./components/conditionalNavbar";

const Layout = () => {
  return (
    <div>
      <ConditionalNavbar />
      <Outlet />
    </div>
  );
};

export default Layout;
