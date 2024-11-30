import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Template from "@/components/templates/Template";
import { SendHorizonal } from "lucide-react";

export default async function Create() {
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  return (
    <Template>
      <section className="flex space-x-2">
        <div className="w-2/3">
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
              className="max-w-36 flex justify-center bg-hc-black-500 text-hc-white-100 hover:bg-hc-black-200 border-hc-green-300 border-2 items-center px-4 py-2 font-medium rounded text-center whitespace-nowrap"
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
            <span className="whitespace-nowrap p-2 border-b-4">
              Authorization
            </span>
            <span className="whitespace-nowrap p-2 border-b-4">Haders</span>
            <span className="whitespace-nowrap p-2 border-b-4">Body</span>
          </div>
        </div>
        <div className="justify-center w-1/3 border-gray-600 flex  rounded border-2  p-4">
          <div className="space-x-4">
            <span className="whitespace-nowrap p-2 border-b-4">
              Response Preview
            </span>
            <span className="whitespace-nowrap p-2 border-b-4">Variables</span>
            <span className="whitespace-nowrap p-2 border-b-4">Params</span>
            <span className="whitespace-nowrap p-2 border-b-4">Params</span>
          </div>
        </div>
      </section>
    </Template>
  );
}
