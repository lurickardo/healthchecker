"use client";

import React, { useState, useRef, useEffect } from "react";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useResponse } from "@/context/synthetictests/create/ResponseContext";

export default function ResponsePreview() {
  const { responseBody } = useResponse();
  const [showSelect, setShowSelect] = useState<boolean>(true);
  const [activeButton, setActiveButton] = useState<string>("Pretty");
  const [language, setLanguage] = useState<string>("json");

  const iframeRef: any = useRef(null);

  useEffect(() => {
    if (activeButton === "Preview" && iframeRef.current) {
      const doc =
        iframeRef.current.contentDocument ||
        iframeRef.current.contentWindow.document;
      doc.open();
      doc.write(responseBody);
      doc.close();
    }
  }, [activeButton, responseBody]);

  return (
    <div>
      <div className="flex space-x-4">
        <div className="flex">
          <Button
            label="Pretty"
            onClick={() => {
              setShowSelect(true);
              setActiveButton("Pretty");
            }}
            className={`flex justify-center ${
              activeButton === "Pretty"
                ? "bg-hc-gray-500"
                : "hover:bg-hc-black-200"
            } border-hc-green-300 border-y-2 border-l-2 rounded rounded-r-none items-center px-4 py-2 font-medium text-center whitespace-nowrap`}
          />
          <Button
            label="Preview"
            onClick={() => {
              setShowSelect(false);
              setActiveButton("Preview");
            }}
            className={`flex justify-center ${
              activeButton === "Preview"
                ? "bg-hc-gray-500"
                : "hover:bg-hc-black-200"
            } border-hc-green-300 border-y-2 border-r-2 rounded rounded-l-none items-center px-4 py-2 font-medium text-center whitespace-nowrap`}
          />
        </div>
        {showSelect && (
          <Select
            name="typeNotation"
            options={[
              { value: "json", label: "JSON" },
              { value: "xml", label: "XML" },
            ]}
            className="max-w-24 flex justify-center bg-hc-black-500 text-hc-white-100 hover:bg-hc-black-200 border-hc-green-300 border-2 rounded items-center px-2 py-2 font-medium text-center whitespace-nowrap"
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
            value={language}
          />
        )}
      </div>
      {activeButton === "Pretty" && (
        <SyntaxHighlighter
          language={language}
          style={dracula}
          showLineNumbers={true}
          lineNumberStyle={{ color: "#888", marginRight: "0px" }}
          customStyle={{
            borderRadius: "0.25rem",
            marginTop: "1rem",
            maxHeight: "42rem",
            minHeight: "42rem",
            fontSize: "0.9rem",
            overflow: "auto",
          }}
        >
          {responseBody}
        </SyntaxHighlighter>
      )}

      {activeButton === "Preview" && (
        <div className="mt-8 mb-[0rem] h-[41.45rem] bg-hc-white-100 rounded overflow-hidden">
          <iframe
            ref={iframeRef}
            title="HTML Preview"
            className="w-full h-[41.5rem]"
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
        </div>
      )}
    </div>
  );
}
