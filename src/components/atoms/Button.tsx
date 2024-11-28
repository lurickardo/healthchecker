interface LinkProps {
  type?: "button" | "submit" | "reset";
  label: string;
  icon?: React.ReactNode;
  href?: string;
  className?: string;
  isSubmitting?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  type = "submit",
  label,
  className,
  icon,
  isSubmitting,
  children,
  onClick,
}: LinkProps) {
  return (
    <button
      type={type}
      className={`px-2 py-2 text-lg space-x-2 cursor-pointer ${
        className || ""
      }`}
      disabled={isSubmitting}
      onClick={onClick}
    >
      {children ? (
        children
      ) : (
        <>
          {icon}
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
