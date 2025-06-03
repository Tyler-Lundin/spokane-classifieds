import { Category } from "@/types/app.types";
import { CATEGORIES } from "@/data/categories.data";

export default async function getAllCategories(): Promise<Category[]> {
    return Promise.resolve(CATEGORIES);
}