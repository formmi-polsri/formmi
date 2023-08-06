import React from 'react'
import { LayoutAdmin } from "@/components/Layouts";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import { notFound } from 'next/navigation';

async function AuthPage() {
    const token = cookies().get('token')?.value
    const user = jwt.decode(token, process.env.SECREATE_KEY)
    if (user?.role !== 'admin') {
        notFound()
    }

    return user
}

export default async function Layout({children}) {
    const user = await AuthPage()
    return (
        <LayoutAdmin user={user}>
            {children}
        </LayoutAdmin>
    )
}