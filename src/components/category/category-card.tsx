import { Category } from "@/types/app.types";
import Link from "next/link";
import { garamond } from "@/app/fonts";

export default function CategoryCard({ category }: { category: Category }) {
    return (
        <Link 
            href={`/category/${category.slug}`} 
            className={`${garamond.className} group block p-6 border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-all duration-300 bg-white dark:bg-black text-black dark:text-white`}
        >
            <div className="relative">
                {/* Decorative dot */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-black dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <h2 className="text-lg tracking-wide group-hover:translate-x-2 transition-transform duration-300">
                    {category.name}
                </h2>
            </div>
        </Link>
    )
}