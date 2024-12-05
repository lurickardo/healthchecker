"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const Body: React.FC = () => {
  const [jsonCode, setJsonCode] = useState<string>("");

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setJsonCode(value);
    }
  };

  return (
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
  );
};

export default Body;
