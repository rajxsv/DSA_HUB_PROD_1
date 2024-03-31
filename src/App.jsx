import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SidePanel from "./Pages/SidePanel";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const isMobile = screenWidth < 768 || screenHeight < 600;
      setIsMobile(isMobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="flex flex-col h-full">
      {isMobile && (
        <div
          className="flex flex-col items-center justify-center bg-black text-white h-svh"
        >
          <p className="font-size-1 font-bol text-2xl m-5 " >
          This app is not compatible with mobile devices yet. 
            </p>
          <p className="font-size-1 font-bol text-2xl m-5 " >
            Sorry for the inconvenience, Still working on it !
          </p>
        </div>
      )}
      {!isMobile && (
        <>
          <SidePanel />
          <Outlet />
        </>
      )}
    </div>
  );
};

export default App;
