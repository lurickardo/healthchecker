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
    key: "instances",
    label: "Instances",
    href: "/bvm/instances",
  },
  {
    key: "keypair",
    label: "Key Pair",
    href: "/bvm/keypair",
  },
  {
    key: "images",
    label: "Machine Images",
    href: "/bvm/images",
  },
];

export const bvmOptions = ({ pathname }: optionsProps) => {
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
            )} hover:text-hc-green-100 font-poppins text-lg pl-6 font-normal`}
          />
        </>
      ),
    };
  });
};
