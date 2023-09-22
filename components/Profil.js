import useSWR from 'swr'
import { Table } from './TableProfil'
import { SignedInUser } from './SignedInUser'
import styles from './Profil.module.css'
import { fetcherGet } from '../utils/fetchers'
import ClipLoader from "react-spinners/ClipLoader"


function TabelProfil({ daftarProfil, totalRecords }) {
    return (
        <>
            <div className={styles.statsProfil}>
                <p><b>Total pengguna:</b> {totalRecords}</p>
            </div>

            <div className={styles.deskripsiProfil}>
                <p>Info beberapa pengguna tidak dapat ditampilkan karena Anda tidak punya otoritas.</p>
            </div>

            <Table 
                data={daftarProfil} 
                rowsPerPage={30} />
        </>
    )
}

function DaftarProfil() {
    const productEndpoint = '/api/userProfiles'

    const { data, error, isLoading, isValidating } = useSWR(
        productEndpoint, 
        fetcherGet,
        {
            revalidateOnFocus: false
        }
    )

    if (error) return <div>{error.message}</div>
    if (isLoading) return (
        <div>
            <ClipLoader
                loading={isLoading}
                aria-label="Loading Spinner"
                data-testid="loader"/>
        </div>)
    if (!data) return null

    return (
        <TabelProfil 
            daftarProfil={data.message}
            totalRecords={data.message.length} />
    )
}

export function Profil() {
    return (
        <main className={styles.main}>
            <SignedInUser />

            <h2 className={styles.subtitle}>Profil</h2>
            <p className={styles.description}>Atur profil pengguna aplikasi ini</p>

            <DaftarProfil />
        </main>
    )
}
