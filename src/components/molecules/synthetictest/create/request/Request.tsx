"use client";

import Button from "@/components/atoms/Button";
import { CalendarCheck, SendHorizonal } from "lucide-react";
import Url from "./Url";
import Tabs from "./Tabs";
import Schedule from "./Schedule";

export default function Request() {
  function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());
    const typeEvent = event.target.querySelector(
      'button[type="submit"]:focus'
    ).name;

    console.log(formObject, typeEvent);
  }

  return (
    <form onSubmit={handleSubmit} className="w-7/12">
      <Url />
      <Tabs />
      <div className="mt-0">
        <Schedule />
        <div className="mt-8 w-full">
          <Button
            label="Schedule"
            name="schedule"
            icon={<CalendarCheck />}
            className="flex justify-center bg-hc-green-500 hover:bg-hc-green-400 border-hc-green-400 border-2 items-center px-4 py-2 font-bold rounded text-center whitespace-nowrap"
          />{" "}
        </div>
      </div>
    </form>
  );
}