import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const Intro1 = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const textInView = useInView(textRef, { once: true });
  const imageInView = useInView(imageRef, { once: true });

  return (
    <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-between">
      <motion.div
        ref={textRef}
        initial={{ opacity: 0, x: -100 }}
        animate={textInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="md:w-[800px] lg:pl-[56px] flex flex-col space-y-4 px-2"
      >
        <div className="text-white md:text-5xl text-3xl font-bold md:text-left text-center Grotesk">
          The Ultimate Competitive Experience
        </div>

        <div className="text-white/75 text-base font-extralight md:text-left text-center">
          Cora Central biedt een geavanceerd platform dat ontworpen is om jouw spelvaardigheden te verbeteren. Neem deel aan een dynamische omgeving die groei bevordert, teamwork aanmoedigt en precisie beloont. Onze geavanceerde analyses en real-time feedbacktools zorgen ervoor dat elk spel een stap naar meesterschap is.
        </div>
      </motion.div>

      <motion.div
        ref={imageRef}
        initial={{ opacity: 0, x: 100 }}
        animate={imageInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="absolute -top-20 w-[737px] h-[408px] rounded-3xl overflow-hidden  lg:right-[-35%] xl:right-[-21%] 2xl:right-[-7%] bg-gradient-to-r from-[#6bff6b] via-[#324332] to-[#009200] p-[8px] hidden lg:block"
      >
        <div className="w-full h-full rounded-3xl bg-black">
          <Image
            src="/3D_def_3_Ali.jpg"
            alt="Competitive Experience"
            layout="fill"
            objectFit="cover"
            className="rounded-3xl"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Intro1;
