import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  type?: HTMLInputTypeAttribute | undefined;
  value?: string;
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

export default function Input({
  type = "text",
  value,
  placeholder,
  className,
  onChange,
  onFocus,
  onBlur,
  defaultValue,
  min,
  max,
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      className={`focus:outline-hc-green-500 bg-white text-black rounded px-2 py-2 text-lg w-full h-10 ${className}`}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      defaultValue={defaultValue}
      min={min}
      max={max}
    />
  );
}
