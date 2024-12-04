import { HTMLInputTypeAttribute } from "react";

interface CheckboxProps {
  type?: HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  label?: string;
  labelClassName?: string;
  icon?: React.ReactNode;
  min?: number;
  max?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function Checkbox({
  type = "text",
  label,
  placeholder,
  className,
  onChange,
  onFocus,
  onBlur,
  defaultValue,
  min,
  max,
}: CheckboxProps) {
  return (
    <span>
      <input
        type={type}
        placeholder={placeholder}
        className={`focus:outline-hc-green-500 bg-white text-black rounded px-4 mr-1 text-lg h-4 w-4 align-middle ${className}`}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        defaultValue={defaultValue}
        min={min}
        max={max}
      />
      <label>{label}</label>
    </span>
  );
}
