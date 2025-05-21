"use client";

import React from "react";
import Button from "../Buttons/Buttons";
import Link from 'next/link'
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-l from-[#6bff6b] to-[#324332] text-white py-24 ">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <div className="text-center md:text-8xl text-6xl font-bold">
          <p>Begin Nu!</p>
        </div>
        <Link href="/Signup">
        <Button
          className="mt-9"
          variant="learnMore"
          
        >
          Word lid! &rarr;
        </Button>
</Link>
        <hr className="w-full border-t-2 border-white mt-12 mb-12" />
        <div className="text-center">
          <Image
            src="/NoBG_White.png"
            width={220}
            height={160}
            alt="Picture of the author"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
