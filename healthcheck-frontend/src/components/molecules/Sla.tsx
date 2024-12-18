export interface IFooter {
  status: "VIOLATED" | "PASSED";
  percent: number;
}

export default function Sla({ status, percent }: IFooter) {
  const statusClasses = {
    VIOLATED: {
      statusClassName: "text-red-400 bg-red-100",
      textClassName: "text-red-400",
    },
    PASSED: {
      statusClassName: "text-green-400 bg-green-100",
      textClassName: "text-green-400",
    },
  }[status];

  return (
    <div className="flex items-center gap-2">
      <label className="text-3xl">SLA: </label>
      <span
        className={`${statusClasses?.statusClassName} whitespace-nowrap font-bold w-max p-1 rounded bg-opacity-95`}
      >
        {status}
      </span>
      <span
        className={`${statusClasses?.textClassName} text-2xl font-bold w-max`}
      >
        {percent}%
      </span>
    </div>
  );
}
