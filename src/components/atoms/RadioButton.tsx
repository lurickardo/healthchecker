interface CheckboxProps {
  id?: string;
  name: string;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  label: string;
  labelClassName?: string;
  icon?: React.ReactNode;
  min?: number;
  max?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function RadioButton({
  label,
  id,
  name,
  value,
  className,
  onChange,
  onFocus,
  onBlur,
  defaultValue,
}: CheckboxProps) {
  return (
    <span>
      <input
        className={`accent-hc-green-500  focus:outline-hc-green-500 bg-white text-black rounded px-4 mr-1 text-lg h-[1.3rem] w-[1.3rem] align-middle ${className}`}
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        defaultValue={defaultValue}
      />
      <label>{label}</label>
    </span>
  );
}
