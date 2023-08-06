import Link from "next/link";
import Hero from "./Hero";
import { NavbarClient } from "./Navbar";
import Sidebar, { SidebarAdmin } from "./Sidebar";

export function LayoutIndex({user, children}) {
	return (
		<div className={`w-full`} >
			<NavbarClient user={user} />
			<div className="relative w-full z-0">
				<Hero />
				<section className="w-full flex gap-8 px-16 py-9">
					<Sidebar />
					<main className="relative flex-1">
						{children}
					</main>
				</section>
			</div>
		</div>
	)
}

export function LayoutOption({ user, children }) {
	return (
		<div className={`w-full`} >
			<NavbarClient user={user} />
			<div className="relative w-full z-0">
				<section className="w-full flex gap-8 px-16 py-5">
					<Sidebar />
					<main className="flex-1">
						{children}
					</main>
				</section>
			</div>
		</div>
	)
}

export function LayoutAdmin({ user, children }) {
	return (
		<div className={`w-full min-h-screen`} >
			<NavbarClient user={user} />
			<div className="relative w-full z-0">
				<section className="w-full flex gap-6">
					<SidebarAdmin />
					<main className="flex-1 min-h-[calc(100vh-70px)] py-2">
						{children}
					</main>
				</section>
			</div>
		</div>
	)
}