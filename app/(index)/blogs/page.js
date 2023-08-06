import api from "@/app/api";
import BlogsPage from "./BlogsPage";

async function getBlogs() {
    const payload = await api.get('/getBlogs')
    return payload?.data
}

export const metadata = {
    title: 'Blogs Formmi - Forum Mahasiswa Manajemen Informatika Politeknik Negeri Sriwijaya'
}

export default async function Page({searchParams}) {
    const blogs = await getBlogs()

    return <BlogsPage 
        data={blogs?.data} 
        metadata={blogs?.metadata} 
        query={searchParams} 
    />
}