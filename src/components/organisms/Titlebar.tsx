import Select from "../atoms/Select";

interface TitlebarProps {
  title: string;
  filters?: React.ReactNode;
  button?: React.ReactNode;
}

export default function Titlebar({ title, filters, button }: TitlebarProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="text-2xl font-bold">{title}</div>
      {filters}
      {button}
    </div>
  );
}
