"use client"
import React, { useState } from "react"
import { Input } from "@/components/elements/Input"
import Link from "next/link"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import api from "@/app/api"

const INPUTS = [
    {
        id: "email",
        name: "email",
        type: "email",
        placeholder: "example@gmail.com",
        label: "Email",
        htmlFor: "email"
    },
    {
        id: "passwordLogin",
        name: "password",
        type: "password",
        placeholder: "Password",
        label: "Password",
        htmlFor: "passwordLogin"
    },
]

export default function LoginPage() {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        email: '', 
        password: '',
        error: false, 
        msg: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault(e)
        setLoading(true)

        const data = {
            email: values.email,
            password: values.password,
        }

        api.post('/auth/login', data)
            .then(res => {
                Cookies.set('token', res.data.token, { expires: 7, path: '/' })
                setValues({ ...values, error: false, msg: '' })
                setLoading(false)
                
                if (res.data.data.role === 'admin') {
                    router.push('/admin/dashboard')
                } else {
                    router.push('/')
                }
            })
            .catch(err => {
                if (err.response) {
                    setValues({ ...values, error: true, msg: err.response.data.message})
                }
                setLoading(false)
            })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <div className="relative inset-0 flex justify-center items-center w-full h-full">    
            <div className='z-10'>
                <div className='w-[340px] mb-4 mt-10 px-7 py-8 space-y-2 bg-white rounded-lg'>
                    <h4>Login Formmi</h4>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        {INPUTS.map((input, index) => (
                            <Input
                                key={index}
                                {...input} value={values[input.name]}
                                onChange={handleChange}
                            />
                        ))}
                        <button type="submit" className="btn-login">{loading ? 'Loading...' : 'Login'}</button>
                    </form>
                    <div className={`w-full py-4 text-md text-center ${values.error ? 'block' : 'hidden'} bg-[#FBA1B7] rounded-lg`}>{'⚠️ ' + values.msg}</div>
                </div>
                <div className='flex items-center justify-center w-[340px] py-5 text-center bg-white rounded-lg'>
                    Baru di Formmi? <Link href="/auth/registrasi"><span className="text-primary-blue">Buat akun sekarang</span></Link>
                </div>
            </div>
        </div>
    )
}