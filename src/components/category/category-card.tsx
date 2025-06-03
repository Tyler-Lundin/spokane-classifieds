import { Category } from "@/types/app.types";
import Link from "next/link";


export default function CategoryCard({ category }: { category: Category }) {
    return (
        <Link href={`/category/${category.slug}`}>
            <h2>{category.name}</h2>
        </Link>
    )
}