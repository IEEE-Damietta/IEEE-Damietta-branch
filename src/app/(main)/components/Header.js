"use client";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <section className="text-white flex justify-center items-center h-dvh bg-center bg-cover relative -mt-18.75">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-85"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url('/images/header.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 text-center p-2 animate-fade-up"
      >
        <h1 className="section__header">Welcome to IEEE Damietta Branch</h1>
        <p className="section_description">
          Empowering students with technical excellence and professional
          development in the heart of Damietta.
        </p>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-white text-xs uppercase tracking-[0.2em] font-medium mb-1">
          Scroll
        </span>

        <a
          href="#members"
          className="animate-bounce p-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Header;
