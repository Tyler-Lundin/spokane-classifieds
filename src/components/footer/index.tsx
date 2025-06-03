import { garamond } from "@/app/fonts";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative border-t-2 border-black bg-[#f4f1ea] mt-8 dark:invert">
            {/* Paper texture overlay */}
            <div className="absolute inset-0 opacity-10">
                <Image 
                    src="/images/paper-texture.webp" 
                    alt="Paper Texture" 
                    fill 
                    className="object-cover mix-blend-multiply"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
                <div className={`${garamond.className} text-center space-y-4`}>
                    <div className="text-sm uppercase tracking-wider dark:invert">
                        Spokane Classifieds
                    </div>
                    <div className="text-xs text-gray-600">
                        &copy; {new Date().getFullYear()} All rights reserved
                    </div>
                    <div className="text-xs text-gray-600 italic">
                        "Your trusted local marketplace"
                    </div>
                </div>
            </div>
        </footer>
    );
}