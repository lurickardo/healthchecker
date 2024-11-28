"use client";

import { useState, useEffect } from "react";
import { Lock, LockOpen } from "lucide-react";
import { menuIcons, menuLinks } from "../molecules/sidebar/menus/menu.links";
import Image from "../atoms/Image";

export default function SideBar() {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("hcOpenSidebar") === "true";
      setOpen(savedState);
      setPinned(savedState);
    }
  }, []);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [open]);

  const handleOpen = () => {
    if (!pinned) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    if (!pinned) {
      setOpen(false);
    }
  };

  const handleTogglePin = () => {
    setPinned(!pinned);
    setOpen(!pinned);
    if (typeof window !== "undefined") {
      localStorage.setItem("hcOpenSidebar", String(!pinned));
    }
  };

  return (
    <section
      className={`pt-12 pl-1 pr-12 transition-all duration-300 ease-in-out ${
        open ? "ml-64" : "ml-16"
      }`}
    >
      <div
        className={`bg-hc-black-400 border-r-2 border-gray-600 fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out ${
          open ? "w-80" : "w-[5.2rem] hover:w-80"
        } flex flex-col`}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
        <div className="flex items-center space-x-4 p-6 pl-4 pb-0">
          <Image src="/favicon.png" alt="Icon Sidebar" className="w-10 h-10" />
          {showContent && <h1 className="text-white text-lg">Healthchecker</h1>}
        </div>

        <div
          className={`flex-1 overflow-auto ${showContent ? "block" : "hidden"}`}
        >
          <ul className="">
            {menuLinks().map((link) => (
              <li key={link.key}>{link.prop}</li>
            ))}
          </ul>
        </div>
        <div
          className={`flex-1 overflow-auto ${showContent ? "hidden" : "block"}`}
        >
          <ul className="">
            {menuIcons().map((link) => (
              <li key={link.key}>{link.prop}</li>
            ))}
          </ul>
        </div>

        <div className="mt-auto p-4 pl-6">
          <button
            type="button"
            className="text-hc-white-100 transform transition-transform duration-300"
            onClick={handleTogglePin}
          >
            {pinned ? (
              <Lock
                className="bg-gray-700 hover:bg-gray-600 rounded p-2 w-9 h-9"
                width={28}
                height={28}
              />
            ) : (
              <LockOpen
                className="hover:bg-gray-600 rounded p-2 w-9 h-9"
                width={28}
                height={28}
              />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
