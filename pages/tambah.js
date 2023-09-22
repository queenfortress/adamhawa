import Head from 'next/head'
import { useSession } from "next-auth/react"
import { UbahStok } from '../components/UbahStok'
import { UserSignIn } from '../components/UserSignIn'


export default function ProductInventoryTambah() {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        return (
            <div className="container">
                <Head>
                    <title>Tambah</title>
                </Head>

                <UbahStok 
                    tipeUbah='Penambahan'
                    subjudul='Penambahan Produk Lama'
                    deskripsi='Silahkan masukan kode barang & jumlah penambahan' />
            </div>
        )
    }

    return (
        <div className="container">
            <Head>
                <title>Masuk</title>
            </Head>
            
            <UserSignIn />
        </div>
    )
}
