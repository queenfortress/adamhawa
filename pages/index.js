import Head from 'next/head'
import { useSession } from "next-auth/react"
import { Index } from '../components/Index'
import { UserSignIn } from '../components/UserSignIn'


export default function ProductInventory() {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        return (
            <div className="container">
                <Head>
                    <title>Product Inventory</title>
                </Head>
                
                <Index />
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
