import { users } from "@/data/users.data";

export default async function getTotalUserCount() {
    return Promise.resolve(users.length);
}