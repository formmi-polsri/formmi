import Image from "next/image";
import Link from "next/link";

export default function Pagination({ page, totalPage, totalRows, limit, name, query, link}) {

    return (
        <div className='flex justify-between'>
            <div>
                Total: {totalRows + ' ' + name }
            </div>
            <div className={`flex ${totalPage === 1 ? '' : 'block'} space-x-2`}>
                <Link href={`${link}?search=${!query.search ? '' : query.search}&page=${!query.page ? 1 : parseInt(query.page) - 1}&limit=${limit}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${page === 1 ? 'hidden' : ''}`}>
                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                    </svg>
                </Link>
                <p className='px-3'>{page}</p>
                <Link href={`${link}?search=${!query.search ? '' : query.search}&page=${!query.page ? 2 : parseInt(query.page) + 1}&limit=${limit}`} >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${page === totalPage || page >= totalPage ? 'hidden' : ''}`}>
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}