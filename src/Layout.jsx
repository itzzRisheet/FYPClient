import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import { localStore } from "./store/store";

const Layout = () => {

  const { loginStatus} = localStore();
  
  return (
    <div>
      { loginStatus ? "":<Navbar/>}
      <Outlet />
    </div>
  );
};

export default Layout;
