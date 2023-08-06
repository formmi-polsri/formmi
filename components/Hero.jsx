import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative flex items-center w-full h-[360px] px-16 bg-gray-400">
            <div className="relative pb-12 space-y-4 text-[var(--font-white)] z-10">
                <h2>Forum Mahasiwa Manajemen Informatika <br/>
                    Politeknik Negeri Sriwijaya</h2>
                <p className="text-lg leading-7">Tempat untuk berbagi informasi dan kolaborasi mahasiswa <br />juruasan Informatika Politeknik Negeri Sriwijaya</p>
            </div>
            <Image src={`/hero-banner.png`} fill style={{ objectFit: 'cover', zIndex: '0' }} priority alt="herro banner" />
        </section>
    )
}