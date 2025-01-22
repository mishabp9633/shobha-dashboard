import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {

const calculatdHeight = "calc(100vh - 3.8rem)";
const calculatedWidth = "calc(100vw - 13.1rem)";
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{width:calculatedWidth,height:calculatdHeight,}}>
          {/* Content for the current route will be rendered here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
