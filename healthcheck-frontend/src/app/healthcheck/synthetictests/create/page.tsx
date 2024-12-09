// pages/healthcheck/synthetictests/create/page.tsx
"use client";

import React from "react";
import Request from "@/components/molecules/synthetictest/create/request/Request";
import Visualize from "@/components/molecules/synthetictest/create/visualize/Visualize";
import Template from "@/components/templates/Template";
import { ResponseProvider } from "@/context/synthetictests/create/ResponseContext";

export default function Create() {
  return (
    <Template>
      <ResponseProvider>
        <section className="flex space-x-4 max-h-[52.1rem]">
          <Request />
          <Visualize />
        </section>
      </ResponseProvider>
    </Template>
  );
}
