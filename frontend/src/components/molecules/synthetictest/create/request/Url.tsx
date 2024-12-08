import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { SendHorizonal } from "lucide-react";

export default function Url() {
  return (
    <div className="flex space-x-2 mt-3">
      <Select
        name="method"
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
      <Input name="url" />
      <Button
        label="Send"
        name="send"
        icon={<SendHorizonal />}
        className="flex justify-center hover:bg-hc-black-200 border-hc-green-300 border-2 items-center px-4 py-2 font-medium rounded text-center whitespace-nowrap"
      />
    </div>
  );
}
