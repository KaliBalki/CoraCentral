"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import Button from "../Buttons/Buttons";

const Dropdown: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("LoggedIn");
    localStorage.removeItem("admin");
    localStorage.removeItem("klantID");
    window.dispatchEvent(new Event("authChange"));
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const updateAdmin = () => {
      setIsAdmin(localStorage.getItem("admin") === "true");
    };
    updateAdmin();
    window.addEventListener("authChange", updateAdmin);
    return () => window.removeEventListener("authChange", updateAdmin);
  }, []);

  const dropdownVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-white shadow-xs ring-2 ring-white ring-inset hover:bg-gray-800 transition duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="size-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.1 }}
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1">
              {isAdmin && (
                <Link
                  href="/Admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
              )}

              <button
                type="button"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const Navbar = () => {
  const [openMobileNav, setOpenMobileNav] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const pathname = usePathname();
  const customease = [0.05, 0.58, 0.57, 0.96];
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });

  useEffect(() => {
    if (!isMobile) {
      setOpenMobileNav(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (openMobileNav) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [openMobileNav]);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("LoggedIn") === "true");
  }, [pathname]);

  const hrVariant = {
    initial: {
      width: 0,
      origin: "left",
      opacity: 1,
      transition: { duration: 0.5, delay: 0.1, ease: customease },
    },
    animate: {
      width: "100%",
      origin: "left",
      opacity: 1,
      transition: { duration: 0.5, delay: 0.1, ease: customease },
    },
    exit: {
      width: 0,
      origin: "left",
      opacity: 1,
      transition: { duration: 0.5, delay: 0.1, ease: customease },
    },
  };

  const liVariant = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
  };

  const navVariant = {
    initial: { opacity: 0, scale: 1.1 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, ease: customease },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: { duration: 0.2, delay: 0.3, ease: customease },
    },
  };

  const handleClose = () => {
    setOpenMobileNav(false);
  };

  return (
    <>
      <nav className="bg-NavColor w-screen h-20 flex items-center justify-between px-4 relative z-[1000]">
        <div className="flex-shrink-0 flex items-center  p-2 z-[1000]">
          <Link href="/">
            <Image src="/NoBG_White.png" alt="Logo" width={110} height={90} />
          </Link>
        </div>
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <div className="flex flex-row text-white space-x-20 items-center h-full font-semibold text-lg">
            <Link href="/" className="group relative">
              <span className="text-white group-hover:text-transparent bg-gradient-to-r from-green-700 via-green-600 to-green-500 bg-clip-text transition duration-300">
                Startpagina
              </span>
            </Link>
            <Link href="/Teams" className="group relative">
              <span className="text-white group-hover:text-transparent bg-gradient-to-r from-green-700 via-green-600 to-green-500 bg-clip-text transition duration-300">
                Clubs
              </span>
            </Link>
            <Link href="/Fixtures" className="group relative">
              <span className="text-white group-hover:text-transparent bg-gradient-to-r from-green-700 via-green-600 to-green-500 bg-clip-text transition duration-300">
                Wedstrijden
              </span>
            </Link>
            <Link href="/Players" className="group relative">
              <span className="text-white group-hover:text-transparent bg-gradient-to-r from-green-700 via-green-600 to-green-500 bg-clip-text transition duration-300">
                Spelers
              </span>
            </Link>
            {isLoggedIn ? (
              <motion.li
                variants={liVariant}
                transition={{ duration: 0.3, delay: 0 }}
                className="flex items-center w-full flex-col gap-10"
              >
                <div className="pl-5 w-full">
                  <Dropdown />
                </div>
              </motion.li>
            ) : (
              <Link href="/Login" className="group relative">
                <span className="text-white group-hover:text-transparent bg-gradient-to-r from-green-700 via-green-600 to-green-500 bg-clip-text transition duration-300">
                  Inloggen
                </span>
              </Link>
            )}
          </div>
        </div>
        <div className="md:hidden z-[1001]">
          <Hamburger
            color="white"
            rounded
            size={30}
            toggled={openMobileNav}
            toggle={setOpenMobileNav}
          />
        </div>
      </nav>

      <AnimatePresence>
        {openMobileNav && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-BgColor z-[997]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {openMobileNav && (
          <motion.nav
            variants={navVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="!text-white fixed inset-0 w-screen h-screen overflow-y-auto no-scrollbar pb-[100px] bg-background z-[998] flex flex-col justify-between items-center"
          >
            <ul className="flex flex-col w-full gap-10 px-5 mt-[130px] relative z-30">
              <motion.li
                onClick={handleClose}
                variants={liVariant}
                transition={{
                  duration: 0.3,
                  delay: openMobileNav ? 0.3 : 0.3,
                  ease: customease,
                }}
                className="flex items-center w-full flex-col gap-10"
              >
                <Link
                  className="nav-item-mobile hover:text-foreground/80 duration-100 text-[42px] xs:text-[50px] sm:text-[60px] w-full text-left"
                  href="/"
                >
                  <motion.span className="pl-5">1. Startpagina</motion.span>
                </Link>
                <motion.hr
                  variants={hrVariant}
                  transition={{ duration: 0.3, ease: customease }}
                  className="bg-muted h-[2px] w-full origin-bottom-left"
                />
              </motion.li>

              <motion.li
                onClick={handleClose}
                variants={liVariant}
                transition={{
                  duration: 0.3,
                  delay: openMobileNav ? 0.2 : 0.4,
                  ease: customease,
                }}
                className="flex items-center w-full flex-col gap-10"
              >
                <Link
                  className="nav-item-mobile hover:text-foreground/80 duration-100 text-[42px] xs:text-[50px] sm:text-[60px] w-full text-left"
                  href="/Teams"
                >
                  <motion.span className="pl-5">2. Clubs</motion.span>
                </Link>
                <motion.hr
                  variants={hrVariant}
                  transition={{ duration: 0.3, ease: customease }}
                  className="bg-muted h-[2px] w-full origin-bottom-left"
                />
              </motion.li>

              <motion.li
                onClick={handleClose}
                variants={liVariant}
                transition={{
                  duration: 0.3,
                  delay: openMobileNav ? 0.1 : 0.5,
                  ease: customease,
                }}
                className="flex items-center w-full flex-col gap-10"
              >
                <Link
                  className="nav-item-mobile hover:text-foreground/80 duration-100 text-[42px] xs:text-[50px] sm:text-[60px] w-full text-left"
                  href="/Fixtures"
                >
                  <motion.span className="pl-5">3. Wedstrijden</motion.span>
                </Link>
                <motion.hr
                  variants={hrVariant}
                  transition={{ duration: 0.3, ease: customease }}
                  className="bg-muted h-[2px] w-full origin-bottom-left"
                />
              </motion.li>

              <motion.li
                onClick={handleClose}
                variants={liVariant}
                transition={{
                  duration: 0.3,
                  delay: openMobileNav ? 0 : 0.6,
                  ease: customease,
                }}
                className="flex items-center w-full flex-col gap-10"
              >
                <Link
                  className="nav-item-mobile hover:text-foreground/80 duration-100 text-[42px] xs:text-[50px] sm:text-[60px] w-full text-left"
                  href="/Players"
                >
                  <motion.span className="pl-5">4. Spelers</motion.span>
                </Link>
                <motion.hr
                  variants={hrVariant}
                  transition={{ duration: 0.3, ease: customease }}
                  className="bg-muted h-[2px] w-full origin-bottom-left"
                />
              </motion.li>
              <motion.li
                onClick={handleClose}
                variants={liVariant}
                transition={{
                  duration: 0.3,
                  delay: openMobileNav ? 0 : 0.6,
                  ease: customease,
                }}
                className="flex items-center w-full flex-col gap-10"
              >
                <Link
                  className="nav-item-mobile  hover:text-foreground/80 duration-100 text-[42px] xs:text-[50px] sm:text-[60px] w-full text-left font-bold"
                  href="/Login"
                >
                  <motion.span className="pl-5 text-transparent bg-clip-text bg-gradient-to-r from-[#6bff6b] to-[#324332]">
                    5. Inloggen
                  </motion.span>
                </Link>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
