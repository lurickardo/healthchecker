interface SelectProps {
  options: { value: string; label: string }[];
  value?: string;
  placeholder?: string;
  className?: string;
  label?: string;
  labelClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  icon?: React.ReactNode;
}

export default function Select({
  options,
  value,
  placeholder,
  className,
  onChange,
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`bg-white text-black rounded px-2 py-2 text-lg w-full h-10 ${className}`}
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
