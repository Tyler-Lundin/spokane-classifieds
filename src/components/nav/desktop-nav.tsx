import { motion } from "framer-motion";
import Links from "./links";
import { cn } from "@/lib/utils";


const DESKTOP_NAV_CN = cn("m-4 ", "fixed top-0 left-0 right-0 w-fit whitespace-nowrap mx-auto z-50", "h-12 items-center flex justify-center", "hidden md:flex");


export default function DesktopNav() {
    return (
        <motion.nav className={DESKTOP_NAV_CN} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }} transition={{ duration: 0.5 }}>
            <Links />
        </motion.nav>
    )
}