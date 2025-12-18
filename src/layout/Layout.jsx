import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Sidebar from "../pages/sidebar/Sidebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-[#030712] text-white">
      <header className="h-[10vh] border-b border-gray-700">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </header>

      <div className="flex h-[90vh]">
        <aside
          className={`${
            isSidebarOpen ? "w-70" : ""
          } border-r border-gray-700 transition-all`}
        >
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
