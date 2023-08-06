"use client"
import DiskusiCart from '@/components/elements/DiskusiCart'
import Pagination from '@/components/elements/Pagination'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function HomePage({ data, metadata, query }) {

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
            <DiskusiCart data={data} />
            {/* <div className='flex justify-between'>
                <div>
                    Total: {metadata.totalRows} Diskusi
                </div>
                <div className={`flex ${metadata.totalPage === 1 ? 'hidden' : 'block'} space-x-2`}>
                    <Link href={`/diskusi?page=1&limit=14`} style={{transform: 'rotate(180deg)', display: metadata.page === 1 ? 'none' : 'block'}}>
                        <Image src={'/icon/icon-pagination.svg'} width={24} height={24} alt='icon' />
                    </Link>
                    <p className='px-3'>{metadata.page}</p>
                    <Link href={`/diskusi?search=&page=2&limit=14`}>
                        <Image src={'/icon/icon-pagination.svg'} width={24} height={24} alt='icon' />
                    </Link>
                </div>
            </div> */}
            <Pagination
                page={metadata?.page}
                totalPage={metadata.totalPage}
                totalRows={metadata.totalRows}
                limit={16}
                name='Diskusi'
                query={query}
                link={'/diskusi'}
            />
        </div>  
    )
}