"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HealthcheckReportProvider } from "@/provider/ms-healthcheck-report";
import Button from "../atoms/Button";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import Spinner from "../atoms/Spinner";
import {
  FilterScheduleListSchema,
  filterScheduleListSchema,
} from "@/schemas/filterSchedule.schema";

export default function Filter({
  onSearchResult,
  setLoading,
}: {
  onSearchResult: any;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FilterScheduleListSchema>({
    resolver: zodResolver(filterScheduleListSchema),
    defaultValues: {
      sla: "1",
      from: "",
      to: "",
      timeInterval: "1d",
    },
  });

  const submitForm = async (data: FilterScheduleListSchema) => {
    setLoading(true);
    const provider = new HealthcheckReportProvider();
    try {
      const response = await provider.listResponses({
        from: data.from,
        to: data.to,
        quickInterval: data.timeInterval,
        limit: 8,
        skip: 0,
      });

      onSearchResult(
        {
          data: response.data,
          sla: Number(data.sla),
          total: response.total || 0,
        },
        {
          from: data.from,
          to: data.to,
          quickInterval: data.timeInterval,
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex justify-between items-center gap-8"
    >
      <div className="flex items-center">
        <label className="mr-2 whitespace-nowrap">SLA:</label>
        <input
          type="text"
          {...register("sla")}
          className="w-20 h-10 focus:outline-hc-green-500 bg-white text-black rounded px-2 py-2 text-lg"
          defaultValue="1"
        />
        <label className="text-xl ml-1">%</label>
        {errors.sla && (
          <span className="text-red-500 ml-2">{errors.sla.message}</span>
        )}
      </div>
      <div className="flex items-center">
        <label className="mr-2">From:</label>
        <input
          type="date"
          {...register("from")}
          className="w-34 h-10 focus:outline-hc-green-500 bg-white text-black rounded px-2 py-2 text-lg"
        />
        {errors.from && (
          <span className="text-red-500 ml-2">{errors.from.message}</span>
        )}
      </div>
      <div className="flex items-center">
        <label className="mr-2">To:</label>
        <input
          type="date"
          {...register("to")}
          className="w-34 h-10 focus:outline-hc-green-500 bg-white text-black rounded px-2 py-2 text-lg"
        />
        {errors.to && (
          <span className="text-red-500 ml-2">{errors.to.message}</span>
        )}
      </div>
      <div className="flex items-center">
        <label className="mr-2 whitespace-nowrap">Quick interval:</label>
        <select
          {...register("timeInterval")}
          name="timeInterval"
          className="w-22 focus:outline-hc-green-500 text-black rounded px-2 py-2 text-lg h-10"
          defaultValue={"1d"}
        >
          <option value="1hr">1h</option>
          <option value="2hr">2h</option>
          <option value="4hr">4h</option>
          <option value="8hr">8h</option>
          <option value="16hr">16h</option>
          <option value="1d">1d</option>
          <option value="2d">2d</option>
          <option value="3d">3d</option>
          <option value="4d">4d</option>
          <option value="5d">5d</option>
          <option value="6d">6d</option>
          <option value="1w">1w</option>
          <option value="2w">2w</option>
          <option value="3w">3w</option>
          <option value="1m">1m</option>
          <option value="2m">2m</option>
          <option value="3m">3m</option>
        </select>
      </div>
      <Button
        label=""
        name="send"
        className="flex items-center whitespace-nowrap hover:bg-hc-black-200 border-2 border-hc-green-300 text-xl rounded"
        isSubmitting={isSubmitting}
      >
        {isSubmitting ? (
          <Spinner
            className="flex py-2 text-lg space-x-2 cursor-pointer h-10 w-[5.7rem]"
            fill="fill-hc-green-500"
          />
        ) : (
          <div className="flex py-2 text-lg space-x-2 cursor-pointer h-10">
            {<Search />}
            <span>Search</span>
          </div>
        )}
      </Button>
    </form>
  );
}
