"use client";

import Link from "../../../atoms/Link";
import { servicesIcons, servicesLinks } from "./services/service.links";

interface menuLinksInterface {
  key: string;
  label: string;
  subMenu?: () => { key: string; prop: JSX.Element }[];
}

const menus: menuLinksInterface[] = [
  {
    key: "services",
    label: "Services",
    subMenu: servicesLinks,
  },
];

export const menuLinks = () => {
  return menus.map((menu) => {
    return {
      key: menu.key,
      prop: (
        <>
          <Link
            href="#"
            label={""}
            className="text-hc-white-100 text-xl font-bold ml-6"
          />
          <ul>
            {menu.subMenu &&
              menu.subMenu().map((link) => <li key={link.key}>{link.prop}</li>)}
          </ul>
        </>
      ),
    };
  });
};

export const menuIcons = () => {
  return menus.map((menu, key) => {
    return {
      key: menu.key + key,
      prop: (
        <>
          <Link
            href="#"
            label={""}
            className="text-hc-white-100 text-xl font-bold ml-6"
          />
          <ul>
            {menu.subMenu &&
              servicesIcons().map((link) => (
                <li key={link.key}>{link.prop}</li>
              ))}
          </ul>
        </>
      ),
    };
  });
};
