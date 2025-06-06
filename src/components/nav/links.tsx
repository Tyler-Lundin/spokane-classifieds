import { garamond } from "@/app/fonts";
import { NAV_LINKS } from "@/config/nav";
import { cn } from "@/lib/utils";
import Link from "next/link";

const UL_CN = cn("flex items-center justify-center w-full");

export default function Links({ className, setIsOpen }: { className?: string, setIsOpen?: (isOpen: boolean) => void }) {
  return (
    <ul className={cn(UL_CN, className)}>
      {NAV_LINKS.map((link, index) => {
        const isFirst = index === 0;
        const isLast = index === NAV_LINKS.length - 1;
        const isPost = link.href === "/listings/new";
        return (
        <li key={link.label} className="w-full md:w-auto">
            <Link
              onClick={() => setIsOpen?.(false)}
              href={link.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 w-full",
                "bg-gray-100/70 dark:bg-gray-800/60 backdrop-blur",
                "border border-gray-200 dark:border-gray-700",
                "text-black dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400",
                "transition-all duration-200 hover:scale-[1.03] hover:shadow-sm active:scale-[0.97]",
                garamond.className,

                // Rounded ends only on first/last buttons
                isFirst && "md:rounded-l-full",
                isLast && "md:rounded-r-full",
                isPost && "bg-indigo-300/40 dark:bg-pink-700/75",

                // No border between buttons
                !isLast && "-mr-px"
              )}
            >
              <div className="text-xl">{link.icon}</div>
              <span className="text-base">{link.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
