import Link from "next/link";
import { garamond, oldStandard } from "@/app/fonts";
import Image from "next/image";
import InTheDark from "./in-the-dark";
import getTotalUserCount from "@/actions/get-total-user-count";

export default async function HomeHero() {

  const totalUserCount = await getTotalUserCount();

  return (
    <section className="py-20 px-4 relative overflow-hidden rounded-md bg-white dark:bg-black min-h-[500px]">

    <div className="opacity-50 absolute inset-0 h-full">
    <Image src="/images/hero.webp" alt="Hero" fill className="object-cover sepia opacity-50 pointer-events-none select-none" />
    <Image src="/images/paper-texture.webp" alt="Paper Texture" fill className="object-cover opacity-75 grayscale brightness-125 z-50 pointer-events-none select-none dark:invert" />
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
            className={`${garamond.className} w-full sm:w-auto px-8 py-4 text-lg border-2 border-black dark:bg-[#fefcf9] bg-black text-white dark:bg-pink-700/50 hover:bg-white hover:text-black transition-all duration-200 shadow-sm hover:blur-[2px] dark:hover:bg-white blur-[0px] dark:hover:text-black`}
          >
            Browse Listings
          </Link>
          <Link
            href="/post"
            className={`${garamond.className} w-full sm:w-auto px-8 py-4 text-lg border-2 border-black bg-black dark:bg-[#fefcf9] text-white dark:bg-pink-700/50 hover:bg-white hover:text-black duration-200 shadow-sm dark:bg-pink-700/50 hover:blur-[2px] dark:hover:bg-white blur-[0px] transition-all dark:hover:text-black`}
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
