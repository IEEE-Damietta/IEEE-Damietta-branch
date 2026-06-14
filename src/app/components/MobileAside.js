"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import NavLink from "./NavLink";

export default function MobileAside({ open, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      ></div>

      <aside
        aria-hidden={!open}
        className={`m-3 rounded-3xl fixed right-0 top-0 h-[97vh] w-[min(80vw,320px)] bg-gradient-to-b from-slate-800/90  to-slate-900/90 backdrop-blur-md shadow-[ -20px_0_60px_rgba(2,8,23,0.6)] transform transition-transform duration-300 z-[70] ${open ? "translate-x-0" : "translate-x-[400px]"}`}
      >
        <div className="p-6 flex flex-col gap-4 h-full">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="self-end p-2 rounded-full text-white hover:bg-white/5 transition"
          >
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
          </button>

          <div className="flex items-center gap-3 mb-4">
            <img
              src="/images/logo.jpg"
              className="w-12 h-12 rounded-full"
              alt="logo"
            />
            <div>
              <div className="text-lg font-bold text-white">IEEE Damietta</div>
              <div className="text-sm text-gray-300">Student Branch</div>
            </div>
          </div>

          <ul className="flex flex-col gap-3 mt-2">
            <li
              style={{ transitionDelay: "80ms" }}
              className={`transform transition duration-300 ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
            >
              <NavLink
                name="home"
                route="/"
                asListItem={false}
                className="block w-full px-5 py-3"
              />
            </li>
            <li
              style={{ transitionDelay: "140ms" }}
              className={`transform transition duration-300 ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
            >
              <NavLink
                name="Events"
                route="/events"
                asListItem={false}
                className="block w-full px-5 py-3"
              />
            </li>
            <li
              style={{ transitionDelay: "200ms" }}
              className={`transform transition duration-300 ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
            >
              <NavLink
                name="Blogs"
                route="/blogs"
                asListItem={false}
                className="block w-full px-5 py-3"
              />
            </li>

            <li
              style={{ transitionDelay: "260ms" }}
              className={`mt-4 transform transition duration-300 ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
            >
              <Link
                href="/register"
                className="block px-5 py-3 rounded-full bg-ieee-primary text-white font-bold text-center"
              >
                Join now
              </Link>
            </li>
          </ul>

          <div className="mt-auto text-sm text-gray-400">© IEEE Damietta</div>
        </div>
      </aside>
    </>,
    document.body,
  );
}
