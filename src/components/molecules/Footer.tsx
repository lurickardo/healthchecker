import { Download } from "lucide-react";
import Button from "../atoms/Button";
import Sla from "./Sla";

interface IFooterProps {
  children?: React.ReactNode;
}

export default function Footer({ children }: IFooterProps) {
  return (
    <footer className="flex justify-between items-center mt-4">
      {children}
    </footer>
  );
}
