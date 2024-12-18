import { ArrowLeftFromLine } from "lucide-react";
import Link from "../atoms/Link";

interface ButtonBackProps {
  href: string;
  label?: string;
}

export default function ButtonBack({ href, label = "Back" }: ButtonBackProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center bg-bs-purple-300 text-white font-semibold py-2 px-4 rounded-lg hover:bg-bs-purple-400 transition-colors"
      label={label}
    >
      <ArrowLeftFromLine className="w-4 h-4 md:w-5 md:h-5 mr-2" />
      <span className="">{label}</span>
    </Link>
  );
}
