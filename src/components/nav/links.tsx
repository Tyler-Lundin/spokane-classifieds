import { garamond } from "@/app/fonts";
import { NAV_LINKS } from "@/config/nav";
import { cn } from "@/lib/utils";
import Link from "next/link";


const UL_CN = cn("flex items-center justify-center gap-8");


export default function Links({ className }: { className?: string }) {
    return (
        <ul className={cn(UL_CN, className)}>
            {NAV_LINKS.map((link) => (
                <li key={link.label}>
                    <Link href={link.href} className={cn("text-lg hover:blur-[3px] text-black dark:text-white transition-all duration-300 blur-[0px]", garamond.className)}>{link.label}</Link>
                </li>
            ))}
        </ul>
    )
}