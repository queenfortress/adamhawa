import { useSession } from "next-auth/react"
import styles from './SignedInUser.module.css'


export function SignedInUser() {
    const { data: session } = useSession()

    return (
        <p className={styles.loggedInUser}>Masuk sebagai <b>{session.user.username}</b></p>
    )
}