"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import api from '@/app/api'

export default function DataUsers({ query, token, users }) {

    const router = useRouter()
    const [deleteMsg, setDeleteMsg] = useState(false)
    const [id, setId] = useState('')

    const handleDelete = async (id) => {
        await api.delete('/admin/users/' + id, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        router.refresh()
        setDeleteMsg(false)
    }

    const handleDeletePopup = (id) => {
        setDeleteMsg(true)
        setId(id)
    }


    return (
        <div>
            {deleteMsg ? (
                <div className={``}>
                    <div className={``} >
                        <div>
                            <p>Yakin akan menghapus data user?</p>
                        </div>
                        <div style={{ display: 'flex', gap: '24px' }} >
                            <button onClick={() => setDeleteMsg(false)} >Tidak</button>
                            <button onClick={() => handleDelete(id)} >Hapus</button>
                        </div>
                    </div>
                </div>
            ) : ''}
            <table className={`w-full text-sm text-left border-collapse`}>
                <thead className={``}>
                    <tr>
                        <th>NIM</th>
                        <th>Nama</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>alamat</th>
                        <th>Role</th>
                        <th style={{ textAlign: 'right' }}>Ativitas</th>
                    </tr>
                </thead>
                <tbody className={``}>
                    {users.data.map(user => {
                        return (
                            <tr key={user?.id}>
                                <td>{user?.nim}</td>
                                <td>{user?.first_name + " " + user?.last_name}</td>
                                <td>{user?.username}</td>
                                <td>{user?.email}</td>
                                <td>{user?.alamat ? user?.alamat : '-'}</td>
                                <td>{user?.role}</td>
                                <td style={{ display: 'flex', justifyContent: 'end', gap: '8px' }}>
                                    <Link href={{ pathname: '/admin/users', query: { tabs: 'edit-users', user_id: user?.id } }}>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px' }}>
                                                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                            </svg>
                                        </button>
                                    </Link>
                                    <button onClick={() => handleDeletePopup(user?.id)} >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px' }}>
                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {users?.data.length !== 0 ? (
                <div className={`flex justify-between py-4`}>
                    <div style={{ fontsize: '.9em' }}>Total : {users?.metadata.totalRows} users</div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {parseInt(users?.metadata.page) == 1 ? (
                            <button className={`opacity-25`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
                                    <path fillRule="evenodd" d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        ) : (
                            <Link href={{ pathname: '/admin/users', query: { ...query, 'page': users?.metadata.page - 1, 'limit': 12 } }}>
                                    <button className={`opacity-100`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
                                        <path fillRule="evenodd" d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </Link>
                        )}
                        <div>{users?.metadata?.page}</div>
                        {parseInt(users?.metadata.page) == parseInt(users?.metadata.totalPage) ? (
                            <button className={`opacity-25`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
                                    <path fillRule="evenodd" d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        ) : (
                            <Link href={{ pathname: '/admin/users', query: { ...query, 'page': users?.metadata.page + 1, 'limit': 12 } }}>
                                <button className={`opacity-100`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
                                        <path fillRule="evenodd" d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}