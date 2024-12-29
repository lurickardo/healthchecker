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
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CircleCheckBig,
  ClipboardPen,
  Download,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { HealthcheckReportProvider } from "@/provider/ms-healthcheck-report";
import { HealthckeckProxyProvider } from "@/provider/healthcheck-proxy.provider";
import { ResponseRecord } from "@/@interfaces/ResponseRecord";
import { calculateSla, exportToExcel, exportToPDF } from "@/utils/utils";
import Alert, { AlertProps } from "@/components/atoms/Alert";
import { SlaStatus } from "@/@interfaces/sla";

dayjs.extend(relativeTime);

export default function SyntheticTests() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ResponseRecord[]>([]);
  const [currentSla, setCurrentSla] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState<AlertProps>({
    title: "Alert",
    content: "",
    icon: CheckCircle,
    borderColor: "border-hc-red-400",
    textColor: "text-hc-red-400",
    onClose: () => setShowAlert(false),
    duration: 10000,
  });
  const [filters, setFilters] = useState({
    sla: 1,
    from: "",
    to: "",
    quickInterval: "1d",
  });

  const th = ["Status", "Date", "Run Type", "Status Code", "Schedule Actions"];

  const [slaStatus, setSlaStatus] = useState<SlaStatus>("PASSED");
  const [slaPercent, setSlaPercent] = useState<number>(100);

  const handleFilterResult = (result: any) => {
    if (result.data) {
      setData(result.data);
      setCurrentSla(result.sla);
      const totalRecords = result.total || 0;
      setTotalPages(Math.ceil(totalRecords / 8) + 1);
    }
  };

  const fetchPageData = async (page: number) => {
    setLoading(true);
    const reportProvider = new HealthcheckReportProvider();
    try {
      const response = await reportProvider.listResponses({
        from: filters.from,
        to: filters.to,
        quickInterval: filters.quickInterval,
        limit: 8,
        skip: (page - 1) * 8,
      });
      handleFilterResult({
        data: response.data,
        sla: 1,
        total: response.total,
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllDataForSla = async () => {
    const reportProvider = new HealthcheckReportProvider();
    try {
      const response = await reportProvider.listResponses({
        from: filters.from,
        to: filters.to,
        quickInterval: filters.quickInterval,
        limit: 100000,
        skip: 0,
      });
      const { slaStatus, slaPercent } = calculateSla(response.data, filters.sla);
      setSlaStatus(slaStatus);
      setSlaPercent(slaPercent);
    } catch (error) {
      console.log("Error fetching data for SLA:", error);
    }
  };

  const fetchAllDataForExport = async () => {
    setLoading(true);
    const reportProvider = new HealthcheckReportProvider();
    try {
      const response = await reportProvider.listResponses({
        from: "",
        to: "",
        quickInterval: "1d",
        limit: 100000,
        skip: 0,
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching all data for export:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchAllDataForSla();
  }, [filters]);

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

  const deleteSchedule = async (scheduleId: string) => {
    setLoading(true);
    const proxyProvider = new HealthckeckProxyProvider();
    try {
      const response = await proxyProvider.deleteScheduleRequest(scheduleId);
      if (response.success) {
        console.log("Schedule deleted successfully.");
        setAlertProps({
          title: "Success",
          content: "Schedule deleted successfully",
          icon: CircleCheckBig,
          borderColor: "border-hc-green-400",
          textColor: "text-hc-green-400",
          onClose: () => setShowAlert(false),
          duration: 8000,
        });
        setShowAlert(true);
      } else {
        console.log("Failed to delete schedule:", response.message);
      }
    } catch (error) {
      console.log("Error deleting schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  let trs: JSX.Element[][] = [];

  if (loading) {
    trs = [
      [
        <td key="loading" colSpan={5}>
          <Spinner
            className="items-center mx-auto m-72"
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
          className="flex items-center justify-center px-12 py-[1rem] whitespace-nowrap space-x-6"
        >
          <Button
            label=""
            className="bg-hc-black-400 hover:bg-hc-black-200 rounded border-2 border-hc-green-300 text-hc-white-200"
          >
            <ClipboardPen />
          </Button>
          <Button
            label="Delete Schedule"
            className="bg-hc-black-400 hover:bg-hc-black-200 rounded border-2 border-hc-green-300 text-hc-white-200"
            onClick={() => deleteSchedule(item.scheduleId)}
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
          <Filter
            onSearchResult={(result: any, appliedFilters: any) => {
              handleFilterResult(result);
              setFilters(appliedFilters);
            }}
            setLoading={setLoading}
          />
        }
        button={
          <Link
            href="/healthcheck/synthetic/tests/create"
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
            label=""
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex justify-center items-center px-4 py-2 mx-2 hover:bg-hc-black-200 border-2 border-hc-green-300 font-medium rounded text-center whitespace-nowrap"
          >
            <ArrowLeft />
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            label=""
            className="flex justify-center items-center px-4 py-2 mx-2 hover:bg-hc-black-200 border-2 border-hc-green-300 font-medium rounded text-center whitespace-nowrap"
          >
            <ArrowRight />
          </Button>
        </div>
        <Button
          icon={<Download width={24} height={24} aria-hidden="true" />}
          label="Export"
          className="flex justify-center items-center px-4 py-2 hover:bg-hc-black-200 border-2 border-hc-green-300 font-medium rounded text-center whitespace-nowrap"
          onClick={handleExport}
        />
      </Footer>
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
    </Template>
  );
}
