interface SelectProps {
  options: { value: string; label: string }[];
  value?: string;
  placeholder?: string;
  className?: string;
  label?: string;
  labelClassName?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  icon?: React.ReactNode;
}

export default function Select({
  options,
  value,
  placeholder,
  className,
  defaultValue,
  onChange,
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`focus:outline-hc-green-500 text-black rounded px-2 py-2 text-lg w-full h-10 ${className}`}
      defaultValue={defaultValue}
    >
      {placeholder ?? (
        <option disabled value="">
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
