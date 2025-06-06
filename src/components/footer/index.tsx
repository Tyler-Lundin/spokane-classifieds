import { garamond } from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative bg-[#f4f1ea] dark:bg-black mt-8 text-black dark:text-white">
            {/* Paper texture overlay */}
            <div className="absolute inset-0 opacity-10">
                <Image 
                    src="/images/paper-texture.webp" 
                    alt="Paper Texture" 
                    fill 
                    className="object-cover mix-blend-multiply dark:invert"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
                <div className={`${garamond.className} text-center space-y-4`}>
                    <div className="text-sm uppercase tracking-wider text-black dark:text-white">
                        Spokane Classifieds
                    </div>
                    <div className="text-xs text-gray-600 dark:text-white">
                        &copy; {new Date().getFullYear()} All rights reserved
                    </div>
                    <div className="text-xs text-gray-600 dark:text-white italic">
                        &quot;Your trusted local marketplace&quot;
                    </div>
                    <div className="text-xs text-gray-600 dark:text-white">
                        <Link href="/privacy" className="hover:underline">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}