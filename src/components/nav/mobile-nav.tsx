import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Logo from "../ui/logo";
import Links from "./links";


const MOBILE_NAV_CLASSNAME = cn("fixed top-0 left-0 right-0 z-50 items-center flex justify-center", "md:hidden");


export default function MobileNav({ isOpen }: { isOpen: boolean }) {
    return (
        <motion.nav className={cn(MOBILE_NAV_CLASSNAME, "h-12")} transition={{ duration: 0.5 }}>
            <aside className={cn("top-0 bottom-0 h-screen flex flex-col w-64 p-8 absolute bg-white dark:bg-black text-black dark:text-white z-[500] transition-all duration-500", !isOpen ? "translate-x-full -right-48" : "translate-x-0 right-0")}>  
                <Logo className="mx-auto" width={100} height={100} />
                <hr className="my-4 border-black/25 dark:border-white/25" />
                <Links className="flex-col gap-4" />
            </aside>
        </motion.nav>
    )
}