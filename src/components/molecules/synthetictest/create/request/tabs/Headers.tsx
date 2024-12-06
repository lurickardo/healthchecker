import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Headers() {
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([
    { key: "", value: "" },
  ]);

  const handleAddParam = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const handleRemoveParam = (index: number) => {
    const updatedHeaders = headers.filter((_, i) => i !== index);
    setHeaders(updatedHeaders);
  };

  const handleParamChange = (index: number, field: string, value: string) => {
    const updatedHeaders: any = [...headers];
    updatedHeaders[index][field] = value;
    setHeaders(updatedHeaders);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Headers</h3>
      <table className="table-auto divide-y divide-hc-black-200 bg-hc-black-500 overflow-x-auto border-2 border-hc-black-300 rounded w-full">
        <thead className="">
          <tr className="text-hc-green-300">
            <th className="text-left p-2 w-5/12">Key</th>
            <th className="text-left p-2 w-5/12">Value</th>
            <th className="text-left p-2 w-2/12">Actions</th>
          </tr>
        </thead>
        <tbody className="text-lg divide-y divide-hc-black-300 text-left">
          {headers.map(
            (param: { key: string; value: string }, index: number) => (
              <tr key={index}>
                <td className="p-2">
                  <Input
                    type="text"
                    name={`headerKey-${index}`}
                    placeholder="Key"
                    value={param.key}
                    onChange={(e) =>
                      handleParamChange(index, "key", e.target.value)
                    }
                    className="p-1 rounded"
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="text"
                    name={`headerValue-${index}`}
                    placeholder="Value"
                    value={param.value}
                    onChange={(e) =>
                      handleParamChange(index, "value", e.target.value)
                    }
                    className="p-1 rounded"
                  />
                </td>
                <td className="p-1">
                  <Button
                    label=""
                    onClick={() => handleRemoveParam(index)}
                    className="bg-hc-black-400 rounded border-2 border-hc-green-300 text-hc-white-200 hover:bg-hc-black-200"
                  >
                    <Trash2 />
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <Button
        label="Add"
        icon={<Plus />}
        onClick={handleAddParam}
        className="flex justify-center hover:bg-hc-black-200 border-hc-green-300 mt-2 border-2 items-center px-4 py-2 font-medium rounded text-center whitespace-nowrap"
      />
    </div>
  );
}
