interface CheckboxProps {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  label?: string;
  name: string;
  labelClassName?: string;
  icon?: React.ReactNode;
  min?: number;
  max?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function Checkbox({
  label,
  name,
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
        type="checkbox"
        name={name}
        placeholder={placeholder}
        className={`accent-hc-green-500  focus:outline-hc-green-500 bg-white text-black rounded px-4 mr-1 text-lg h-[1.3rem] w-[1.3rem] align-middle ${className}`}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        defaultValue={defaultValue}
        min={min}
        max={max}
      />
      <label className="text-xl align-middle">{label}</label>
    </span>
  );
}
