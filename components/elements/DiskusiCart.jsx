import TimeAgo from "@/lib/timeAgo"
import Image from "next/image"
import Link from "next/link"

export default function DiskusiCart({data}) {
    return (
        <div className='relative w-full'>
            {data.map(data => (
                <Link key={data.id}  href={`/diskusi/${data.id}/${data.slug}`} >
                <div 
                    className="group flex gap-5 mb-3 w-full py-6 px-7 text-primary-blue bg-primary-gray hover:bg-primary-blue transition-all rounded-lg"
                >
                    <div 
                        className={`flex flex-col justify-center items-center w-[90px] h-[90px] text-white ${data.terjawab === "0" ? 'bg-primary-orange' : 'bg-primary-green'} rounded-lg`}
                    >
                        <h2>{data.total_komentar}</h2>
                        <p>Balasan</p>
                    </div>
                    <div className="flex-1">
                        <div className="w-full h-10 pt-1 mb-[2px] group-hover:text-white line-clamp-1">
                            <p className="text-2xl font-medium">{data.title}</p>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="">
                                <p className="text-font-gray text-xs font-medium">Aktifitas terakhir {TimeAgo(Date.now(), data.updated_at)}</p>
                                {data.tags.map(tag => (
                                    <span key={tag.id} className="tags mr-1 px-2">{tag.name}</span>
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="text-right group-hover:text-white font-mono text-[14px] font-bold">{data.author.username}</p>
                                    <p className="text-xs text-right text-font-gray">{data.author.role}</p>
                                </div>
                                <div className={`relative w-8 h-8 overflow-hidden rounded-full`}>
                                    <Image src={!data.author.foto ? '/profile.jpg' : data.author.foto} fill style={{objectFit: 'cover'}} alt="profile" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    )
}