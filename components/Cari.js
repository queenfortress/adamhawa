import { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { InputText } from './InputText'
import { ButtonCari, ButtonNavigasi } from './Button'
import { Table } from './Table'
import { SignedInUser } from './SignedInUser'
import styles from './Cari.module.css'
import { fetcherGet } from '../utils/fetchers'
import ClipLoader from "react-spinners/ClipLoader"


function TabelProduk({ daftarProduk, totalRecords, totalStok, page, onPageChange }) {
    return (
        <>
            <div className={styles.stokBarang}>
                {/* <p><b>Total hasil pencarian:</b> {totalRecords}</p> */}
                <p><b>Total stok:</b> {totalStok}</p>
            </div>

            <Table 
                data={daftarProduk} 
                totalRecords={totalRecords}
                page={page}
                onPageChange={onPageChange} />
        </>
    )
}

function getTotalStok(records, totalRecords) {
    var p = 0
    for (let i = 0; i < totalRecords; i++) {
        p += parseInt(records[i].jumlahStok)
    }
    return p
}

function DaftarProduk({ kodeProduk, gudang, page, onPageChange }) {
    var productEndpoint = null

    if (kodeProduk !== '' && gudang === '') { 
        productEndpoint = '/api/products/kodeProduk/' + kodeProduk + '/' + page
    } else if (kodeProduk === '' && gudang !== '') { 
        productEndpoint = '/api/products/gudang/' + gudang + '/' + page
    } else if (kodeProduk !== '' && gudang !== '') { 
        productEndpoint = '/api/products/kodeProdukDanGudang/' + kodeProduk + '/' + gudang + '/' + page
    } else {
        productEndpoint = '/api/products/semua/' + page
    }

    console.log('[CLIENT] Filter kode produk: ' + kodeProduk)
    console.log('[CLIENT] Filter gudang: ' + gudang)
    console.log('[CLIENT] Produk endpoint: ' + productEndpoint)

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

    const totalRecords = data.message.length
    const totalStok = getTotalStok(data.message, totalRecords)

    return (
        <TabelProduk 
            daftarProduk={data.message}
            totalRecords={totalRecords} 
            totalStok={totalStok}
            page={page}
            onPageChange={onPageChange} />
    )
}

function SearchBar({ onFilterKodeProduk, onFilterGudang, onPageChange }) {
    function handleClick(event) {
        event.preventDefault()

        onFilterKodeProduk(event.target.kodeProduk.value)
        onFilterGudang(event.target.gudang.value)
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
                placeholder="Gudang" 
                name="gudang" />

            <ButtonCari />
            
            <Link href="/" as={`/`}>
                <ButtonNavigasi />
            </Link>
        </form>
    )
}

export function Cari() {
    const [filterKodeProduk, setFilterKodeProduk] = useState('')
    const [filterGudang, setFilterGudang] = useState('')
    const [page, setPage] = useState(1)

    return (
        <main className={styles.main}>
            <SignedInUser />

            <h2 className={styles.subtitle}>Pencarian Produk</h2>
            <p className={styles.description}>Cari berdasarkan kode produk & gudang</p>

            <SearchBar 
                onFilterKodeProduk={setFilterKodeProduk}
                onFilterGudang={setFilterGudang}
                onPageChange={setPage} />
            <DaftarProduk 
                kodeProduk={filterKodeProduk}
                gudang={filterGudang}
                page={page}
                onPageChange={setPage} />
        </main>
    )
}
