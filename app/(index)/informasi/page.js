import api from "@/app/api";
import InfoPage from "./InfoPage";

async function getInfo() {
    const payload = await api.get('/getPengumuman')
    return payload?.data
}

export const metadata = {
    title: 'Informasi Formmi - Forum Mahasiswa Manajemen Informatika Politeknik Negeri Sriwijaya'
}

export default async function Page({searchParams}) {
    const info = await getInfo()
    return <InfoPage data={info?.data} metadata={info?.metadata} query={searchParams} />
}