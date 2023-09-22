import Head from 'next/head'
import { useSession } from "next-auth/react"
import { UbahProfilUser } from '../../../components/UbahProfilUser'
import { UserSignIn } from '../../../components/UserSignIn'
import { NotAuthorized } from '../../../components/NotAuthorized'


export default function ProductInventoryUbahProfil() {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        if (session.user.userRole === 'admin' || session.user.userRole === 'superadmin') {
            return (
                <div className="container">
                    <Head>
                        <title>Ubah Profil</title>
                    </Head>

                    <UbahProfilUser />
                </div>
            )
        } else {
            return (
                <div className="container">
                    <Head>
                        <title>Tidak Punya Akses</title>
                    </Head>
                    
                    <NotAuthorized />
                </div>
            )
        }
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
