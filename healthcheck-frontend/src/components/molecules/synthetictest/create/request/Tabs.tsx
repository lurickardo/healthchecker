"use client";

import { useState } from "react";
import Params from "./tabs/Params";
import Headers from "./tabs/Headers";
import Body from "./tabs/Body";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<string>("Params");

  return (
    <div>
      <div className="flex space-x-4 mt-6">
        <span
          className={`whitespace-nowrap p-2 border-b-4 cursor-pointer ${
            activeTab === "Params" ? "border-hc-green-400" : ""
          }`}
          onClick={() => setActiveTab("Params")}
        >
          Params
        </span>
        <span
          className={`whitespace-nowrap p-2 border-b-4 cursor-pointer ${
            activeTab === "Headers" ? "border-hc-green-400" : ""
          }`}
          onClick={() => setActiveTab("Headers")}
        >
          Headers
        </span>
        <span
          className={`whitespace-nowrap p-2 border-b-4 cursor-pointer ${
            activeTab === "Body" ? "border-hc-green-400" : ""
          }`}
          onClick={() => setActiveTab("Body")}
        >
          Body
        </span>
      </div>
      <div className="mt-[1rem] mb-6 rounded">
        <div
          id="params"
          className={`max-h-[26rem] min-h-[26rem] overflow-auto border-b-2 border-gray-600 ${
            activeTab === "Params" ? "block" : "hidden"
          }`}
        >
          <Params />
        </div>
        <div
          id="headers"
          className={`max-h-[26rem] min-h-[26rem] overflow-auto border-b-2 border-gray-600 ${
            activeTab === "Headers" ? "block" : "hidden"
          }`}
        >
          <Headers />
        </div>
        <div
          id="body"
          className={`max-h-[26rem] min-h-[26rem] overflow-auto border-b-2 border-gray-600 ${
            activeTab === "Body" ? "block" : "hidden"
          }`}
        >
          <Body />
        </div>
      </div>
    </div>
  );
}
