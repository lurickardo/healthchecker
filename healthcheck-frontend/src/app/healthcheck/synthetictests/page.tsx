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
import { calculateSla, exportToExcel, exportToPDF } from "@/utils/utils";

dayjs.extend(relativeTime);

export default function SyntheticTests() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ResponseRecord[]>([]);
  const [currentSla, setCurrentSla] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const th = ["Status", "Date", "Run Type", "Status Code", "Actions"];

  const { slaStatus, slaPercent } = calculateSla(data, currentSla);

  const handleFilterResult = (result: any) => {
    setData(result.data);
    setCurrentSla(result.sla);
    const totalRecords = result.total || 0;
    setTotalPages(Math.ceil(totalRecords / 8) + 1);
  };

  const fetchPageData = async (page: number) => {
    setLoading(true);
    const provider = new HealthcheckProxyProvider();
    try {
      const response = await provider.listResponses({
        from: "",
        to: "",
        quickInterval: "1d",
        limit: 8,
        skip: (page - 1) * 8,
      });
      handleFilterResult({
        data: response.data,
        sla: 1,
        total: response.total,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllDataForExport = async () => {
    setLoading(true);
    const provider = new HealthcheckProxyProvider();
    try {
      const response = await provider.listResponses({
        from: "",
        to: "",
        quickInterval: "1d",
        limit: 100000,
        skip: 0,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching all data for export:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData(currentPage);
  }, [currentPage]);

  const handleExport = async () => {
    const headers = [
      "Status",
      "Relative Date",
      "Full Date",
      "Time",
      "Run Type",
      "Status Code",
    ];
    const allData = await fetchAllDataForExport();
    const rows = allData.map((item: any) => {
      const passed = item.response?.status < 300;
      const statusText = passed ? "PASSED" : "FAILED";
      const statusCode = item.response?.status;
      const relative = dayjs(item.datetime).fromNow();
      const date = dayjs(item.datetime).format("MMM DD, YYYY");
      const time = dayjs(item.datetime).format("HH:mm");
      const runType = "Scheduled";
      return [statusText, relative, date, time, runType, statusCode];
    });

    exportToExcel({
      headers,
      data: rows,
      fileName: "test_runs.xlsx",
    });

    exportToPDF({
      title: "Test Runs Report",
      headers,
      data: rows,
      fileName: "test_runs.pdf",
      footer: `SLA Status: ${slaStatus}, SLA Percentage: ${slaPercent}%`,
    });
  };

  let trs: JSX.Element[][] = [];

  if (loading) {
    trs = [
      [
        <td key="loading" colSpan={5}>
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
          colSpan={5}
          className="px-12 py-4 whitespace-nowrap text-center"
        >
          No data available
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
      const statusCode = item.response?.status;

      return [
        <td
          key={`status-${idx}`}
          className="px-12 py-3 whitespace-nowrap font-bold"
        >
          <span className={`${statusColor} w-max p-1 rounded`}>
            {statusText}
          </span>
        </td>,
        <td key={`date-${idx}`} className="px-12 py-[1rem] whitespace-nowrap">
          <span className="font-bold">{relative}</span> | <span>{date}</span> |{" "}
          <span className="font-bold">{time}</span>
        </td>,
        <td
          key={`runtype-${idx}`}
          className="px-12 py-[1rem] whitespace-nowrap"
        >
          <span className="font-bold">Scheduled</span>
        </td>,
        <td
          key={`statusCode-${idx}`}
          className={`px-12 py-[1rem] whitespace-nowrap ${
            statusCode < 300 ? "text-green-400" : "text-red-400"
          }`}
        >
          <span className="font-bold">{statusCode}</span>
        </td>,
        <td
          key={`actions-${idx}`}
          className="px-12 py-[1rem] whitespace-nowrap space-x-6"
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
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            label="Previous"
            className="flex justify-center items-center px-4 py-2 mx-2 hover:bg-hc-black-200 border-2 border-hc-green-300 font-medium rounded text-center whitespace-nowrap"
          />
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            label="Next"
            className="flex justify-center items-center px-4 py-2 mx-2 hover:bg-hc-black-200 border-2 border-hc-green-300 font-medium rounded text-center whitespace-nowrap"
          />
        </div>
        <Button
          icon={<Download width={24} height={24} aria-hidden="true" />}
          label="Export"
          className="flex justify-center items-center px-4 py-2 hover:bg-hc-black-200 border-2 border-hc-green-300 font-medium rounded text-center whitespace-nowrap"
          onClick={handleExport}
        />
      </Footer>
    </Template>
  );
}
