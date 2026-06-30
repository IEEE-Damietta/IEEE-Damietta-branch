"use client";
import Image from "next/image";
import { IoMdMail } from "react-icons/io";
import { motion } from "framer-motion";
import MembersContactModal from "./MembersContactModal";

const MemberBox = ({ name, role, photo, delay,modal, modalOnOpen, modalOnClose, memberDetails, customeImageClass="" }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
          delay: delay,
        }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-center flex-1 min-w-62.5 max-w-75 p-6 rounded-2xl bg-white/10 border border-white/15 shadow-lg text-white relative overflow-hidden"
      >
        <div className="h-56 w-56 m-auto">
          <Image
            src={`/images/branch-members/${photo}`}
            alt={name}
            className={`rounded-full object-cover w-full h-full ${customeImageClass}`}
            width={250}
            height={250}
          />
        </div>
        <div className="p-5">
          <h3 className="text-white mb-2.5 text-xl">{name}</h3>
          <p className="text-ieee-primary mb-1.25 text-[16px] font-bold">
            {role}
          </p>
          <p className="text-[#666] mb-3.5 text-[14px]">2025-2026</p>
        </div>
        <div className="team-contact">
          <button
            onClick={modalOnOpen}
            className="text-white cursor-pointer bg-ieee-primary border-none rounded-full px-5 py-2.5 text-sm transition-colors duration-300"
          >
            <IoMdMail className="inline-block" /> Contact me
          </button>
        </div>
      </motion.div>
      <MembersContactModal
        isOpen={modal}
        onClose={modalOnClose}
        member={memberDetails}
      />
    </>
  );
};

export default MemberBox;
