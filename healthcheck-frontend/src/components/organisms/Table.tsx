import ButtonActions from "../molecules/ButtonActions";

interface TableProps {
  className?: string;
  th: string[];
  trs: (string | React.ReactNode)[][];
  buttons?: {
    label: string;
    className?: string;
    actions: React.ReactNode[];
  }[][];
}

export default function Table({ className, th, trs, buttons }: TableProps) {
  return (
    <div
      className={`bg-hc-black-500 overflow-x-auto border-2 border-hc-black-300 rounded ${
        className || ""
      }`}
    >
      <table className="table-auto divide-y divide-hc-black-200 w-full">
        <thead className="text-xl">
          <tr className="text-hc-green-300">
            {th.map((item) => (
              <th key={item} scope="col" className="px-12 py-4 text-center">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-lg divide-y divide-hc-black-300 divide-y-reverse text-center">
          {trs.map((tds, rowKey) => (
            <tr key={rowKey} className="border-y border-hc-black-300">
              {tds.map((td, colKey) =>
                typeof td === "string" ? (
                  <td
                    key={`${rowKey}-${colKey}`}
                    className="px-12 py-4 whitespace-nowrap "
                  >
                    {td}
                  </td>
                ) : (
                  td
                )
              )}
              {buttons &&
                buttons[rowKey]?.map((button, buttonKey) => (
                  <td
                    key={`${rowKey}-button-${buttonKey}`}
                    className="px-12 py-4 whitespace-nowrap text-center text-sm font-medium flex justify-center"
                  >
                    <ButtonActions
                      nameButton={button.label}
                      className={`absolute right-56 mt-2 z-10 w-48 origin-top-right rounded-md bg-hc-black-200 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                        button.className || ""
                      }`}
                      classNameButton="hover:bg-hc-black-200 px-6 py-2 rounded-md border-2 border-hc-purple-100 focus:outline-none"
                    >
                      {button.actions}
                    </ButtonActions>
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
