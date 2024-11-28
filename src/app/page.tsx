"use client";

import Template from "@/components/templates/Template";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/healthcheck/dashboard");
  }, []);

  return (
    <>
      <Template>
        <>ssfasfasfsafas</>
      </Template>
    </>
  );
}
