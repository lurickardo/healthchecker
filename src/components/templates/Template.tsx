"use client";

import { useState } from "react";
import SideBar from "../organisms/Sidebar";

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <main className="flex gap-10 min-h-screen bg-wave bg-no-repeat bg-bottom bg-contain text-lg">
        <SideBar onSidebarStateChange={setSidebarOpen} />
        <div
          className={`pl-4 transition-all duration-300 ease-in-out mt-6 ${
            sidebarOpen ? "w-sideBarOpen ml-[-1rem]" : "w-default ml-0"
          }`}
        >
          <div className="bg-hc-black-400 border-2 border-gray-600 rounded p-4">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
