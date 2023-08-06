import api from "@/app/api";
import DiskusiPage from "./DiskusiPage";

async function getDiskusi(search, page, limit) {
    if (!page && !limit) { page = 1; limit = 14; }
    const payload = await api.get(`/getDiskusi?q=${search ? search : ''}&page=${page}&limit=${limit}`)
    return payload.data
}

export const metadata = {
    title: 'Diskusi Formmi - Forum Mahasiswa Manajemen INformatika Politeknik Negeri Sriwijaya'
}

export default async function Page({ searchParams }) {
    const { search, page, limit } = searchParams
    const payload = await getDiskusi(search, page, limit)

    return (
        <DiskusiPage 
            data={payload.data}
            metadata={payload.metadata}
            query={searchParams}
        />
    )
}