"use client"
import React, { useState } from "react";
import { Input } from "@/components/elements/Input";
import { useRouter } from "next/navigation";
import api from "@/app/api";

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
]


export default function RegisterPage() {

    const router = useRouter()
    const [values, setValues] = useState({
        first_name: '', last_name: '', nim: '', alamat: '',
        username: '', email: '', password: ''
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {
        setLoading(true)
        try {
            const data = {
                first_name: values.first_name,
                last_name: values.last_name,
                nim: values.nim,
                alamat: values.alamat,
                username: values.username,
                email: values.email,
                password: values.password
            }

            api.post('/auth/register', data)
                .then(res => {
                    setLoading(false)
                    router.push('/')
                })
                .catch(err => {
                    setLoading(false)
                })

        } catch (err) {
            setLoading(false)
        }
    } 

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <div className="relative w-full h-full py-28 space-y-8 overflow-y-scroll z-50">
            <h3 className="text-center text-white">Registrasi Formmi</h3>
            <div className="w-[440px] mx-auto p-8 bg-white rounded-xl">
                    {INPUTS.map((input, index) => (
                        <Input
                            key={index}
                            {...input} value={values[input.name]}
                            onChange={handleChange}
                        />
                    ))}
                    <button onClick={() => handleSubmit()} type="submit" className="btn-login mt-6">{loading ? 'Loading...' : 'Login'}</button>
            </div>
        </div>
    )
}