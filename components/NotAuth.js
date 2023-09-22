import { signIn } from "next-auth/react"
import styles from './NotAuth.module.css'
import { ButtonLogIn } from './Button'


export function NotAuth() {
    return (
        <main className={styles.main}>
            <h2 className={styles.subtitle}>Selamat Datang!</h2>
            <p className={styles.description}>Anda belum login. Klik tombol login di bawah untuk masuk.</p>
            <ButtonLogIn onClick={() => signIn()} />
        </main>
    )
}
