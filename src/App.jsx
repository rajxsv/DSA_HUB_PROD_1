import React from "react";
import { Outlet} from "react-router-dom";
import SidePanel from "./Pages/SidePanel";

export default function App() {
  return (
    <div className="flex flex-col h-full">
      <SidePanel />
      <Outlet />
    </div>
  );
}
