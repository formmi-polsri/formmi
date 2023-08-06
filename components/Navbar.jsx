"use client"
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NavbarClient({user}) {
	const [logout, setLogout] = useState(false)
	const router = useRouter()

	const handleLogout = () => {
		Cookies.remove('token')
		router.replace('/auth/login')
		router.refresh()
	}

	return (
		<nav className={`sticky top-0 left-0 right-0 flex items-center justify-center h-[70px] px-16 bg-white drop-shadow z-50`}>
			<div className={`max-w-[1250px] w-full flex justify-between `} >
				<button>
					<Image src={`/logo-formmi.png`} width={106} height={32} alt="logo formmi" />
				</button>
				<div className={`flex items-center gap-5`}>
					<div>
						<Image src={`/icon/icon-bell.svg`} width={17} height={21} alt="icon" />
					</div>
					{user ? (
						<div className={`relative flex gap-2 items-center`}>
							<span className="text-md font-semibold text-[var(--font-gray)]">{user?.username}</span>
							<div onClick={() => setLogout(!logout)} className={`relative w-7 h-7 rounded-full overflow-hidden cursor-pointer`}>
								<Image src={'/profile.jpg'} fill style={{ objectFit: 'cover' }} alt="profile" />
							</div>
							<div className={`absolute ${!logout ? 'hidden' : ''} right-0 top-[190%] w-[120px] py-3 px-2 bg-primary-orange border border-[#ccc] bg-white rounded-lg`}>
								<button className="btn-cancel py-2 text-sm" onClick={() => handleLogout()}>Logout</button>
							</div>
						</div>
					) : (
						<div className={`flex gap-2 w-[180px] text-white text-center font-semibold `}>
							<Link href={'/auth/login'} style={{flex: 1}}>
								<button className="w-full pt-1 pb-[6px] border border-[#000] text-[#000] rounded-lg">Login</button>
							</Link>
							<Link href={'/auth/registrasi'} style={{flex: 1}}>
								<button className="w-full pt-1 pb-[6px] border bg-primary-green rounded-lg">Register</button>
							</Link>
						</div>
					)}
					
				</div>
			</div>
		</nav>
	)
}