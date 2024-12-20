"use client";

import Alert, { AlertProps } from "@/components/atoms/Alert";
import Titlebar from "@/components/organisms/Titlebar";
import Template from "@/components/templates/Template";
import { CheckCircle, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import Table from "@/components/organisms/Table";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

export default function Variables() {
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

  const [variables, setVariables] = useState<{ key: string; value: string }[]>([
    { key: "", value: "" },
  ]);

  const handleAddVariable = () => {
    setVariables([...variables, { key: "", value: "" }]);
  };

  const handleRemoveVariable = (index: number) => {
    const updatedVariables = variables.filter((_, i) => i !== index);
    setVariables(updatedVariables);
  };

  const handleVariableChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const updatedVariables = [...variables];
    updatedVariables[index][field] = value;
    setVariables(updatedVariables);
  };

  const handleSubmit = () => {
    console.log("Variables", variables);

    setAlertProps({
      title: "Success",
      content: "Variables saved successfully!",
      icon: CheckCircle,
      borderColor: "border-hc-green-400",
      textColor: "text-hc-green-400",
      onClose: () => setShowAlert(false),
      duration: 5000,
    });
    setShowAlert(true);
  };

  const th = ["Key", "Value", "Actions"];

  const trs = variables.map((variable, index) => [
    <td key={`var-key-${index}`} className="px-12 py-4 whitespace-nowrap ">
      <Input
        type="text"
        name={`varKey-${index}`}
        placeholder="Key"
        value={variable.key}
        onChange={(e) => handleVariableChange(index, "key", e.target.value)}
        className="p-1 rounded bg-black"
      />
    </td>,
    <td key={`var-value-${index}`} className="px-12 py-4 whitespace-nowrap ">
      <Input
        type="text"
        name={`varValue-${index}`}
        placeholder="Value"
        value={variable.value}
        onChange={(e) => handleVariableChange(index, "value", e.target.value)}
        className="p-1 rounded"
      />
    </td>,
    <td
      key={`var-action-${index}`}
      className="px-12 py-4 whitespace-nowrap text-center text-sm font-medium flex justify-center"
    >
      <Button
        label=""
        type="button"
        onClick={() => handleRemoveVariable(index)}
        className="bg-hc-black-400 rounded border-2 border-hc-green-300 text-hc-white-200 hover:bg-hc-black-200"
      >
        <Trash2 />
      </Button>
    </td>,
  ]);

  return (
    <Template>
      <Titlebar title="Global Variables" />
      <div className="my-4">
        <Table th={th} trs={trs} />
        <div className="mt-2 flex justify-between">
          <Button
            label="Add"
            icon={<Plus />}
            onClick={handleAddVariable}
            className="flex justify-center hover:bg-hc-black-200 border-hc-green-300 mt-2 border-2 items-center px-4 py-2 font-medium rounded text-center whitespace-nowrap"
          />
          <Button
            label="Save"
            icon={<Save />}
            onClick={handleSubmit}
            className="flex justify-center hover:bg-hc-black-200 border-hc-green-300 mt-2 border-2 items-center px-4 py-2 font-medium rounded text-center whitespace-nowrap"
          />
        </div>
      </div>
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
