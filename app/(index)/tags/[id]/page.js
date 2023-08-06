import api from "@/app/api";
import DiskusiCart from "@/components/elements/DiskusiCart";
import Pagination from "@/components/elements/Pagination";
import { capitalizeFLetter } from "@/lib/capitalizeFirstLatter";

async function getDiskusiByTags(id) {
    const payload = await api.get('/tags/' + id)
    return payload.data
}

export default async function Page({ params, searchParams }) {
    const payload = await getDiskusiByTags(params?.id)
    return (
        <div className="relative w-full h-full space-y-8">
            <span className="space-y-2">
                <h4>{capitalizeFLetter(params?.id)}</h4>
                <p className="text-font-gray font-medium">Topik diskusi berdasarkan tags <span className="tags px-2">{params?.id}</span></p>
            </span>

            <DiskusiCart data={payload?.data} />

            <Pagination
                page={payload?.metadata?.page}
                totalPage={payload?.metadata.totalPage}
                totalRows={payload?.metadata.totalRows}
                limit={16}
                name='Diskusi'
                query={searchParams}
                link={`/tags/${params?.id}`}
            />
        </div>
    )
}