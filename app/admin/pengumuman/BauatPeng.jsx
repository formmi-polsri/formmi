"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import 'quill/dist/quill.snow.css';
import { useQuill } from "react-quilljs"
import api from "@/app/api";

export default function BuatPeng({token}) {

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

    const router = useRouter()
    const { quill, quillRef } = useQuill({ modules, formats })
    const [title, setTitle] = useState('')
    const [konten, setKonten] = useState('')
    const [gambar, setGambar] = useState(null)
    const [file, setFile] = useState(null)
    const [msg, setMsg] = useState({
        status: false, isError: false, message: ''
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setKonten(quill.root.innerHTML)
            });
        }
    }, [quill]);

    const handleSubmit = () => {
        setLoading(true)
        setMsg({ status: false, isError: false, message: '' })

        let formData = new FormData()
        formData.append("title", title)
        formData.append("konten", konten)
        formData.append("gambar", gambar)
        formData.append("file", file)

        api.post('/admin/postPengumuman', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + token
            }
        })
            .then(res => {
                setLoading(false)
                setMsg({ ...msg, status: true, message: res?.data.message })
                router.push('/admin/dashboard')
            })
            .catch(err => {
                setLoading(false)
                setMsg({ ...msg, status: true, isError: true, message: err.response.data.message })
            })
    }

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleGambar = (e) => {
        setGambar(e.target.files[0])
    }

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    return (
        <div className="py-5 pr-8">
            <label htmlFor="title" className='mb-2 block'>Judul</label>
            <input
                type="text"
                id='title'
                name='title'
                placeholder='Judul blogs...'
                onChange={(e) => handleTitle(e)}
                className='input w-full' />

            <label htmlFor="gambar" className='mb-2 block'>Gambar</label>
            <input
                type="file"
                id='gambar'
                name='gambar'
                onChange={(e) => handleGambar(e)}
                className='input w-full'
            />
            <label htmlFor="file" className='mb-2 block'>Dokumen</label>
            <input
                type="file"
                id='file'
                name='file'
                onChange={(e) => handleFile(e)}
                className='input w-full'
            />

            <div style={{ width: '100%', height: '100%', minHeight: '100px' }}>
                <label className='mb-2 block'>Konten</label>
                <div ref={quillRef} />
                {!konten ? (
                    <button className='relative btn-login w-auto px-6 opacity-40 cursor-not-allowed'>{loading ? 'Loading...' : 'Simpan'}</button>

                ) : (
                    <button onClick={() => handleSubmit()} className='relative btn-login w-auto px-6'>{loading ? 'Loading...' : 'Simpan'}</button>
                )}
            </div>
        </div>
    )
}