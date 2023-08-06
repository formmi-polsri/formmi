"use client"
import React, { useState } from 'react'
import {useRouter} from 'next/navigation'
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

export default function TambahUsers({token}) {

	const router = useRouter()

	const [values, setValues] = useState({
	    first_name: '', last_name: '', nim: '', alamat: '',
	    username: '', email: '', password: '', role: ''
	})
	const [loading, setLoading] = useState(false)

	const handleSubmit = async () => {
		setLoading(true)
		try {
			const data = {
			    first_name: values.first_name, 
			    last_name: values.last_name, 
			    nim: values.nim, 
			    alamat: values.alamat,
			    username: values.username, 
			    email: values.email, 
			    password: values.password,
			    role: values.role
			}
			await api.post('/admin/users', data, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": "Bearer " + token
                }
            })
            setLoading(false)
            router.refresh()
            router.push('/admin/users')
		} catch(e) {
			setLoading(false)
			console.log(e);
		}
	}

	const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

	return (
		<div className={`w-full`}>
			{/* <div className={``} > */}
				<h3>Tambah Users</h3>
				{INPUTS.map((input, i) => (
					<Input
					    key={i}
					    {...input} value={values[input.name]}
					    onChange={handleChange}
					/>
				))}
				<button onClick={() => handleSubmit()} className="btn-login" style={{marginTop:'12px'}} >{loading ? 'Loading...' : 'Simpan'}</button>
			{/* </div> */}
		</div>
	)
}