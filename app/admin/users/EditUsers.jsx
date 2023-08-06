"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/api'
import { Input } from '@/components/elements/Input'


const INPUTS = [
    {
        id: "first_name",
        name: "first_name",
        type: "text",
        placeholder: "Nama depan",
        label: "Nama Depan",
        htmlFor: "first_name"
    },
    {
        id: "last_name",
        name: "last_name",
        type: "text",
        placeholder: "Nama belakang",
        label: "Nama Belakang",
        htmlFor: "last_name"
    },
    {
        id: "nim",
        name: "nim",
        type: "text",
        placeholder: "Nomor induk mahasiswa",
        label: "Nomor Identitas",
        htmlFor: "nim"
    },
    {
        id: "alamat",
        name: "alamat",
        type: "text",
        placeholder: "Palembang",
        label: "Alamat",
        htmlFor: "alamat"
    },
    {
        id: "username",
        name: "username",
        type: "text",
        placeholder: "Username",
        label: "Username",
        htmlFor: "username"
    },
    {
        id: "email",
        name: "email",
        type: "email",
        placeholder: "example@gmail.com",
        label: "Email",
        htmlFor: "email"
    },
    {
        id: "password",
        name: "password",
        type: "password",
        placeholder: "*****",
        label: "Password",
        htmlFor: "password"
    },
    {
        id: "role",
        name: "role",
        type: "text",
        placeholder: "mahasiswa/dosen/admin",
        label: "Role",
        htmlFor: "role"
    },
]

export default function EditUsers({ token, userId }) {

    const router = useRouter()

    const [values, setValues] = useState({
        first_name: '', last_name: '', nim: '', alamat: '',
        username: '', email: '', password: '', role: ''
    })
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        function getUsersById() {
            api.get('/admin/users/' + userId, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": "Bearer " + token
                }
            })
                .then(res => {
                    setValues({
                        first_name: res.data.data.first_name ? res.data.data.first_name : '',
                        last_name: res.data.data.last_name ? res.data.data.last_name : '',
                        nim: res.data.data.nim ? res.data.data.nim : '',
                        alamat: res.data.data.alamat ? res.data.data.alamat : '',
                        username: res.data.data.username ? res.data.data.username : '',
                        email: res.data.data.email ? res.data.data.email : '',
                        password: '',
                        role: res.data.data.role ? res.data.data.role : '',
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }

        getUsersById()
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        try {
            await api.put('/admin/users/' + userId, values, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": "Bearer " + token
                }
            })
            setLoading(false)
            router.refresh()
            router.push('/admin/users?tabs=data-user')
        } catch (e) {
            setLoading(false)
            console.log(e);
        }
    }


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <div className={``}>
            <div className={``} >
                <h2>Edit Data Users</h2>
                {INPUTS.map((input, i) => (
                    <Input
                        key={i}
                        {...input} value={values[input.name]}
                        onChange={handleChange}
                    />
                ))}
                <button onClick={() => handleSubmit()} className="btn-login" style={{ marginTop: '12px', fontWeight: '600' }} >{loading ? 'Loading...' : 'Simpan Perubahan'}</button>
            </div>
        </div>
    )
}