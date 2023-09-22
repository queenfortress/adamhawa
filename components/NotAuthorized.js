import Link from 'next/link'
import styles from './NotAuthorized.module.css'
import { ButtonNavigasi } from './Button'


export function NotAuthorized() {
    return (
        <main className={styles.main}>
            <p className={styles.description}>Anda tidak punya akses ke halaman ini.</p>
            <Link href="/" as={`/`}>
                <ButtonNavigasi />
            </Link>
        </main>
    )
}
