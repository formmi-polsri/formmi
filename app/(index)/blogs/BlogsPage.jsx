import Pagination from "@/components/elements/Pagination";
import Image from "next/image";
import Link from "next/link";

export default function BlogsPage({data, metadata, query}) {
    return (
        <div className="relative space-y-[22px]">
            <div className="flex justify-between items-center">
                <h4>Blogs</h4>
                <Link href={'/blogs/buat'}>
                    <button className='btn-create'>Buat Blogs</button>
                </Link>
            </div>
            <div className="relative grid grid-cols-2 gap-6 pb-8">
                {data.map(blog => (
                    <figure key={blog?.id} className="relative w-full">
                        <div className="relative w-full aspect-video mb-4 rounded-xl overflow-hidden">
                            <Image src={blog.img ? `https://api.formmi.tech/uploads/blogs/${blog.img}` : 'https://api.formmi.tech/default.jpg'} fill style={{objectFit: 'cover'}} alt="gambar" />
                        </div>
                        <figcaption className="text-2xl font-semibold line-clamp-2">
                            <Link href={`/blogs/${blog.id}/${blog.slug}`}> {blog?.title ? blog?.title : 'Hello World!'}</Link>
                        </figcaption>
                        <p className="font-mono font-bold text-primary-blue mt-2">{blog?.author[0].username}</p>
                    </figure>
                ))}
            </div>
            <Pagination
                page={metadata?.page}
                totalPage={metadata.totalPage}
                totalRows={metadata.totalRows}
                limit={12}
                name='Blogs'
                query={query}
                link='/blogs'
            />
        </div>
    )
}