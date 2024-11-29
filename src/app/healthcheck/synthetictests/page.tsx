import Button from "@/components/atoms/Button";
import Link from "@/components/atoms/Link";
import Filter from "@/components/molecules/Filter";
import Footer from "@/components/molecules/Footer";
import Table from "@/components/organisms/Table";
import Titlebar from "@/components/organisms/Titlebar";
import Template from "@/components/templates/Template";
import { ClipboardPen, Download, Plus, Trash2 } from "lucide-react";

export default async function SyntheticTests() {
  const th = ["Status", "Date", "Run Type", "Actions"];

  // Adicionar SLA
  const trs = [
    [
      <td
        key={`${"rowKey"}-${"colKey"}`}
        className=" px-12 py-4 whitespace-nowrap font-bold"
      >
        <span className="text-green-400 bg-green-100 bg-opacity-95 w-max p-1 rounded">
          PASSED
        </span>
      </td>,
      <td
        key={`${"rowKey2"}-${"colKey2"}`}
        className="px-12 py-4 whitespace-nowrap"
      >
        <span className="font-bold">1 month ago</span> |
        <span className=""> Mar 16, 2023</span> |
        <span className="font-bold"> 14:13</span>
      </td>,
      <td
        key={`${"rowKey3"}-${"colKey3"}`}
        className="px-12 py-4 whitespace-nowrap"
      >
        <span className="font-bold">Scheduled</span>
      </td>,
      <td
        key={`${"rowKey4"}-${"colKey4"}`}
        className="px-12 py-4 whitespace-nowrap space-x-6"
      >
        <Button
          label=""
          className="bg-hc-black-400 rounded border-2 border-hc-green-300 text-hc-white-200"
        >
          <ClipboardPen />
        </Button>
        <Button
          label=""
          className="bg-hc-black-400 rounded border-2 border-hc-green-300 text-hc-white-200"
        >
          <Trash2 />
        </Button>
      </td>,
    ],
    [
      <td
        key={`${"rowKey"}-${"colKey"}`}
        className="px-12 py-4 whitespace-nowrap font-bold"
      >
        <span className="text-red-400 bg-red-100 bg-opacity-95 w-max p-1 rounded">
          FAILED
        </span>
      </td>,
      <td
        key={`${"rowKey2"}-${"colKey2"}`}
        className="px-12 py-4 whitespace-nowrap"
      >
        <span className="font-bold">1 month ago</span> |
        <span className=""> Mar 16, 2023</span> |
        <span className="font-bold"> 14:13</span>
      </td>,
      <td
        key={`${"rowKey3"}-${"colKey3"}`}
        className="px-12 py-4 whitespace-nowrap"
      >
        <span className="font-bold">Scheduled</span>
      </td>,
      <td
        key={`${"rowKey4"}-${"colKey4"}`}
        className="px-12 py-4 whitespace-nowrap text-green-400 space-x-6"
      >
        <Button
          label=""
          className="bg-hc-black-400 rounded border-2 border-hc-green-300 text-hc-white-200"
        >
          <ClipboardPen />
        </Button>
        <Button
          label=""
          className="bg-hc-black-400 rounded border-2 border-hc-green-300 text-hc-white-200"
        >
          <Trash2 />
        </Button>
      </td>,
    ],
  ];

  return (
    <>
      <Template>
        <Titlebar
          title="Test Runs"
          filters={<Filter />}
          button={
            <Link
              href="/bvm/images/create"
              icon={<Plus width={24} height={24} aria-hidden="true" />}
              label="Create Test"
              className="flex justify-center items-center px-4 py-2 hover:bg-hc-black-200 border-2 border-hc-green-300 font-medium rounded text-center whitespace-nowrap"
            />
          }
        />
        <Table className="h-table mt-6" th={th} trs={trs} />
        <Footer />
      </Template>
    </>
  );
}
