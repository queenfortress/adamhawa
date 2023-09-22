import { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { InputText } from './InputText'
import { ButtonCari, ButtonNavigasi } from './Button'
import { SignedInUser } from './SignedInUser'
import { Table } from './TableHistoris'
import styles from './Historis.module.css'
import { fetcherGet } from '../utils/fetchers'
import ClipLoader from "react-spinners/ClipLoader"


function DaftarProduk({ 
    kodeProduk, 
    tanggalAksiAwal, 
    tanggalAksiAkhir, 
    page, 
    onPageChange }) {
    var historisEndpoint = null

    if (kodeProduk !== '' && tanggalAksiAwal === '' && tanggalAksiAkhir === '') { 
        historisEndpoint = '/api/historicals/kodeProduk/' + kodeProduk + '/' + page
    } else if (kodeProduk !== '' && tanggalAksiAwal !== '' && tanggalAksiAkhir === '') { 
        historisEndpoint = '/api/historicals/kodeProdukTglAwal/' + kodeProduk + '/' + tanggalAksiAwal + '/' + page
    } else if (kodeProduk !== '' && tanggalAksiAwal === '' && tanggalAksiAkhir !== '') { 
        historisEndpoint = '/api/historicals/kodeProdukTglAkhir/' + kodeProduk + '/' + tanggalAksiAkhir + '/' + page
    } else if (kodeProduk !== '' && tanggalAksiAwal !== '' && tanggalAksiAkhir !== '') { 
        historisEndpoint = '/api/historicals/kodeProdukTglAwalAkhir/' + kodeProduk + '/' + tanggalAksiAwal + '/' + tanggalAksiAkhir + '/' + page
    } else if (kodeProduk === '' && tanggalAksiAwal !== '' && tanggalAksiAkhir === '') { 
        historisEndpoint = '/api/historicals/TglAwal/' + tanggalAksiAwal + '/' + page
    } else if (kodeProduk === '' && tanggalAksiAwal === '' && tanggalAksiAkhir !== '') { 
        historisEndpoint = '/api/historicals/TglAkhir/' + tanggalAksiAkhir + '/' + page
    } else if (kodeProduk === '' && tanggalAksiAwal !== '' && tanggalAksiAkhir !== '') { 
        historisEndpoint = '/api/historicals/TglAwalAkhir/' + tanggalAksiAwal + '/' + tanggalAksiAkhir + '/' + page
    } else {
        historisEndpoint = '/api/historicals/semua/' + page
    }

    console.log('[CLIENT] Filter kode produk: ' + kodeProduk)
    console.log('[CLIENT] Filter tanggal aksi awal: ' + tanggalAksiAwal)
    console.log('[CLIENT] Produk tanggal aksi akhir: ' + tanggalAksiAkhir)
    console.log('[CLIENT] Historis endpoint: ' + historisEndpoint)

    const { data, error, isLoading, isValidating } = useSWR(
        historisEndpoint, 
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

    const totalRecords = data.message.length

    return (
        <Table
            data={data.message}
            totalRecords={totalRecords}
            page={page}
            onPageChange={onPageChange} />
    )
}

function SearchBar({ 
    onFilterKodeProduk, 
    onFilterTanggalAksiAwal, 
    onFilterTanggalAksiAkhir,
    onPageChange }) {

    function handleClick(event) {
        event.preventDefault()

        onFilterKodeProduk(event.target.kodeProduk.value)
        onFilterTanggalAksiAwal(event.target.tanggalAksiAwal.value)
        onFilterTanggalAksiAkhir(event.target.tanggalAksiAkhir.value)
        onPageChange(1)
    }

    return (
        <form className={styles.form} onSubmit={handleClick}>
            <InputText 
                type="text" 
                placeholder="Kode Produk" 
                name="kodeProduk" />
            <InputText 
                type="text" 
                placeholder="Tanggal Aksi Awal (YYYY-MM-DD HH:MM:SS)" 
                name="tanggalAksiAwal" />
            <InputText 
                type="text" 
                placeholder="Tanggal Aksi Akhir (YYYY-MM-DD HH:MM:SS)" 
                name="tanggalAksiAkhir" />

            <ButtonCari />
            
            <Link href="/" as={`/`}>
                <ButtonNavigasi />
            </Link>
        </form>
    )
}

export function Historis() {
    const [filterKodeProduk, setFilterKodeProduk] = useState('')
    const [filterTanggalAksiAwal, setFilterTanggalAksiAwal] = useState('')
    const [filterTanggalAksiAkhir, setFilterTanggalAksiAkhir] = useState('')
    const [page, setPage] = useState(1)

    return (
        <main className={styles.main}>
            <SignedInUser />

            <h2 className={styles.subtitle}>Historis</h2>
            <p className={styles.description}>Riwayat manajemen produk</p>

            <SearchBar 
                onFilterKodeProduk={setFilterKodeProduk}
                onFilterTanggalAksiAwal={setFilterTanggalAksiAwal} 
                onFilterTanggalAksiAkhir={setFilterTanggalAksiAkhir}
                onPageChange={setPage} />
            <DaftarProduk 
                kodeProduk={filterKodeProduk}
                tanggalAksiAwal={filterTanggalAksiAwal}
                tanggalAksiAkhir={filterTanggalAksiAkhir}
                page={page}
                onPageChange={setPage} />
        </main>
    )
}
