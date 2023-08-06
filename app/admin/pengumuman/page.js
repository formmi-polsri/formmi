import { cookies } from "next/headers";
import BuatPeng from "./BauatPeng";

async function getToken() {
    const token = cookies().get('token')?.value
    return token
}

export default async function Page() {
    const token = await getToken()
    return <BuatPeng token={token} />
}