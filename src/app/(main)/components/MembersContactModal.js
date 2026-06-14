"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTimes } from "react-icons/fa";

export default function MembersContactModal({ isOpen, onClose, member }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/80"
          />

          {/* Modal */}
          <div
            onClick={onClose}
            className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto p-4"
          >
            <motion.div
              onClick={(event) => event.stopPropagation()}
              initial={{
                opacity: 0,
                scale: 0.85,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="w-[90%] max-w-lg max-h-[95vh] overflow-hidden"
            >
              <div className="relative rounded-4xl bg-white px-8 py-10 shadow-2xl">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute right-8 top-8 text-4xl text-gray-700 transition hover:rotate-90"
                >
                  <FaTimes />
                </button>

                {/* Name */}
                <h2 className="mb-3 text-center text-2xl font-semibold text-gray-800">
                  {member.name}
                </h2>

                {/* Position */}
                <p className="mb-10 text-center text-lg font-bold text-blue-700">
                  {member.role}
                </p>

                <div className="space-y-5">
                  {/* Facebook */}
                  {member.facebook && (
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14 items-center justify-center gap-3 rounded-full bg-[#1877F2] text-2xl font-bold text-white transition hover:scale-[1.02]"
                    >
                      <FaFacebook />
                      Facebook
                    </a>
                  )}

                  {/* Instagram */}
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14 items-center justify-center gap-3 rounded-full bg-linear-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-2xl font-bold text-white transition hover:scale-[1.02]"
                    >
                      <FaInstagram />
                      Instagram
                    </a>
                  )}

                  {/* LinkedIn */}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14 items-center justify-center gap-3 rounded-full bg-[#0077B5] text-2xl font-bold text-white transition hover:scale-[1.02]"
                    >
                      <FaLinkedin />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
