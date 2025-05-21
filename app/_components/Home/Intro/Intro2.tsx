import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const Intro2 = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const textInView = useInView(textRef, { once: true });
  const imageInView = useInView(imageRef, { once: true });

  return (
    <div className="md:pt-96 pt-32 flex flex-row-reverse items-center relative">
      <motion.div
        ref={textRef}
        initial={{ opacity: 0, x: 100 }}
        animate={textInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="w-[800px] lg:pl-[56px] flex flex-col space-y-4 md:pr-12"
      >
        <div className="text-white md:text-5xl text-3xl font-bold md:text-left text-center Grotesk">
          Verbeter Je Spel Met Ons
        </div>

        <div className="text-white/75 text-base font-extralight md:text-left text-center">
          Ontdek Cora Central, waar innovatie en competitie samenkomen. Ons platform verbetert je esports-ervaring met real-time analyses, gepersonaliseerde coaching en een gemeenschap die groei ondersteunt. Sluit je bij ons aan en breng je vaardigheden naar een hoger niveau.
        </div>
      </motion.div>

      <motion.div
        ref={imageRef}
        initial={{ opacity: 0, x: -100 }}
        animate={imageInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="absolute w-[737px] h-[408px] rounded-3xl overflow-hidden  lg:left-[-35%] xl:left-[-21%] 2xl:left-[-7%] bg-gradient-to-l from-[#6bff6b] via-[#324332] to-[#009200] p-[8px] hidden lg:block"
      >
        <div className="w-full h-full rounded-3xl bg-black">
          <Image
            src="/3D_def_10_Ali.jpg"
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

export default Intro2;
