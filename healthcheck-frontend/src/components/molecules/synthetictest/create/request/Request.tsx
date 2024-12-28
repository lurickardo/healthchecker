"use client";

import Button from "@/components/atoms/Button";
import {
  CalendarCheck,
  CheckCircle,
  CircleX,
  CircleCheckBig,
} from "lucide-react";
import Url from "./Url";
import Tabs from "./Tabs";
import Schedule from "./Schedule";
import Spinner from "@/components/atoms/Spinner";
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
import { useRouter } from "next/navigation";

export default function Request() {
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);
  const { setResponseBody } = useResponse();
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);

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
        setLoadingSend(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

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
        setLoadingSchedule(true);

        const validatedData = createScheduleSchema.parse(data);
        const response = await healthcheckProxy.sendRequest(validatedData);
        if (!response.success) {
          throw {
            errors: [{ message: response.message }],
            title: "Request error",
          };
        }
        setResponseBody(formatResponse(response.data));

        const scheduleCreated = await healthcheckProxy.createScheduleRequest(
          formatScheduleRequest(validatedData)
        );

        if (scheduleCreated.status) {
          setAlertProps({
            title: "Success",
            content: "Schedule created successfully",
            icon: CircleCheckBig,
            borderColor: "border-hc-green-400",
            textColor: "text-hc-green-400",
            onClose: handleAlertClose,
            duration: 8000,
          });
          setShowAlert(true);
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/healthcheck/synthetic/tests");
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
    } finally {
      setLoadingSend(false);
      setLoadingSchedule(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-7/12">
      <div>
        {loadingSchedule && (
          <Spinner
            className="absolute top-[40%] left-[33%]"
            fill="fill-hc-green-500"
          />
        )}
        <div className={loadingSchedule ? "opacity-40" : ""}>
          <Url loading={loadingSend} />
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
