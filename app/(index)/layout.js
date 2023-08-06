import { LayoutIndex } from "@/components/Layouts";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'

async function AuthPage() {
    const token = cookies().get('token')?.value
    const user = jwt.decode(token, process.env.SECREATE_KEY)

    return { user, token }
}

export default async function HomeLayout({ children }) {
    const { user, token } = await AuthPage()

    return (
        <LayoutIndex user={user} token={token}>
            {children}
        </LayoutIndex>
    )
}