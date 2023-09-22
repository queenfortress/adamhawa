import Head from 'next/head'
import { useSession } from "next-auth/react"
import { UbahStok } from '../components/UbahStok'
import { UserSignIn } from '../components/UserSignIn'


export default function ProductInventoryAmbil() {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        return (
            <div className="container">
                <Head>
                    <title>Ambil</title>
                </Head>

                <UbahStok
                    tipeUbah='Pengambilan'
                    subjudul='Pengambilan Produk Lama'
                    deskripsi='Silahkan masukan kode barang & jumlah pengambilan' />
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
