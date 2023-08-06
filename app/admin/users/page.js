import api from "@/app/api"
import { cookies } from "next/headers"
import UserHeader from "./UserHeader"
import DataUsers from "./DataUsers"
import TambahUsers from "./TambahUsers"
import EditUsers from "./EditUsers"
import UserVerifikasi from "./UserVerifikasi"

async function getUsers(search, page, limit) {
    if (!page || !limit) {
        page = 1
        limit = 12
    }
    const token = cookies().get('token')?.value
    const users = await api.get(`/admin/users?q=${search}&page=${page}&limit=${limit}`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    return {
        users: users.data,
        token
    }
}

async function getUsersVerif(search, page, limit) {
    if (!page || !limit) {
        page = 1
        limit = 16
    }
    const token = cookies().get('token')?.value
    const verif = await api.get(`/admin/verifikasi`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    return verif.data

}

export const metadata = {
    title: 'Users Formmi - Forum Mahasiswa Manajemen Informatika Politeknik Negeri Sriwijaya'
}

export default async function Page({ searchParams }) {
    const { search, page, limit, tabs, user_id } = searchParams
    const { users, token } = await getUsers(!search ? "" : search, page, limit)
    const verif = await getUsersVerif(!search ? "" : search, page, limit)

    return (
        <section className={``}>
            <div style={{ fontSize: '.9em', opacity: '.6' }}>
                <span>Dashboard</span>
                <span> &#62; </span>
                <span>Users</span>
            </div>
            <div className="pr-8">
                <UserHeader tabs={tabs} />
                <div className={``}>
                    {!tabs || tabs === 'data-user' ? (
                        <DataUsers query={searchParams} token={token} users={users} />
                    ) : ''}

                    {tabs === 'tambah-user' ? (
                        <TambahUsers token={token} />
                    ) : ''}

                    {tabs === 'edit-users' ? (
                        <EditUsers token={token} userId={user_id} />
                    ) : ''}

                    {tabs === 'verifikasi-user' ? (
                        <UserVerifikasi token={token} verif={verif} />
                    ) : ''}
                </div>
            </div>
        </section>
    )
}