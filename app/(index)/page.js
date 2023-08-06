import api from "../api";
import HomePage from "./HomePage";

export async function getDiskusi() {
  const payload = await api.get(`/getDiskusi`)
  return payload.data
}

export const metadata = {
  title: 'Formmi - Forum Mahasiswa Manajemen Informatika Politeknik Negeri Sriwijaya'
}

export default async function Home({ searchParams }) {
  const payload = await getDiskusi()

  return (
    <HomePage 
      data={payload.data} 
      metadata={payload.metadata} 
      query={searchParams}
    />
  )
}
