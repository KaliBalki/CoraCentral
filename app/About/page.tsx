"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const RotatingFootballField = dynamic(
  () => import("../../components/3D/RotatingFootballField"),
  { ssr: false }
);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#101010] text-white px-6 md:px-16 py-20 space-y-24">
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold text-center text-[#6bfd6b] drop-shadow-lg"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Over Ons
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          className="space-y-8 text-lg leading-relaxed text-white"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="text-[#d4d4d4]">
            Welkom bij de{" "}
            <span className="text-[#6bfd6b] font-semibold">Cora League</span>, de meest futuristische voetbalcompetitie
            van deze generatie. In het jaar 2025 combineren we technologie, creativiteit en passie tot een ervaring die je nergens anders
            vindt.
          </p>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#6bfd6b]">Onze Missie</h2>
            <p className="text-[#d4d4d4]">
              De Cora League is meer dan voetbal. Het is een podium voor innovatie, strategie en fanbeleving. Elke match is een showcase van
              creativiteit op het veld en in de stands.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#6bfd6b]">Competitie Setup</h2>
            <p className="text-[#d4d4d4]">
              Gevestigd in <strong>Antwerpen Central 2025</strong>, omvat onze competitie unieke velden zoals de Trappezum Arena, het
              HexaCore Stadion en het legendarische CirkelVeld. Elk veld vraagt een andere aanpak van de spelers.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#6bfd6b]">Fan Experience</h2>
            <p className="text-[#d4d4d4]">
              Onze fans zijn essentieel. Interactieve tribunes, fanzones met AR-momenten, en thematische speeldagen zorgen voor
              onvergetelijke herinneringen.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#6bfd6b]/30 bg-[#324332]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <RotatingFootballField />
        </motion.div>
      </div>
    </div>
  );
};

export default About;
