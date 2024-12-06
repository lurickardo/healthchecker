"use client";

import React, { useState } from "react";
import ReactDOM from "react-dom";
import Editor from "@monaco-editor/react";
import Input from "@/components/atoms/Input";

const Body: React.FC = () => {
  const [jsonCode, setJsonCode] = useState<string>("");

  const handleEditorChange = (value = "") => {
    setJsonCode(value);
  };

  return (
    <div>
      <Input type="hidden" name="body" value={jsonCode} />
      <Editor
        height="400px"
        defaultLanguage="json"
        value={jsonCode}
        onChange={handleEditorChange}
        theme="vs-dark" // Define o tema dark
        options={{
          fontSize: 16, // Aumenta o tamanho da fonte
          automaticLayout: true,
          minimap: { enabled: false },
          wordWrap: "on",
          lineNumbers: "on",
          scrollbar: {
            vertical: "visible",
            horizontal: "auto",
          },
        }}
      />
    </div>
  );
};

export default Body;
