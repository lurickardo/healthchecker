"use client";

import { createContext, useState, useContext, ReactNode } from "react";

type ResponseContextType = {
  responseBody: string;
  setResponseBody: (body: string) => void;
};

const ResponseContext = createContext<ResponseContextType>({
  responseBody: "",
  setResponseBody: () => {},
});

export function ResponseProvider({ children }: { children: ReactNode }) {
  const [responseBody, setResponseBody] = useState("");

  return (
    <ResponseContext.Provider value={{ responseBody, setResponseBody }}>
      {children}
    </ResponseContext.Provider>
  );
}

export function useResponse() {
  return useContext(ResponseContext);
}
