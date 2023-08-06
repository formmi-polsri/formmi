"use client"

import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { Input } from '@/components/elements/Input';
import TagsInput from '@/components/elements/TagsInput';
import api from '@/app/api';
import { useRouter } from 'next/navigation';

export default function BuatPage({user, token}) {
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

    const { quill, quillRef } = useQuill({ modules, formats })
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([])
    const [desk, setDesk] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const input = {
        id: "title",
        name: "title",
        type: "text",
        placeholder: "Judul topik diskusi",
        label: "Judul Diskusi",
        htmlFor: "title"
    }

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setDesk(quill.root.innerHTML)
            });
        }
    }, [quill]);

    const handleSubmit = () => {
        setLoading(true)
        const data = {
            user_id: parseInt(user?.id), 
            title, tags, desk
        }
        api.post('/postDiskusi', data, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(res => {
                setLoading(false)
                router.push('/diskusi')
            })
            .catch(err => {
                setLoading(false)
            })
    }

    const handleChange = (e) => {
        setTitle( e.target.value )
    }

    const handleTagsChange = (e) => {
        if (e.keyCode == 13 && e.target.value !== '' && e.target.value !== ' ' && e.target.value !== '  ') {
            setTags([
                ...tags, {
                    id: e.target.value,
                    name: e.target.value
                }]
            )
            e.target.value = ''
        } else if (e.keyCode == 8 && !e.target.value) {
            setTags([
                ...tags,
                tags.filter(tag => tag.id !== tags[tags.length - 1]?.id)
            ])
        }
    }

    const removeTags = indexRemove => {
        setTags(
            tags.filter((tag) => tag.id !== indexRemove)
        )
    }
    return (
        <div className='space-y-1'>
            <Input 
                {...input} value={title}
                onChange={handleChange}
            />

            <TagsInput 
                tags={tags}
                onClick={removeTags}
                onKeyUp={handleTagsChange} 
            />

            <div style={{ width: '100%', height: 200}}>
                <label className='mb-2 block'>Komentar</label>
                <div ref={quillRef} />
                {!title || !tags.length || !desk ? (
                    <button className='relative btn-login w-auto px-6 opacity-40 cursor-not-allowed'>{loading ? 'Loading...' : 'Simpan'}</button>

                ) : (
                    <button onClick={() => handleSubmit()} className='relative btn-login w-auto px-6'>{loading ? 'Loading...' : 'Simpan'}</button>
                )}
            </div>
        </div>
    );
};