"use client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MobileButton from "./mobile-button";
import Backdrop from "./backdrop";
import MobileNav from "./mobile-nav";
import DesktopNav from "./desktop-nav";
import InitialNav from "./initial-nav";



export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 282);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
        <AnimatePresence>
            <InitialNav key="initial-nav" />
            {scrolled && <DesktopNav key="fixed-nav" />}
            <MobileNav key="mobile-drawer" isOpen={isOpen} setIsOpen={setIsOpen} />
            <MobileButton key="mobile-button" isOpen={isOpen} setIsOpen={setIsOpen} />
            <Backdrop key="backdrop" isOpen={isOpen} setIsOpen={setIsOpen} />
            </AnimatePresence>
        </>
    )
}

