import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import { LayoutOption } from "@/components/Layouts";

async function AuthPage() {
    const token = cookies().get('token')?.value
    const user = jwt.decode(token, process.env.SECREATE_KEY)

    return { user, token }
}

export default async function Layout({children}) {
    const { user, token } = await AuthPage()
    return (
        <LayoutOption user={user} token={token}>
            {children}
        </LayoutOption>   
    )
}