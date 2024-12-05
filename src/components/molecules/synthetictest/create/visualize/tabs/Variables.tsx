"use client";

import Button from "@/components/atoms/Button";
import { ClipboardPen, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Variable() {
  const [showSelect, setShowSelect] = useState<boolean>(true);

  return (
    <div className="min-h-[43rem]">
      <div className="mt-4 mb-8">
        <span className="flex justify-between items-center whitespace-nowrap rounded">
          <span className="text-2xl font-bold">Variables</span>
          <div className="flex cursor-pointer border border-hc-green-300 rounded p-2 hover:bg-hc-black-200">
            <Plus height={18} width={18} />
          </div>
        </span>
      </div>
      <div>
        <span className="flex justify-between items-center whitespace-nowrap text-md mb-4">
          BASE_URL
          <div className="flex space-x-6">
            <span className="flex border border-hc-green-300 rounded p-2">
              <ClipboardPen height={18} width={18} />
            </span>
            <span className="flex border border-hc-green-300 rounded p-2">
              <Trash2 height={18} width={18} />
            </span>
          </div>
        </span>
      </div>
    </div>
  );
}
