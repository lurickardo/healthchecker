"use client";

import ResponsePreview from "./visualizeTabs/ResponsePreview";
import Variable from "./visualizeTabs/Variables";
import { useState } from "react";

export default function Visualize() {
  const [activeTab, setActiveTab] = useState("Response preview");

  return (
    <div className="justify-start w-5/12 border-gray-600 rounded border-2 p-4 min-h-[49rem]">
      <div className="space-x-6 mb-10">
        <span
          className={`whitespace-nowrap p-2 border-b-4 cursor-pointer ${
            activeTab === "Response preview" ? "border-hc-green-400" : ""
          }`}
          onClick={() => setActiveTab("Response preview")}
        >
          Response Preview
        </span>
        <span
          className={`whitespace-nowrap p-2 border-b-4 cursor-pointer ${
            activeTab === "Variables" ? "border-hc-green-400" : ""
          }`}
          onClick={() => setActiveTab("Variables")}
        >
          Variables
        </span>
      </div>

      <div
        className="mt-6"
        style={{ display: activeTab === "Response preview" ? "block" : "none" }}
      >
        <ResponsePreview />
      </div>
      <div
        className="mt-6"
        style={{ display: activeTab === "Variables" ? "block" : "none" }}
      >
        <Variable />
      </div>
    </div>
  );
}
