import api from "@/app/api"
import DiskusiPageId from "./DiskusiPageId"
import Komentar from "./Komentar"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt from 'jsonwebtoken'

async function getDiskusiById(id) {
    const payload = await api.get(`/getDiskusi/${id}`)
    return payload?.data
}

async function getKomentar(id) {
    const komentar = await api.get(`/getKoment/${id}`)
    return komentar.data
}

async function AuthPage() {
    const token = cookies().get('token')?.value
    const user = jwt.decode(token, process.env.SECREATE_KEY)

    return { user, token }
}

export async function generateMetadata({params}) {
    return {
        title: `Diskusi Formmi - ${params.slug}`
    }
}

export default async function Page({params}) {
    const payload = await getDiskusiById(params?.id)
    const koment = await getKomentar(params.id)
    const {user, token} = await AuthPage()
    return (
        <>
            <DiskusiPageId user={user} data={payload?.data} token={token} />
            <Komentar user={user} diskusi_id={payload?.data?.id} koment={koment} token={token} />
        </>
    )
}