"use client";

import Button from "@/components/atoms/Button";
import Link from "@/components/atoms/Link";
import Spinner from "@/components/atoms/Spinner";
import Filter from "@/components/molecules/Filter";
import Footer from "@/components/molecules/Footer";
import Sla from "@/components/molecules/Sla";
import Table from "@/components/organisms/Table";
import Titlebar from "@/components/organisms/Titlebar";
import Template from "@/components/templates/Template";
import { ClipboardPen, Download, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { HealthcheckProxyProvider } from "@/provider/ms-healthcheck-report";
import { ResponseRecord } from "@/@interfaces/ResponseRecord";
import { calculateSla } from "@/utils/utils";

dayjs.extend(relativeTime);

export default function SyntheticTests() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ResponseRecord[]>([]);
  const [currentSla, setCurrentSla] = useState<number>(1);

  const th = ["Status", "Date", "Run Type", "Actions"];

  const { slaStatus, slaPercent } = calculateSla(data, currentSla);

  const handleFilterResult = (result: {
    data: ResponseRecord[];
    sla: number;
  }) => {
    setData(result.data);
    setCurrentSla(result.sla);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      const provider = new HealthcheckProxyProvider();
      try {
        const response = await provider.listResponses({
          from: "",
          to: "",
          quickInterval: "1d",
          limit: 10,
          skip: 0,
        });
        handleFilterResult({ data: response.data, sla: 1 });
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  let trs: JSX.Element[][] = [];

  if (loading) {
    trs = [
      [
        <td key="loading" colSpan={4}>
          <Spinner
            className=" items-center mx-auto m-72"
            fill="fill-hc-green-300"
          />
        </td>,
      ],
    ];
  } else if (data.length === 0) {
    trs = [
      [
        <td
          key="no-data"
          colSpan={4}
          className="px-12 py-4 whitespace-nowrap text-center"
        >
          No Data Found
        </td>,
      ],
    ];
  } else {
    trs = data.map((item, idx) => {
      const passed = item.response?.status < 300;
      const statusText = passed ? "PASSED" : "FAILED";
      const statusColor = passed
        ? "text-green-400 bg-green-100 bg-opacity-95"
        : "text-red-400 bg-red-100 bg-opacity-95";

      const relative = dayjs(item.datetime).fromNow();
      const date = dayjs(item.datetime).format("MMM DD, YYYY");
      const time = dayjs(item.datetime).format("HH:mm");

      return [
        <td
          key={`status-${idx}`}
          className=" px-12 py-4 whitespace-nowrap font-bold"
        >
          <span className={`${statusColor} w-max p-1 rounded`}>
            {statusText}
          </span>
        </td>,
        <td key={`date-${idx}`} className="px-12 py-4 whitespace-nowrap">
          <span className="font-bold">{relative}</span> | <span>{date}</span> |{" "}
          <span className="font-bold">{time}</span>
        </td>,
        <td key={`runtype-${idx}`} className="px-12 py-4 whitespace-nowrap">
          <span className="font-bold">Scheduled</span>
        </td>,
        <td
          key={`actions-${idx}`}
          className="px-12 py-4 whitespace-nowrap space-x-6"
        >
          <Button
            label=""
            className="bg-hc-black-400 hover:bg-hc-black-200 rounded border-2 border-hc-green-300 text-hc-white-200"
          >
            <ClipboardPen />
          </Button>
          <Button
            label=""
            className="bg-hc-black-400 hover:bg-hc-black-200 rounded border-2 border-hc-green-300 text-hc-white-200"
          >
            <Trash2 />
          </Button>
        </td>,
      ];
    });
  }

  return (
    <Template>
      <Titlebar
        title="Test Runs"
        filters={
          <Filter onSearchResult={handleFilterResult} setLoading={setLoading} />
        }
        button={
          <Link
            href="/healthcheck/synthetictests/create"
            icon={<Plus width={24} height={24} aria-hidden="true" />}
            label="Create Test"
            className="flex justify-center items-center px-4 py-2 hover:bg-hc-black-200 border-2 border-hc-green-300 font-medium rounded text-center whitespace-nowrap"
          />
        }
      />
      <Table className="h-table mt-6" th={th} trs={trs} />
      <Footer>
        <Sla status={slaStatus} percent={slaPercent} />
        <Button
          icon={<Download width={24} height={24} aria-hidden="true" />}
          label="Export"
          className="flex justify-center items-center px-4 py-2 hover:bg-hc-black-200 border-2 border-hc-green-300 font-medium rounded text-center whitespace-nowrap"
        />
      </Footer>
    </Template>
  );
}
