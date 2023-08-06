import Image from "next/image";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'

async function AuthPage() {
    // await authPageAdmin
    const token = cookies().get('token')?.value
    if (token) redirect('/')

    return
}

export default async function LayoutAuth({children}) {
    await AuthPage()
    return (
        <main className="relative w-screen h-screen">
            {children}
            <Image src={'/polsri.png'} fill style={{objectFit: 'cover'}} alt="polsri" />
        </main>
    )
}