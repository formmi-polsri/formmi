import React from "react";
import BuatPage from "./BuatPage";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

async function AuthPage() {
    const token = cookies().get('token')?.value
    const user = jwt.decode(token, process.env.SECREATE_KEY)
    if (!token) redirect('/auth/login')

    return {user, token} 
}

export const metadata = {
    title: 'Buat Diskusi - Forum Mahasiswa Manajemen Informatika Politeknik Negeri Sriwijaya'
}

export default async function Page() {
    const {user, token} = await AuthPage()

    return (
        <div>
            <BuatPage user={user} token={token} />
        </div>
    )
}