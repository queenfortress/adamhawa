import Head from 'next/head'
import { useSession } from "next-auth/react"
import { UserSignIn } from "../../components/UserSignIn"
import { Index } from '../../components/Index'


export default function SignIn() {
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
