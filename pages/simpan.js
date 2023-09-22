import Head from 'next/head'
import { useSession } from "next-auth/react"
import { Simpan } from '../components/Simpan'
import { UserSignIn } from '../components/UserSignIn'


export default function ProductInventorySimpan() {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        return (
            <div className="container">
                <Head>
                    <title>Simpan</title>
                </Head>

                <Simpan />
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
