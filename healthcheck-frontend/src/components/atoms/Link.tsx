interface LinkProps {
  label: string;
  labelClassName?: string;
  icon?: React.ReactNode;
  href?: string;
  className?: string;
  children?: React.ReactNode;
  target?: string;
  underlineOnHover?: boolean;
  onClick?: any;
}

export default function Link({
  href,
  label,
  labelClassName,
  className,
  icon,
  children,
  target,
  underlineOnHover = false,
  onClick,
}: LinkProps) {
  return (
    <a
      {...(href ? { href } : {})}
      {...(target ? { target } : {})}
      className={`py-2 text-lg font-medium flex items-center space-x-2 ${
        className || ""
      } ${underlineOnHover ? "hover:underline" : ""}`}
      onClick={onClick}
    >
      {children ? (
        children
      ) : (
        <>
          {icon}
          <span className={labelClassName}>{label}</span>
        </>
      )}
    </a>
  );
}
