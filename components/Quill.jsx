"use client"

import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 

export default function Quill() {
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
    const [desk, setDesk] = useState('')

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                console.log(quill.root.innerHTML)
            });
        }
    }, [quill]);

    return (
        <div style={{ width: '100%', height: 260}}>
            <div ref={quillRef} />
        </div>
    );
};