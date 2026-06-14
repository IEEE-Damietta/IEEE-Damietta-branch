"use client";

import { useState } from "react";
import Image from "next/image";
import NavLink from "./NavLink";
import Link from "next/link";
import MobileAside from "./MobileAside";

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="mx-4 md:mx-32 px-6 bg-slate-700/20 backdrop-blur-lg border-b border-[#ffffff1a] shadow sticky top-3 rounded-full z-100">
      <div className="flex justify-between items-center py-3 w-full z-10">
        <div className="logo flex items-center">
          <Image
            src="/images/logo.jpg"
            className="rounded-full"
            alt="IEEE"
            width={50}
            height={50}
          />
          <span className="text-ieee-primary text-2xl font-bold ml-3">
            IEEE Damietta
          </span>
        </div>
        <ul className="hidden md:flex text-white items-center gap-6">
          <NavLink name="home" route="/" />
          <NavLink name="Events" route="/events" />
          <NavLink name="Blogs" route="/blogs" />
          <Link
            href="/register"
            className="px-6 py-2 font-bold rounded-full text-white bg-ieee-primary hover:bg-[#004494] transition-colors"
          >
            Join now
          </Link>
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="menu-toggle text-white md:hidden p-2 rounded-full hover:bg-white/5 transition"
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        <MobileAside open={open} onClose={() => setOpen(false)} />
      </div>
    </nav>
  );
};

export default Nav;
