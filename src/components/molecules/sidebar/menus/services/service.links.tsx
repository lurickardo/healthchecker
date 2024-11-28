import Image from "@/components/atoms/Image";
import { usePathname } from "next/navigation";
import Link from "../../../../atoms/Link";
import { bvmOptions } from "./bvm/optionsLinks";
import { markPage, routeLayer } from "@/utils/utils";
import { ChevronDown, ChevronRight, HeartPulse } from "lucide-react";
import { useEffect, useState } from "react";

export interface optionsProps {
  pathname: string;
}

interface serviceInterface {
  acronym: string;
  label: string;
  href?: string;
  icon: { path: string | JSX.Element; className: string };
  option: {
    optionsLinks: ({
      pathname,
    }: optionsProps) => { key: string; prop: JSX.Element }[];
    open: boolean;
    haveContent?: boolean;
  };
}

const services: serviceInterface[] = [
  {
    acronym: "hc",
    label: "Health Check",
    icon: {
      path: <HeartPulse />,
      className: "h-6",
    },
    option: {
      optionsLinks: bvmOptions,
      open: false,
      haveContent: true,
    },
  },
];

export const servicesLinks = () => {
  const pathname = usePathname();

  const [optionsOpen, setOptionsOpen] = useState<{ [key: string]: boolean }>(
    services.reduce((acc, service) => {
      acc[service.acronym] = service.option.open;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const openOptions = (acronym: string) => {
    setOptionsOpen((prevState) => ({
      ...prevState,
      [acronym]: !prevState[acronym],
    }));
  };

  useEffect(() => {
    openOptions(routeLayer(pathname, 1)?.replace("/", "") || "");
  }, []);

  return services.map((service) => {
    const hasContent = service.option.haveContent;
    const isOpen = optionsOpen[service.acronym];

    return {
      key: service.acronym,
      prop: (
        <>
          <div
            className={`${markPage(
              routeLayer(pathname, 1),
              service.href || "",
              "text-hc-green-300"
            )} hover:text-hc-green-300 flex items-center justify-between w-full max-w-72 cursor-pointer`}
            onClick={() => openOptions(service.acronym)}
          >
            <Link
              label={service.label}
              href={service.href || "#"} // Valor padrão para evitar `undefined`
              icon={
                typeof service.icon.path === "string" ? (
                  <Image
                    className={service.icon.className}
                    src={service.icon.path}
                    alt={service.label}
                  />
                ) : (
                  service.icon.path
                )
              }
              className={`${markPage(
                routeLayer(pathname, 1),
                service.href || "#",
                "text-hc-green-300"
              )} hover:text-hc-green-300 font-poppins text-lg pl-6 font-normal`}
              labelClassName={"pl-4"}
            />
            {hasContent ? isOpen ? <ChevronDown /> : <ChevronRight /> : ""}
          </div>
          <ul
            className={`transition-all duration-300 ease-in-out pl-12 ${
              isOpen
                ? "max-h-screen opacity-100 visible"
                : "max-h-0 opacity-0 overflow-hidden invisible"
            }`}
          >
            {service.option.optionsLinks({ pathname }).map((link) => (
              <li key={link.key}>{link.prop}</li>
            ))}
          </ul>
        </>
      ),
    };
  });
};

export const servicesIcons = () => {
  const pathname = usePathname();

  const [optionsOpen, setOptionsOpen] = useState<{ [key: string]: boolean }>(
    services.reduce((acc, service) => {
      acc[service.acronym] = service.option.open;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const openOptions = (acronym: string) => {
    setOptionsOpen((prevState) => ({
      ...prevState,
      [acronym]: !prevState[acronym],
    }));
  };

  useEffect(() => {
    openOptions(routeLayer(pathname, 1)?.replace("/", "") || "");
  }, []);

  return services.map((service) => {
    return {
      key: service.acronym,
      prop: (
        <>
          <div
            className={`${markPage(
              routeLayer(pathname, 1),
              service.href || "",
              "text-hc-green-300"
            )} hover:text-hc-green-300 flex items-center justify-between w-full max-w-72 cursor-pointer`}
            onClick={() => openOptions(service.acronym)}
          >
            <Link
              label={""}
              href={service.href || "#"} // Valor padrão para evitar `undefined`
              icon={
                typeof service.icon.path === "string" ? (
                  <Image
                    className={service.icon.className}
                    src={service.icon.path}
                    alt={service.label}
                  />
                ) : (
                  service.icon.path
                )
              }
              className={`${markPage(
                routeLayer(pathname, 1),
                service.href || "#",
                "text-hc-green-300"
              )} hover:text-hc-green-300 font-poppins text-lg pl-6 font-normal`}
            />
          </div>
        </>
      ),
    };
  });
};
