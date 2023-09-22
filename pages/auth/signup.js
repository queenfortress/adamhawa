import Head from 'next/head'
import { useSession } from "next-auth/react"
import { UserSignUp } from "../../components/UserSignUp"
import { Index } from '../../components/Index'


export default function SignUp() {
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
                <title>Daftar</title>
            </Head>
            
            <UserSignUp />
        </div>
    )
}
