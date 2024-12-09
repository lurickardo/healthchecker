"use client";

import Button from "@/components/atoms/Button";
import { CalendarCheck, CheckCircle, CircleX } from "lucide-react";
import Url from "./Url";
import Tabs from "./Tabs";
import Schedule from "./Schedule";
import {
  formatResponse,
  formatScheduleRequest,
  transformHttpPrefix,
  transformObject,
} from "@/utils/utils";
import Alert, { AlertProps } from "@/components/atoms/Alert";
import { useState } from "react";
import { createScheduleSchema } from "@/schemas/schedule.schema";
import { sendRequestSchema } from "@/schemas/send.schema";
import { HealthckeckProxyProvider } from "@/provider/healthcheck-proxy.provider";
import { useResponse } from "@/context/synthetictests/create/ResponseContext";

export default function Request() {
  const [showAlert, setShowAlert] = useState(false);
  const { setResponseBody } = useResponse();

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const [alertProps, setAlertProps] = useState<AlertProps>({
    title: "Alert",
    content: "",
    icon: CheckCircle,
    borderColor: "border-hc-red-400",
    textColor: "text-hc-red-400",
    onClose: handleAlertClose,
    duration: 10000,
  });

  async function handleSubmit(event: any) {
    event.preventDefault();
    const typeEvent = event.target.querySelector(
      'button[type="submit"]:focus'
    )?.name;

    if (!typeEvent) return;

    const formData = new FormData(event.target);
    const formObject: any = Object.fromEntries(formData.entries());
    formObject.url = transformHttpPrefix(formObject.url);

    const data: Schedule = transformObject(
      ["params", "headers"],
      ["paramsKey-", "headersKey-"],
      ["paramsValue-", "headersValue-"],
      formObject
    );

    try {
      const healthcheckProxy = new HealthckeckProxyProvider();

      if (typeEvent === "send") {
        const validatedData = sendRequestSchema.parse(data);

        const response = await healthcheckProxy.sendRequest(validatedData);

        if (!response.success) {
          throw {
            errors: [{ message: response.message }],
            title: "Request error",
          };
        }

        setResponseBody(formatResponse(response.data));
      }

      if (typeEvent === "schedule") {
        const validatedData = createScheduleSchema.parse(data);
        const response = await healthcheckProxy.sendRequest(validatedData);
        if (!response.success) {
          throw {
            errors: [{ message: response.message }],
            title: "Request error",
          };
        }
        setResponseBody(formatResponse(response.data));

        healthcheckProxy.createScheduleRequest(
          formatScheduleRequest(validatedData)
        );
      }
    } catch (error: any) {
      if (error) {
        const errorMessages = error.errors.map((err: any) => err.message);
        setAlertProps({
          title: error.title || "Validation Errors",
          content: errorMessages,
          icon: CircleX,
          borderColor: "border-hc-red-400",
          textColor: "text-hc-red-400",
          onClose: handleAlertClose,
          duration: 8000,
        });
        setShowAlert(true);
        setResponseBody("");
      }
    }
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
      {showAlert && (
        <Alert
          title={alertProps.title}
          content={alertProps.content}
          icon={alertProps.icon}
          borderColor={alertProps.borderColor}
          textColor={alertProps.textColor}
          onClose={alertProps.onClose}
          duration={alertProps.duration}
        />
      )}
    </form>
  );
}
