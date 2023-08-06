import api from "@/app/api";
import InfoIdPage from "./InfoIdPage";

async function getInfoById(id) {
    const payload = await api.get('/getPengumuman/' + id)
    return payload.data
}

export async function generateMetadata({ params }) {
    return {
        title: `Informasi Formmi - ${params.slug}`
    }
}

export default async function Page({params}) {
    const infoById = await getInfoById(params?.id)
    return <InfoIdPage data={infoById?.data} />
}