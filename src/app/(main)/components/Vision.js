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

const Vision = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-200 m-auto text-center">
          <h1 className="section__header mb-12">Our Vision & Mission</h1>
          <div className="grid gap-7.5 mt-7.5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] overflow-hidden">
            <motion.div
              variants={cardLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.35 }}
              className="text-black text-center bg-white rounded-[15px] p-7.5 shadow-[0_5px_20px_rgba(0,0,0,0.1)]"
            >
              <Image
                src="/images/icons/vision.png"
                width={60}
                height={60}
                alt="vision"
                className="m-auto mb-3"
              />

              <h3 className="text-[#333333] mb-3.75 text-2xl">Our Vision</h3>
              <h5>
                To be the leading student branch in Egypt, empowering
                engineering students with technical skills and leadership
                opportunities.
              </h5>
            </motion.div>
            <motion.div
              variants={cardRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.35 }}
              className="text-black text-center bg-white rounded-[15px] p-7.5 duration-300 shadow-[0_5px_20px_rgba(0,0,0,0.1)]"
            >
              <Image
                src="/images/icons/mission.png"
                width={60}
                height={60}
                alt="vision"
                className="m-auto mb-3"
              />

              <h3 className="text-[#333333] mb-3.75 text-2xl">Our Mission</h3>
              <h5>
                To provide technical workshops, training opportunities, and
                international certificates to bridge the gap between academia
                and industry.
              </h5>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
