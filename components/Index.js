import { signOut, useSession } from "next-auth/react"
import { ButtonLogOut } from './Button'
import { SignedInUser } from './SignedInUser'
import styles from './Index.module.css'


export function Index() {
    const { data: session } = useSession()

    return (
        <main className={styles.main}>
            <SignedInUser />

            <h1 className={styles.title}>Halo <b className={styles.userFullName}>{session.user.firstName} {session.user.lastName}</b>!</h1>
            <h1 className={styles.title}>Selamat datang di <b className={styles.productName}>Product Inventory</b>!</h1>
            <h2 className={styles.subtitle}>Manajemen produk jadi lebih mudah</h2>
            <p className={styles.description}>Silahkan pilih salah satu menu di bawah</p>

            <div className={styles.grid}>
                <a href="/cari" className={styles.card}>
                    <h3>Cari &rarr;</h3>
                    <p>Tampilkan daftar produk berdasarkan kata kunci.</p>
                </a>

                <a href="/simpan" className={styles.card}>
                    <h3>Simpan &rarr;</h3>
                    <p>Tambah produk <b>baru</b> ke penyimpanan.</p>
                </a>

                <a href="/ambil" className={styles.card}>
                    <h3>Ambil &rarr;</h3>
                    <p>Ambil produk dari penyimpanan.</p>
                </a>

                <a href="/tambah" className={styles.card}>
                    <h3>Tambah &rarr;</h3>
                    <p>Tambah produk ke penyimpanan.</p>
                </a>

                <a href="/historis" className={styles.card}>
                    <h3>Histori &rarr;</h3>
                    <p>Lihat jejak manajemen produk.</p>
                </a>

                <a href="/profil" className={styles.card}>
                    <h3>Profil &rarr;</h3>
                    <p>Atur profil pengguna aplikasi ini.</p>
                </a>
            </div>

            <div>
                <ButtonLogOut onClick={() => signOut({ callbackUrl: '/auth/signin' })} />
            </div>
        </main>
    )
}
