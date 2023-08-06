import { cookies } from "next/headers";
import BlogsBuat from "./BlogsBuat";
import { redirect } from "next/dist/server/api-utils";
import jwt from 'jsonwebtoken'

async function authPage() {
    const token = cookies().get('token')?.value
    if (!token) redirect('/auth/login')
    const user = jwt.decode(token, process.env.SECREATE_KEY)
    return {
        token,
        user
    }
}

export const metadata = {
    title: 'Buat Blogs - Forum Mahasiswa Manajemen Informatika Politeknik Negeri Sriwijaya'
}

export default async function Page() {
    const {token, user} = await authPage()

    return <BlogsBuat user_id={user?.id} token={token} />
}