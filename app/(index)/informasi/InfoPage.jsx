import Pagination from "@/components/elements/Pagination";
import TimeAgo from "@/lib/timeAgo";
import Image from "next/image";
import Link from "next/link";

export default function InfoPage({data, metadata, query}) {
    return (
        <div className="relative space-y-[22px]">
            <h4>Informasi</h4>
            <div className="w-full py-2">
                {data.map(info => (
                    
                    <div key={info?.id} className="flex gap-6 w-full">
                            <div className="relative w-[260px] h-full aspect-video bg-primary-orange rounded-xl overflow-hidden">
                                <Image src={info.gambar ? `https://api.formmi.tech/uploads/${info.gambar}` : 'https://api.formmi.tech/default.jpg'} fill style={{ objectFit: 'cover' }} alt="gambar" />
                            </div>
                            <div className="relative flex-1 py-2 space-y-2">
                            <Link href={`/informasi/${info?.id}/${info?.slug}`}>
                                <h4>{info?.title}</h4>
                            </Link>

                                <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: info?.konten }} />
                                <span className="absolute left-0 bottom-5 text-xs text-font-gray font-semibold">{TimeAgo(Date.now(), info?.created_at)}</span>
                            </div>
                        </div>
                ))}
            </div>
            <Pagination
                page={metadata?.page}
                totalPage={metadata.totalPage}
                totalRows={metadata.totalRows}
                limit={12}
                name='Informasi'
                query={query}
                link='/informasi'
            />
        </div>
    )
}