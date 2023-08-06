'use client'
import api from "@/app/api";
import TimeAgo from "@/lib/timeAgo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DiskusiPageId({user, data, token}) {

    const [koment, setKoment] = useState(false)
    const [loading, setLoading] = useState(false)
    const [konten, setKonten] = useState('')

    const router = useRouter()

    const handleSubmitKoment = async () => {
        try {
            setLoading(true)
            if (!user) {
                router.push('/auth/login')
            } else {
                const payload = {
                    diskusi_id: data?.id,
                    user_id: user?.id,
                    konten
                }

                await api.post('/postKoment', payload, {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: "Bearer " + token
                    }
                })
                setLoading(false)
                setKoment(false)
                setKonten('')
                router.refresh()
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setKonten(e.target.value)
    }

    return (
        <div className="space-y-4 pb-4 border-b">
            <h3 className="pt-3">{data?.title}</h3>
            <p className="pb-3 text-sm text-font-gray">Dibuat {TimeAgo(Date.now(), parseInt(data?.created_at))}</p>
            <div className="w-full px-7 py-8 bg-primary-gray rounded-lg">
                <article className="quil-content" dangerouslySetInnerHTML={{ __html: data?.desk }} />
            </div>
            <div className="flex items-end justify-between py-4">
                
                <button
                    onClick={() => setKoment(true)}
                    className={`flex items-center py-1 text-xs`}
                >
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '23px', fill: 'green', marginTop: '6px' }}>
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <p className="mt-2 ml-2">Tanggapi diskusi</p>
                </button>
                <div className={`flex gap-2 items-center`}>
                    <div>
                        <p className="text-base font-mono font-semibold text-right text-[var(--primary-blue)]">{data?.author.username}</p>
                        <p className="text-xs font-semibold text-right text-[var(--font-gray)]">{data?.author.role}</p>
                    </div>
                    <div className={`relative w-9 h-9 rounded-full overflow-hidden`}>
                        <Image src={data?.author.foto ? data?.author.foto : '/profile.jpg'} fill style={{ objectFit: 'cover' }} alt="profile" />
                    </div>
                </div>
            </div>
            <div className={!koment ? `hidden` : `w-full`}>
                <textarea
                    required
                    placeholder="Tulis komentar..."
                    className={`input w-full h-24`}
                    onChange={(e) => handleChange(e)}
                />
                <div className={`flex justify-end -mt-3 space-x-2`}>
                    <button
                        onClick={() => setKoment(false)}
                        className={`btn-cancel w-auto py-1 px-5`}
                    >
                        Batal
                    </button>
                    <button
                        onClick={() => handleSubmitKoment()}
                        className={`btn-login w-auto py-1 px-5`}
                    >
                        {loading ? "Loading..." : "Kirim"}
                    </button>
                </div>
            </div>
        </div>
    )
}