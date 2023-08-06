import api from "@/app/api";
import BlogsDetail from "./BlogsDetail";

async function getBlogs(id) {
    const payload = await api.get('/getBlogs/' + id)
    return payload.data
}

export async function generateMetadata({ params }) {
    return {
        title: `Blogs Formmi - ${params.slug}`
    }
}

export default async function Page({params}) {
    const blogs = await getBlogs(params?.id)

    return <BlogsDetail data={blogs?.data} author={blogs?.data.author} />
}