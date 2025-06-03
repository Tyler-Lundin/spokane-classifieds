import { Listing } from "@/types/app.types";
import Image from "next/image";
import Link from "next/link";
import ImageDisplay from "./image-display";

export default function ListingPreview({
    id,
    userId,
    categoryId,
    title,
    description,
    price,
    currency,
    imageUrls,
}: Partial<Listing>) {
    return (
        <Link href={`/listing/${id}`} className="block hover:opacity-90 transition-opacity w-full h-full">
            <div
                key={id}
                className="relative border border-black/25 bg-[#f4f1ea] dark:bg-[#3f3f3f] p-4 rounded-none w-full h-full shadow-md overflow-hidden font-serif text-black dark:text-white"
            >
                {/* Paper texture overlay */}
                <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10 pointer-events-none z-0" />

                <div className="relative z-10 flex flex-col gap-2">
                    {/* Image */}
                    <ImageDisplay imageUrl={imageUrls?.[0]} />

                    <Title title={title} />
                    <Description description={description} />
                    <Price price={price} currency={currency} />
                </div>
            </div>
        </Link>
    );
}


function Title({ title }: { title?: string }) {
    if (!title) return null;
    return(
        <h2 className="text-xl font-bold tracking-tight border-b border-dashed border-black/50 dark:border-white/50 pb-1 mt-2">
            {title}
        </h2>
    )
}

function Description({ description }: { description?: string }) {
    if (!description) return null;
    return(
        <p className="text-sm leading-snug text-gray-900 dark:text-gray-100 italic">
            {description}
        </p>
    )
}

function Price({ price, currency }: { price?: number, currency?: string }) {
    if (!price) return null;

    function formatPrice(price: number) {
        return price.toLocaleString("en-US", {
            style: "currency",
            currency: currency || "USD",
        });
    }

    return(
        <div className=" border-t border-black/50 border-dashed dark:border-white/50 pt-2 text-sm uppercase tracking-wide">
        <span className="font-bold">
            {formatPrice(price)}
        </span>
        </div>
    )
}