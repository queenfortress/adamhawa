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


// function Produk({ produk }) {
//     function handleClickHapus(event) {
//         event.preventDefault()

//         console.log('HANDLE CLICK HAPUS')
//         console.log(produk._id)
//         console.log(produk.kodeProduk)
//         console.log(produk.gudang)
//         console.log(produk.jumlahStok)

//         fetcherDelete('/api/products/id/' + produk._id, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         })
//     }

//     return (
//         <tr className={styles.tr}>
//             <td className={styles.td}>{produk.kodeProduk}</td>
//             <td className={styles.td}>{produk.gudang}</td>
//             <td className={styles.td}>{produk.jumlahStok}</td>
//             <td className={styles.td}>
//                 <Link 
//                     href="/ubah/[id]"
//                     as={`/ubah/${produk._id}`}>
//                     <ButtonUbah />
//                 </Link>
//             </td>
//             <td className={styles.td}>
//                 <ButtonHapus onClick={handleClickHapus} />
//             </td>
//         </tr>
//     )
// }

function TabelProduk({ daftarProduk, totalRecords, totalStok }) {
    return (
        <>
            <div className={styles.stokBarang}>
                <p><b>Total hasil pencarian:</b> {totalRecords}</p>
                <p><b>Total stok barang:</b> {totalStok}</p>
            </div>

            <Table 
                data={daftarProduk} 
                rowsPerPage={10} />
            
            {/* <table className={styles.table}>
                <tbody>
                    <tr className={styles.tr}>
                        <th className={styles.th}>Kode Produk</th>
                        <th className={styles.th}>Gudang</th>
                        <th className={styles.th}>Jumlah Stok</th>
                        <th className={styles.th} colSpan='2'>Aksi</th>
                    </tr>
                    {daftarProduk}
                </tbody>
            </table> */}
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

function DaftarProduk({ kodeProduk, gudang }) {
    var productEndpoint = null

    if (kodeProduk !== '' && gudang === '') { 
        productEndpoint = '/api/products/kodeProduk/' + kodeProduk
    } else if (kodeProduk === '' && gudang !== '') { 
        productEndpoint = '/api/products/gudang/' + gudang
    } else if (kodeProduk !== '' && gudang !== '') { 
        productEndpoint = '/api/products/kodeProdukDanGudang/' + kodeProduk + '/' + gudang
    }

    console.log('[CLIENT] Filter kode produk: ' + kodeProduk)
    console.log('[CLIENT] Filter gudang: ' + gudang)
    console.log('[CLIENT] Produk endpoint: ' + productEndpoint)

    const { data, error, isLoading, isValidating } = useSWR(
        productEndpoint, 
        fetcherGet
        // {
        //     revalidateOnFocus: false
        // }
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
            totalStok={totalStok} />
    )
}

function SearchBar({ onFilterKodeProduk, onFilterGudang }) {
    function handleClick(event) {
        event.preventDefault()

        onFilterKodeProduk(event.target.kodeProduk.value)
        onFilterGudang(event.target.gudang.value)
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

    return (
        <main className={styles.main}>
            <SignedInUser />

            <h2 className={styles.subtitle}>Pencarian Produk</h2>
            <p className={styles.description}>Cari berdasarkan kode produk & gudang</p>

            <SearchBar 
                onFilterKodeProduk={setFilterKodeProduk}
                onFilterGudang={setFilterGudang} />
            <DaftarProduk 
                kodeProduk={filterKodeProduk}
                gudang={filterGudang} />
        </main>
    )
}
