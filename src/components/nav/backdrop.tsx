import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Backdrop({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
    if (!isOpen) return null;
    return (
        <motion.button onClick={() => setIsOpen(false)} className={cn("fixed top-0 left-0 right-0 bottom-0 backdrop-blur-md z-40 bg-black/50 md:hidden")} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
    )
}