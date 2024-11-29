import { Download } from "lucide-react";
import Button from "../atoms/Button";

export default function Footer() {
  return (
    <footer className="flex justify-between items-center mt-4">
      <div className="flex items-center gap-2">
        <label className="text-3xl">SLA: </label>
        <span className="text-red-400 bg-red-100 whitespace-nowrap font-bold w-max p-1 rounded bg-opacity-95">
          VIOLATED
        </span>
      </div>
      <Button
        icon={<Download width={24} height={24} aria-hidden="true" />}
        label="Export"
        className="flex justify-center items-center px-4 py-2 hover:bg-hc-black-200 border-2 border-hc-green-300 font-medium rounded text-center whitespace-nowrap"
      />
    </footer>
  );
}
