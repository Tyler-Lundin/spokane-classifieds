import { getUserById } from "@/data/users.data";

export default async function getUserByIdAction(id: string) {
    return getUserById(id);
}