"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const logoVariants = {
    initial: {
      scale: 0.9,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

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

      <div className="z-10 text-center p-2">
        <AnimatePresence mode="wait">
          {isVisible ? (
            <motion.div
              key="logo"
              className="absolute inset-0 flex items-center justify-center"
              variants={logoVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Image
                src="/images/logo.jpg"
                className="rounded-full"
                alt="IEEE Logo"
                width={150}
                height={150}
                priority
              />
            </motion.div>
          ) : (
            <motion.div
              key="headline"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="text-center p-2">
                <h1 className="section__header">
                  Welcome to <span className="text-blue-500">IEEE</span> Damietta Branch
                </h1>
                <p className="section_description">
                  Empowering students with technical excellence and professional
                  development in the heart of Damietta.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="z-10 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
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
