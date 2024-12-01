import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { SendHorizonal } from "lucide-react";

export default function Request() {
  return (
    <div className="w-7/12">
      <div className="flex space-x-2">
        <Select
          options={[
            { value: "GET", label: "GET" },
            { value: "POST", label: "POST" },
            { value: "PUT", label: "PUT" },
            { value: "PATCH", label: "PATCH" },
            { value: "DELETE", label: "DELETE" },
            { value: "HEAD", label: "HEAD" },
            { value: "OPTIONS", label: "OPTIONS" },
          ]}
          className="max-w-32 flex justify-center bg-hc-black-500 text-hc-white-100 hover:bg-hc-black-200 border-hc-green-300 border-2 items-center px-2 py-2 font-medium rounded text-center whitespace-nowrap"
        />
        <Input />
        <Button
          label="Send"
          icon={<SendHorizonal />}
          className="flex justify-center hover:bg-hc-black-200 border-hc-green-300 border-2 items-center px-4 py-2 font-medium rounded text-center whitespace-nowrap"
        />
      </div>
      <div className="flex space-x-4 mt-6">
        <span className="whitespace-nowrap p-2 border-b-4 border-hc-green-400">
          Params
        </span>
        <span className="whitespace-nowrap p-2 border-b-4">Authorization</span>
        <span className="whitespace-nowrap p-2 border-b-4">Haders</span>
        <span className="whitespace-nowrap p-2 border-b-4">Body</span>
      </div>
    </div>
  );
}
