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
    href: "/healthcheck/dashboard",
  },
  {
    key: "synthetictests",
    label: "Systhetic Tests",
    href: "/healthcheck/synthetictests",
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
