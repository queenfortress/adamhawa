import styles from './Button.module.css'


export function ButtonSimpan() {
    return (
        <button type="submit" className={styles.simpan}>Simpan</button>
    )
}

export function ButtonCari() {
    return (
        <button type="submit" className={styles.cari}>Cari</button>
    )
}

export function ButtonUbah({ onClick }) {
    return (
        <button type="submit" className={styles.ubah} onClick={onClick}>Ubah</button>
    )
}

export function ButtonHapus({ onClick }) {
    return (
        <button type="submit" className={styles.hapus} onClick={onClick}>Hapus</button>
    )
}

export function ButtonLogIn({ onClick }) {
    return (
        <button type="submit" className={styles.simpan} onClick={onClick}>Masuk</button>
    )
}

export function ButtonLogOut({ onClick }) {
    return (
        <button type="submit" className={styles.simpan} onClick={onClick}>Keluar</button>
    )
}

export function ButtonSignUp({ onClick }) {
    return (
        <button type="submit" className={styles.simpan} onClick={onClick}>Daftar</button>
    )
}

export function ButtonNavigasi() {
    return (
        <button type="button" className={styles.navigasi}>Ke Halaman Utama</button>
    )
}
