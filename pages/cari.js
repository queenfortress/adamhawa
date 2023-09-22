import Head from 'next/head'
import { useSession } from "next-auth/react"
import { Cari } from '../components/Cari'
import { UserSignIn } from '../components/UserSignIn'


export default function ProductInventoryCari() {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        return (
            <div className="container">
                <Head>
                    <title>Cari</title>
                </Head>

                <Cari />
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
