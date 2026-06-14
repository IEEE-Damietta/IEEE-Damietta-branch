"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const cardLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const cardRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const Partners = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-200 m-auto text-center">
          <h1 className="section__header">Our Partners</h1>
          <div className="grid gap-5 mt-7.5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] overflow-hidden">
            <motion.div
              variants={cardLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.35 }}
              className="text-black text-center bg-white rounded-[15px] p-6.25 shadow-[0_5px_15px_rgba(0,0,0,0.1)]"
            >
              <Image
                src="/images/icons/corporate.png"
                width={60}
                height={60}
                className="m-auto mb-3"
                alt="corporate"
              />
              <h3 className="text-[#333333] mb-2.5 text-[20px]">
                Corporate Partners
              </h3>
              <h5>Leading tech companies</h5>
            </motion.div>
            <motion.div
              variants={cardRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.35 }}
              className="text-black text-center bg-white rounded-[15px] p-6.25 shadow-[0_5px_15px_rgba(0,0,0,0.1)]"
            >
              <Image
                src="/images/icons/academic.png"
                width={60}
                height={60}
                className="m-auto mb-3"
                alt="academic"
              />

              <h3 className="text-[#333333] mb-2.5 text-[20px]">
                Academic Partners
              </h3>
              <h5>Top universities in Egypt</h5>
            </motion.div>
            <motion.div
              variants={cardLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.35 }}
              className="text-black text-center bg-white rounded-[15px] p-6.25 shadow-[0_5px_15px_rgba(0,0,0,0.1)]"
            >
              <Image
                src="/images/icons/international.png"
                width={60}
                height={60}
                className="m-auto mb-3"
                alt="internation"
              />

              <h3 className="text-[#333333] mb-2.5 text-[20px]">
                International Partners
              </h3>
              <h5>IEEE global network</h5>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
