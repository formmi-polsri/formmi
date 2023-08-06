import TimeAgo from "@/lib/timeAgo";
import Image from "next/image";
import Link from "next/link";

export default function InfoIdPage({data}) {
    return (
        <div className="py-3 space-y-2">
            <h2 className="pb-6">{data.title}</h2>
            <div className={data?.gambar ? 'relative w-full h-[280px] rounded-xl overflow-hidden' : 'hidden'}>
                <Image src={data.gambar ? `https://api.formmi.tech/uploads/${data.gambar}` : 'https://api.formmi.tech/default.jpg'} fill style={{ objectFit: 'cover' }} alt="gambar" />
            </div>
            <div className="pt-8">
                <article className="quil-content text-[#242424]" dangerouslySetInnerHTML={{ __html: data?.konten }} />

                {data?.file ? (
                    <Link href={`https://api.formmi.tech/uploads/dokumen/${data?.file}`} style={{color: 'blue'}}>Dokument</Link>
                ) : ('')}
            </div>
        </div>
    )
}