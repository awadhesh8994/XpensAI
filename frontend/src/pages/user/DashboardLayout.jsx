import React from "react";
import SideMenu from "../../components/SideMenu";
import { Outlet } from "react-router";

function DashboardLayout() {
  return (
    <div className="flex">
      {/* left */}
      <div className="">
        <SideMenu />
      </div>

      {/* right */}
      <div className=" pl-64 pt-16 min-h-screen  flex-1  bg-gray-200">
        <div className="p-10 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
