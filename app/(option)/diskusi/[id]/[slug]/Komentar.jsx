'use client'
import React, { useEffect, useState } from "react";
import TimeAgo from "@/lib/timeAgo";
import Image from "next/image";
import api from "@/app/api";
import { useRouter } from "next/navigation";
import { useQuill } from "react-quilljs";
import 'quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
        ['link', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code',
    'link', 'code-block',
    'list', 'bullet', 'indent',
    'clean'
]


export default function Komentar({user, diskusi_id, koment, token}) {
    const { quill, quillRef } = useQuill({ modules, formats })
    const [values, setValues] = useState('')
    const [reply, setReply] = useState('')
    const [balas, setBalas] = useState(0)
    const [loading, setLoading] = useState(false)

    const router = useRouter()


    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setValues(quill.root.innerHTML)
            });
        }
    }, [quill]);

    const handleBalas = (id) => {
        setBalas(id)
    }

    const handleBatal = () => {
        setBalas(0)
    }

    const handleChangeBalas = (e) => {
        setReply(e.target.value)
    }

    const handleSubmitKomen = async () => {
        try {
            setLoading(true)
            if (!user) {
                router.push('/auth/login')
            } else {
                const payload = {
                    diskusi_id,
                    user_id: user.id,
                    konten: values,
                }

                await api.post('/postKoment', payload, {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: "Bearer " + token
                    }
                })

                setLoading(false)
                setBalas(0)
                router.refresh()
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const handleSubmitReply = async (id) => {
        try {
            setLoading(true)
            if (!user) {
                router.push('/auth/login')
            } else {
                const data = {
                    diskusi_id,
                    user_id: user?.id,
                    parent_id: id,
                    konten: reply,
                }

                await api.post('/postKoment', data, {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: "Bearer " + token
                    }
                })
                setLoading(false)
                setBalas(0)
                setReply('')
                router.refresh()
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <div className="py-6">
            {koment?.data.map(koment => (
                <div key={koment?.id} className={`pb-5`} >
                    <div className={`flex gap-3 items-center mb-2`}>
                        <div className={`relative w-8 h-8`}>
                            <Image src={'/profile.jpg'} fill style={{objectFit: 'cover'}} alt="profile" />
                        </div>
                        <div>
                            <p className="font-mono text-sm text-primary-blue font-bold">{koment?.username}</p>
                            <p className={`-mt-1 text-sm font-semibold text-font-gray`}>{koment?.role} | {TimeAgo(Date.now(), koment?.created_at)} </p>
                        </div>
                    </div>
                    <div className={`pl-[44px]`}>
                        <article className="quil-content" dangerouslySetInnerHTML={{ __html: koment?.konten }} />
                    </div>
                    
                    <div className={balas == 0 || parseInt(koment?.id) != balas ? `hidden` : `pl-[44px] py-2`}>
                        <textarea
                            required
                            placeholder="Tulis balasan komentar..."
                            className={`input w-full`}
                            onChange={(e) => handleChangeBalas(e)}
                        />
                        <div className={`-mt-5 text-xs`}>
                            <button
                                onClick={() => handleBatal()}
                                className={`btn-cancel w-auto py-1 px-3`}
                            >
                                Batal
                            </button>
                            {reply ? (
                                <button
                                    onClick={() => handleSubmitReply(koment?.id)}
                                    className={`btn-login w-auto ml-2 py-1 px-3`}
                                >
                                    {loading ? 'Loading...' : 'kirim'}
                                </button>
                            ) : (
                                <button
                                    className={`btn-login w-auto ml-2 py-1 px-3`}
                                >
                                    {loading ? 'Loading...' : 'kirim'}
                                </button>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => handleBalas(koment?.id)}
                        className={balas == 0 || parseInt(koment?.id) != balas ? `flex items-center py-1 pl-[44px] text-xs` : `hidden`}
                    >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '23px', fill: 'green', marginTop: '6px' }}>
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="mt-2 ml-2">Ballas Komentar</p>
                    </button>
                   
                        {koment?.reply.length === 0 ? '' : (
                    <div className={`pl-[54px] pt-3 border-l border-l-[#ccc] border-dotted`}>
                            {koment?.reply.map(reply => (
                                <div key={reply?.id}>
                                    <div className={`flex items-center gap-2`}>
                                        <div className={`relative w-7 h-7`}>
                                            <Image src={'/profile.jpg'} fill style={{ objectFit: 'cover' }} alt="profile" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold">{reply?.username}</p>
                                            <p className={`text-xs text-font-gray`}>Dibalas {TimeAgo(Date.now(), reply?.created_at)}</p>
                                        </div>
                                    </div>
                                    <div className={`mt-1`}>{reply?.konten}</div>
                                </div>
                            ))}
                    </div> 
                        )}
                </div>
            ))}

            <div style={{ width: '100%', height: 200 }}>
                <label className='mb-2 block'>Komentar</label>
                <div ref={quillRef} />
                {!values ? (
                    <button className='relative btn-login w-auto px-6 opacity-40 cursor-not-allowed'>{loading ? 'Loading...' : 'Simpan'}</button>

                ) : (
                    <button onClick={() => handleSubmitKomen()} className='relative btn-login w-auto px-6'>{loading ? 'Loading...' : 'Simpan'}</button>
                )}
            </div>
        </div>
    )
}