"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserHeader({ tabs }) {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [verif, setVerif] = useState('')

    const handleSubmitUsers = (e) => {
        e.preventDefault()
        if (search) {
            router.replace(`/admin/users?tabs=data-user&search=${search}`)
        }
    }

    const handleSubmitVerif = (e) => {
        e.preventDefault()
        if (verif) {
            router.replace(`/admin/users?tabs=verifikasi-user&search=${verif}`)
        }
    }

    const handleSearchUsers = (e) => {
        setSearch(e.target.value)
    }

    const handleSearchVerif = (e) => {
        setVerif(e.target.value)
    }

    return (
        <div className={`flex items-center pt-5`}>
            <div style={{ flex: '1 1' }}>
                {!tabs || tabs === 'data-user' || tabs === 'tambah-user' ? (
                    <form onSubmit={(e) => handleSubmitUsers(e)} >
                        <input
                            type="text"
                            className={`input w-full text-sm py-1`}
                            placeholder='Cari user berdasarkan nama, username atau nim...'
                            onChange={(e) => handleSearchUsers(e)}
                        />
                    </form>
                ) : ('')}
                {tabs === 'verifikasi-user' ? (
                    <form onSubmit={(e) => handleSubmitVerif(e)} >
                        <input
                            type="text"
                            className={`input w-full text-sm py-1`}
                            placeholder='Cari user berdasarkan nama, username atau nim...'
                            onChange={(e) => handleSearchVerif(e)}
                        />
                    </form>
                ) : ('')}

            </div>
            <div style={{ display: 'flex', justifyContent: 'end', gap: '16px', width: '140px' }}>
                <Link href={{ pathname: '/admin/users', query: { tabs: 'data-user' } }}>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5`}>
                            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                        </svg>
                    </button>
                </Link>
                <Link href={{ pathname: '/admin/users', query: { tabs: 'tambah-user' } }}>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5`}>
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                        </svg>
                    </button>
                </Link>
                <Link href={{ pathname: '/admin/users', query: { tabs: 'verifikasi-user' } }}>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5`}>
                            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                    </button>
                </Link>
            </div>
        </div>
    )
}