"use client";
import { BuildingLibraryIcon, UsersIcon } from "@heroicons/react/20/solid";
import {
  HomeIcon,
  UserIcon,
  CogIcon,
} from "@heroicons/react/24/outline"; // Using appropriate icons
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation
const links = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Engagements", href: "/events", icon: UserIcon },
  { name: "Resources", href: "/resources", icon: BuildingLibraryIcon },
  {name: "About Us", href: "/aboutus", icon: UsersIcon},
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] items-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
