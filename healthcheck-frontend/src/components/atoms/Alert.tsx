import React, { useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";

export interface AlertProps {
  title: string;
  content: string | string[];
  icon: LucideIcon;
  borderColor:
    | "border-hc-green-400"
    | "border-hc-red-400"
    | "border-hc-yellow-500"
    | "border-hc-blue-500";
  textColor:
    | "text-hc-green-400"
    | "text-hc-red-400"
    | "text-hc-yellow-400"
    | "text-hc-blue-400";
  duration?: number;
  onClose: () => void;
}

export default function Alert({
  title,
  content,
  icon: Icon,
  borderColor,
  textColor,
  duration = 3000,
  onClose,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false); // Added state to track mouse over

  useEffect(() => {
    setOpacity(1);
    const timer = setTimeout(() => {
      if (!isMouseOver) { // Check if mouse is not over the alert before setting opacity to 0
        setOpacity(0);
        setTimeout(() => {
          setIsVisible(false);
          onClose();
        }, 2000);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose, isMouseOver]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed min-w-72 min-h-14 top-4 right-4 bg-hc-black-400 border-2 ${borderColor} ${textColor} p-4 rounded shadow-lg transition-opacity duration-1000 ease-in-out`}
      style={{ opacity }}
      role="alert"
      onMouseEnter={() => setIsMouseOver(true)} // Set isMouseOver to true on mouse enter
      onMouseLeave={() => setIsMouseOver(false)} // Set isMouseOver to false on mouse leave
    >
      <div className={`flex items-center`}>
        <Icon className="mr-2" size={20} />
        <p className="font-bold">{title}</p>
      </div>
      {Array.isArray(content) ? (
        <ul className="pl-7 list-disc">
          {content.map((item: string, index: number) => (
            <li key={index} className={`text-md font-normal`}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className={`pl-7 text-md font-normal`}>{content}</p>
      )}
    </div>
  );
}
