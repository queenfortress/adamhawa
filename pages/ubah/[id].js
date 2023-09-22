import Head from 'next/head'
import { useSession } from "next-auth/react"
import { Ubah } from '../../components/Ubah'
import { UserSignIn } from '../../components/UserSignIn'


export default function ProductInventoryUbah() {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        return (
            <div className="container">
                <Head>
                    <title>Ubah</title>
                </Head>

                <Ubah />
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
