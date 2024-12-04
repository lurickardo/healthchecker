"use client";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { CalendarCheck, SendHorizonal } from "lucide-react";
import { useState } from "react";
import Params from "./requestTabs/Params";
import Authorization from "./requestTabs/Authorization";
import Headers from "./requestTabs/Headers";
import Body from "./requestTabs/Body";
import Checkbox from "@/components/atoms/Checkbox";

export default function Request() {
  const [activeTab, setActiveTab] = useState("Params");

  return (
    <div className="w-7/12">
      <div className="flex space-x-2 mt-3">
        <Select
          options={[
            { value: "GET", label: "GET" },
            { value: "POST", label: "POST" },
            { value: "PUT", label: "PUT" },
            { value: "PATCH", label: "PATCH" },
            { value: "DELETE", label: "DELETE" },
            { value: "HEAD", label: "HEAD" },
            { value: "OPTIONS", label: "OPTIONS" },
          ]}
          className="max-w-32 flex justify-center bg-hc-black-500 text-hc-white-100 hover:bg-hc-black-200 border-hc-green-300 border-2 items-center px-2 py-2 font-medium rounded text-center whitespace-nowrap"
        />
        <Input />
        <Button
          label="Send"
          icon={<SendHorizonal />}
          className="flex justify-center hover:bg-hc-black-200 border-hc-green-300 border-2 items-center px-4 py-2 font-medium rounded text-center whitespace-nowrap"
        />
      </div>
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
            activeTab === "Authorization" ? "border-hc-green-400" : ""
          }`}
          onClick={() => setActiveTab("Authorization")}
        >
          Authorization
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
          className={`max-h-[31rem] min-h-[31rem] overflow-auto border-b-2 border-gray-600 ${activeTab === "Params" ? "block" : "hidden"}`}
        >
          <Params />
        </div>
        <div
          id="authorization"
          className={`max-h-[31rem] min-h-[31rem] overflow-auto border-b-2 border-gray-600 ${activeTab === "Authorization" ? "block" : "hidden"}`}
        >
          <Authorization />
        </div>
        <div
          id="headers"
          className={`max-h-[31rem] min-h-[31rem] overflow-auto border-b-2 border-gray-600 ${activeTab === "Headers" ? "block" : "hidden"}`}
        >
          <Headers />
        </div>
        <div
          id="body"
          className={`max-h-[31rem] min-h-[31rem] overflow-auto border-b-2 border-gray-600 ${activeTab === "Body" ? "block" : "hidden"}`}
        >
          <Body />
        </div>
      </div>
      <div className="flex mt-0 space-x-4">
        <fieldset className="w-10/12 fields border-2 rounded border-gray-600">
          <legend className="text-xl font-bold">Days of the week:</legend>
          <div className="flex justify-start items-center space-x-4 h-12 p-2">
            <Checkbox type="checkbox" label="Monday" />
            <Checkbox type="checkbox" label="Tuesday" />
            <Checkbox type="checkbox" label="Wednesday" />
            <Checkbox type="checkbox" label="Thursday" />
            <Checkbox type="checkbox" label="Friday" />
            <Checkbox type="checkbox" label="Saturday" />
            <Checkbox type="checkbox" label="Sunday" />
          </div>
        </fieldset>
        <fieldset className="grid w-2/12 p-2 border-2 rounded border-gray-600">
          {/* Todo: criar componente de radioButton */}
          <legend className="text-xl font-bold">Interval Type:</legend>
          <div className="flex items-center space-x-4">
            <input type="radio" id="hour" name="intervalType" value="hour" />
            <label htmlFor="hour">Hour</label>
            <input
              type="radio"
              id="minute"
              name="intervalType"
              value="minute"
            />
            <label htmlFor="minute">Minute</label>
          </div>
        </fieldset>
        <div className="grid w-1/12">
          <span className="text-xl font-bold">Interval:</span>
          <Input type="number" className="w-[6rem]" />
        </div>
      </div>
      <div className="mt-8 w-full">
        <Button
          label="Schedule"
          icon={<CalendarCheck />}
          className="flex justify-center bg-hc-green-500 hover:bg-hc-green-400 border-hc-green-400 border-2 items-center px-4 py-2 font-bold rounded text-center whitespace-nowrap"
        />{" "}
      </div>
    </div>
  );
}
