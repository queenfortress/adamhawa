import React, { useState } from "react";
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useTable from "../hooks/useTable";
import styles from "./Table.module.css";
import { TableFooter } from "./TableFooter";
import { ButtonUbah, ButtonHapus } from './Button'
import { fetcherDelete } from '../utils/fetchers'


function Produk({ produk }) {
    function handleClickHapus(event) {
        event.preventDefault()

        console.log('HANDLE CLICK HAPUS')
        console.log(produk._id)
        console.log(produk.kodeProduk)
        console.log(produk.gudang)
        console.log(produk.jumlahStok)
        console.log(produk.tanggalInput)
        console.log(produk.tanggalUbah)

        fetcherDelete('/api/products/id/' + produk._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((data) => {
            if (data.resStatus === 200) {
                toast.success('Produk ' + produk.kodeProduk + ' berhasil dihapus', {
                    position: toast.POSITION.TOP_CENTER
                })
            } else {
                toast.error('Produk ' + produk.kodeProduk + ' gagal dihapus', {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        })
    }

    const imageExportUrl = produk.urlGambar.replace(
        '/file/d/', 
        '/uc?export=view&id=').replace(
            '/view?usp=drive_link', 
            '').replace(
                '/view?usp=sharing', 
                '')

    return (
        <tr className={styles.tableRowItems}>
            <td className={styles.tableCell}>
                <img 
                    src={imageExportUrl} 
                    width='200' 
                    height='200'
                    title={imageExportUrl}
                    alt={imageExportUrl} />
            </td>
            <td className={styles.tableCell}>{produk.kodeProduk}</td>
            <td className={styles.tableCell}>{produk.gudang}</td>
            <td className={styles.tableCell}>{produk.jumlahStok}</td>
            <td className={styles.tableCell}>{produk.merek}</td>
            <td className={styles.tableCell}>{produk.harga}</td>
            <td className={styles.tableCell}>{new Date(produk.tanggalInput).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}</td>
            <td className={styles.tableCell}>{new Date(produk.tanggalUbah).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}</td>
            <td className={styles.tableCell}>
                <Link 
                    href="/ubah/[id]"
                    as={`/ubah/${produk._id}`}>
                    <ButtonUbah />
                </Link>
            </td>
            <td className={styles.tableCell}>
                <ButtonHapus onClick={handleClickHapus} />
            </td>
        </tr>
    )
}

export function Table({ data, totalRecords, page, onPageChange }) {
    // const [page, setPage] = useState(1)
    // const { slice, range } = useTable(data, page, rowsPerPage)

    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                    <tr>
                        <th className={styles.tableHeader}>Gambar</th>
                        <th className={styles.tableHeader}>Kode Produk</th>
                        <th className={styles.tableHeader}>Gudang</th>
                        <th className={styles.tableHeader}>Jumlah Stok</th>
                        <th className={styles.tableHeader}>Merek</th>
                        <th className={styles.tableHeader}>Harga (Rp)</th>
                        <th className={styles.tableHeader}>Tanggal Input</th>
                        <th className={styles.tableHeader}>Tanggal Ubah</th>
                        <th className={styles.tableHeader} colSpan='2'>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(produk => (
                        <Produk 
                            produk={produk}
                            key={produk._id} />
                    ))}
                </tbody>
            </table>

            <TableFooter 
                page={page}
                onPageChange={onPageChange}
                totalRecords={totalRecords} />
            
            <ToastContainer />
        </>
    )
}
