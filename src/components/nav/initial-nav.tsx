import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Logo from "../ui/logo";
import Links from "./links";


const INITIAL_NAV_CLASSNAME = cn(" h-64 overflow-hidden flex flex-col items-center justify-center gap-4 bg-white dark:bg-black");


export default function InitialNav() {
    return (
        <nav className={cn(INITIAL_NAV_CLASSNAME, "")}
        >
            <motion.div className="grid gap-4" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Logo />
                <Links className="hidden md:flex"/>
            </motion.div>
        </nav>
    )
}
