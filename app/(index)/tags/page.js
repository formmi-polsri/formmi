import api from "@/app/api";
import TagsPage from "./TagsPage";

async function getTags() {
    const payload = await api.get('/tags')
    return payload.data
}

export default async function Page({ searchParams }) {
    const tags = await getTags()
    
    return <TagsPage payload={tags} query={searchParams} />
}