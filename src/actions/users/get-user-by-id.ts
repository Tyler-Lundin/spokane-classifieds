import { DUMMY_USERS } from "@/data/listings.data";

export default async function getUserById(id: string) {
    // TODO: Replace with actual database call
    return DUMMY_USERS.find((user) => user.id === id);
}