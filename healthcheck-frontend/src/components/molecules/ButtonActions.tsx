"use client";

import { useState } from "react";

interface ButtonActionsProps {
  className?: string;
  iconButton?: React.ReactNode;
  nameButton?: string;
  classNameButton?: string;
  children: React.ReactNode;
}

export default function ButtonActions({
  className,
  iconButton,
  nameButton,
  classNameButton,
  children,
}: ButtonActionsProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div onClick={handleOpen}>
        <button className={classNameButton}>
          {iconButton}
          {nameButton}
        </button>
      </div>
      <div
        className={`${open ? "block" : "hidden"} ${className || ""}`}
        role="menu"
        aria-orientation="vertical"
        tabIndex={-1}
      >
        {children}
      </div>
    </>
  );
}
