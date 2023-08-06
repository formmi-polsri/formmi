"use client"
import DiskusiCart from '@/components/elements/DiskusiCart'
import Pagination from '@/components/elements/Pagination'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function DiskusiPage({ data, metadata, query }) {

    const router = useRouter()
    const [search, setSearch] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        router.replace(`/diskusi?search=${search}`)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    return (
        <div className="relative w-full space-y-[22px]">
            <h4>Diskusi</h4>
            <div className='flex items-center gap-4'>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className='flex-1'
                >
                    <input
                        type="search"
                        className="input-search"
                        placeholder="Cari diskusi..."
                        onChange={(e) => handleSearch(e)}
                    />
                </form>
                <div className='w-[142px]'>
                    <Link href={'/diskusi/buat'}>
                        <button className='btn-create'>Buat Topik</button>
                    </Link>
                </div>
            </div>
            {data.length != 0 ? (
                <>
                <DiskusiCart data={data} />
                <Pagination 
                    page={metadata?.page}
                    totalPage={metadata.totalPage}
                    totalRows={metadata.totalRows}
                    limit={16}
                    name='Diskusi'
                    query={query}
                    link='/diskusi'
                />
                </>
            ) : (
                <div className='py-6 text-lg text-center bg-[#f1cfd8] rounded-lg'>
                    <p className='text-4xl mb-2'>🔍</p>
                    <p>Pencarian tidak ditemukan...</p>
                </div>
            )}
        </div>
    )
}