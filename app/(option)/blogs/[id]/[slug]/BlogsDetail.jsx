import TimeAgo from "@/lib/timeAgo";
import Image from "next/image";

export default function BlogsDetail({data, author}) {
    return (
        <div className="py-6 space-y-2">
            <h2>{data.title}</h2>
            <div className={`flex items-center gap-3 py-6`}>
                <div className={`relative w-10 h-10 rounded-full overflow-hidden`}>
                    <Image src={'/profile.jpg'} fill style={{ objectFit: 'cover' }} alt="profile" />
                </div>
                <div>
                    <p className="text-base">{author?.username}</p>
                    <p className={`text-xs text-font-gray`}>Dibuat {TimeAgo(Date.now(), data?.created_at)}</p>
                </div>
            </div>
            <div className={data?.img ? 'relative w-full h-[320px] rounded-xl overflow-hidden' : 'hidden'}>
                <Image src={data.img ? `https://api.formmi.tech/uploads/blogs/${data.img}` : 'https://api.formmi.tech/default.jpg'} fill style={{ objectFit: 'cover' }} alt="gambar" />
            </div>
            <div className="pt-8">
                <article className="quil-content" dangerouslySetInnerHTML={{ __html: data?.konten }} />
            </div>
        </div>
    )
}