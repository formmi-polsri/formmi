import Pagination from "@/components/elements/Pagination";
import Link from "next/link";

export default function TagsPage({payload, query}) {
    return (
        <div className="relative w-full space-y-[22px]">
            <h4>Tags Diskusi</h4>
            <div className="grid grid-cols-3 gap-4">
                {payload?.data.map(tag => (
                    <Link key={tag.id} href={`/tags/${tag.id}`}>
                    <div className="relative group w-full h-[142px] py-3 px-5 space-y-2 bg-primary-gray hover:bg-primary-blue transition-all rounded-xl">
                        <span className="tags px-2">{tag.id}</span>
                        <p className={`text-xs pt-1 ${tag.desk ? '' : 'text-font-gray'} font-medium line-clamp-2 leading-[18px]`}>{tag.desk ? tag.desk : `Deskripsi tags ${tag.id} belum tersedia...`}</p>
                        <div className="absolute left-5 bottom-5 right-5">
                            <p className="text-xs font-medium text-font-gray">{tag.total_tags} Diskusi</p>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
            <Pagination
                page={payload?.metadata?.page}
                totalPage={payload?.metadata.totalPage}
                totalRows={payload?.metadata.totalRows}
                limit={21}
                name='Tags'
                query={query}
                link='/tags'
            />
        </div>
    )
}