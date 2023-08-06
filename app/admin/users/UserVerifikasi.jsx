"use client"

import api from "@/app/api"
import { useRouter } from "next/navigation"

export default function UserVerifikasi({token, verif}) {
    const router = useRouter()

    const handleVerifikasi = (id) => {
        api.post('/admin/verifikasi/' + id, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                console.log(res.data)
                router.refresh()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <table className={`w-full text-sm text-left border-collapse`}>
                <thead className={``}>
                    <tr>
                        <th>NIM</th>
                        <th>Nama</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th style={{ textAlign: 'right' }}>Ativitas</th>
                    </tr>
                </thead>
                <tbody className={``}>
                    {verif.data.filter(city => city?.id === "0").map(user => {
                        return (
                            <tr key={user?.id}>
                                <td>{user?.nim}</td>
                                <td>{user?.first_name + " " + user?.last_name}</td>
                                <td>{user?.username}</td>
                                <td>{user?.email}</td>
                                <td>{user?.role}</td>
                                <td style={{ display: 'flex', justifyContent: 'end', gap: '8px' }}>
                                    <button onClick={() => handleVerifikasi(user?.id)}className={`btn-login w-auto px-2 py-1`}  >
                                        Terima
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}