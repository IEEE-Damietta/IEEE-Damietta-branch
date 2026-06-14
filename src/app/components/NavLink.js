"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ name, route, className = "", asListItem = true }) => {
  const pathname = usePathname();

  const activeClass = pathname == route ? "bg-[#0056b31a] text-ieee-primary" : "";

  const link = (
    <Link
      href={route}
      className={`hover:bg-[#0056b31a] hover:text-ieee-primary py-1.25 px-2.5 rounded-[5px] transition-colors ${activeClass} ${className}`}
    >
      {name}
    </Link>
  );

  return asListItem ? <li>{link}</li> : link;
};

export default NavLink;
