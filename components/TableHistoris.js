import React, { useState } from "react"
import useTable from "../hooks/useTable"
import styles from "./TableHistoris.module.css"
import { TableFooter } from "./TableFooter"


function Historis({ histori }) {
    return (
        <tr className={styles.tableRowItems}>
            <td className={styles.tableCell}>{histori.kodeProduk}</td>
            <td className={styles.tableCell}>{histori.gudang}</td>
            <td className={styles.tableCell}>{new Date(histori.tanggalUbah).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}</td>
            <td className={styles.tableCell}>{histori.tipeUbah}</td>
            <td className={styles.tableCell}>{histori.jumlahUbah}</td>
            <td className={styles.tableCell}>{histori.jumlahStokSebelum}</td>
            <td className={styles.tableCell}>{histori.jumlahStokSetelah}</td>
            <td className={styles.tableCell}>{histori.diubahOleh}</td>
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
                        <th className={styles.tableHeader}>Kode Produk</th>
                        <th className={styles.tableHeader}>Gudang</th>
                        <th className={styles.tableHeader}>Tanggal Ubah</th>
                        <th className={styles.tableHeader}>Aksi</th>
                        <th className={styles.tableHeader}>Jumlah Ambil/Tambah</th>
                        <th className={styles.tableHeader}>Jumlah Stok Sebelum</th>
                        <th className={styles.tableHeader}>Jumlah Stok Setelah</th>
                        <th className={styles.tableHeader}>Diubah Oleh</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(histori => (
                        <Historis 
                            histori={histori}
                            key={histori._id} />
                    ))}
                </tbody>
            </table>

            <TableFooter 
                page={page}
                onPageChange={onPageChange}
                totalRecords={totalRecords} />
        </>
    )
}
