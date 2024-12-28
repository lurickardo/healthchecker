import { markPage } from "@/utils/utils";
import Link from "../../../../../atoms/Link";
import { optionsProps } from "../service.links";

interface optionsInterface {
  key: string;
  label: string;
  href: string;
}

const options: optionsInterface[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/healthcheck/synthetic/dashboard",
  },
  {
    key: "tests",
    label: "Tests",
    href: "/healthcheck/synthetic/tests",
  },
  {
    key: "variables",
    label: "Variables",
    href: "/healthcheck/synthetic/variables",
  },
  {
    key: "requestvariables",
    label: "Request Variables",
    href: "/healthcheck/synthetic/requestvariables",
  },
];

export const healthcheckOptions = ({ pathname }: optionsProps) => {
  return options.map((option) => {
    return {
      key: option.key,
      prop: (
        <>
          <Link
            label={option.label}
            href={option.href}
            className={`${markPage(
              pathname,
              option.href,
              "text-hc-green-100"
            )} hover:text-hc-green-100 font-poppins text-lg pl-4 font-normal`}
          />
        </>
      ),
    };
  });
};
