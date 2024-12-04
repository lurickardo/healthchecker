import { Search } from "lucide-react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Select from "../atoms/Select";

export default function Filter() {
  return (
    <form className="flex justify-between items-center gap-8">
      <div className="flex items-center">
        <label className="mr-2 whitespace-nowrap">SLA:</label>
        <Input
          type="number"
          className="w-20 h-10"
          defaultValue="1"
          min={1}
          max={100}
        />
        <label className="text-xl ml-1">%</label>
      </div>
      <div className="flex items-center">
        <label className="mr-2">From:</label>
        <Input type="date" className="w-32 h-10" />
      </div>
      <div className="flex items-center">
        <label className="mr-2">To:</label>
        <Input type="date" className="w-32 h-10" />
      </div>
      <div className="flex justify-between items-center">
        <span className="mr-2 whitespace-nowrap">Quick interval:</span>
        <Select
          options={[
            { value: "1hr", label: "1hr" },
            { value: "2hr", label: "2hr" },
            { value: "4hr", label: "4hr" },
            { value: "8hr", label: "8hr" },
            { value: "1d", label: "1d" },
            { value: "2d", label: "2d" },
            { value: "3d", label: "3d" },
            { value: "7d", label: "7d" },
            { value: "14d", label: "14d" },
            { value: "30d", label: "30d" },
            { value: "60d", label: "60d" },
            { value: "90d", label: "90d" },
          ]}
          className="w-24"
        />
      </div>
      <Button
        className="flex items-center whitespace-nowrap hover:bg-hc-black-200 border-2 border-hc-green-300 text-xl rounded"
        label="Search"
        icon={<Search />}
      />
    </form>
  );
}
