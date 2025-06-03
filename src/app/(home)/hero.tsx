import Link from "next/link";
import { garamond, oldStandard } from "@/app/fonts";
import Image from "next/image";
import InTheDark from "./in-the-dark";

export default function HomeHero() {

  const totalUserCount = 1; // TODO: get this from the database

  return (
    <section className="py-20 px-4 relative overflow-hidden rounded-md bg-white dark:bg-black">

    <div className="opacity-50">
    <Image src="/images/hero.webp" alt="Hero" width={2500} height={2500} className="absolute inset-0 object-cover sepia opacity-50 pointer-events-none select-none" />
    <Image src="/images/paper-texture.webp" alt="Paper Texture" width={2500} height={2500} className="absolute inset-0 object-cover opacity-75 grayscale brightness-125 z-50 pointer-events-none select-none dark:invert" />
    </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Decorative Line */}
        <div className="w-24 h-[2px] bg-black mx-auto mb-4"></div>

        {/* Headline */}
        <h1 className={`${oldStandard.className} text-4xl relative md:text-5xl w-min mx-auto lg:text-8xl font-bold tracking-tight text-black dark:text-white uppercase`}>
          SPOKANE CLASSIFIEDS
          <InTheDark />
        </h1>

        {/* Subheadline */}
        <p className={`${garamond.className} text-2xl max-w-3xl mx-auto text-gray-800 dark:text-gray-200 italic leading-relaxed`}>
          Buy and sell with your neighbors. Simple, safe, and local.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/listings"
            className={`${garamond.className} w-full sm:w-auto px-8 py-4 text-lg border-2 border-black bg-[#fefcf9] dark:bg-pink-700/50 hover:bg-black hover:text-white transition-all duration-200 shadow-sm dark:hover:blur-[2px] dark:hover:bg-white blur-[0px] dark:hover:text-black`}
          >
            Browse Listings
          </Link>
          <Link
            href="/post"
            className={`${garamond.className} w-full sm:w-auto px-8 py-4 text-lg border-2 border-black bg-[#fefcf9] hover:bg-black hover:text-white duration-200 shadow-sm dark:bg-pink-700/50 dark:hover:blur-[2px] dark:hover:bg-white blur-[0px] transition-all dark:hover:text-black`}
          >
            Post a Listing
          </Link>
        </div>

        {/* Trust Text */}
        <div className="pt-8">
          <p className={`${garamond.className} text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400`}>
            Trusted by {totalUserCount} user{totalUserCount < 2 ? "" : "s"}
          </p>
        </div>
      </div>
    </section>
  );
}
