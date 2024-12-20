"use client";

import Template from "@/components/templates/Template";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/healthcheck/synthetic/tests");
  }, []);

  return (
    <>
      <Template>
        <>ssfasfasfsafas</>
      </Template>
    </>
  );
}
