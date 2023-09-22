import React, { useState } from "react";
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useTable from "../hooks/useTable";
import styles from "./TableProfil.module.css";
import { TableFooterPreLoadAll } from "./TableFooter";
import { ButtonUbah, ButtonHapus } from './Button'
import { fetcherDelete } from '../utils/fetchers'


function ProfilUser({ profil, userSession }) {
    function handleClickHapus(event) {
        event.preventDefault()

        fetcherDelete('/api/userProfiles/id/' + profil._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((data) => {
            if (data.resStatus === 200) {
                toast.success('Profil ' + profil.username + ' berhasil dihapus', {
                    position: toast.POSITION.TOP_CENTER
                })
            } else {
                toast.error('Profil ' + profil.username + ' gagal dihapus: ' + data.message, {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        })
    }

    if (profil.username !== userSession.user.username) {
        if (profil.userRole === 'superadmin' && userSession.user.userRole !== 'superadmin') {
            return null
        } else {
            return (
                <tr className={styles.tableRowItems}>
                    <td className={styles.tableCell}>{profil.firstName}</td>
                    <td className={styles.tableCell}>{profil.lastName}</td>
                    <td className={styles.tableCell}>{profil.username}</td>
                    <td className={styles.tableCell}>{profil.password}</td>
                    <td className={styles.tableCell}>{profil.userRole}</td>
                    <td className={styles.tableCell}>{new Date(profil.tanggalInput).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}</td>
                    <td className={styles.tableCell}>{new Date(profil.tanggalUbah).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}</td>
                    <td className={styles.tableCell}>
                        <Link 
                            href="/ubah/profil/[id]"
                            as={`/ubah/profil/${profil._id}`}>
                            <ButtonUbah />
                        </Link>
                    </td>
                    <td className={styles.tableCell}>
                        <ButtonHapus onClick={handleClickHapus} />
                    </td>
                </tr>
            )
        }
    } else {
        return (
            <tr className={styles.tableRowItems}>
                <td className={styles.tableCell}>{profil.firstName}</td>
                <td className={styles.tableCell}>{profil.lastName}</td>
                <td className={styles.tableCell}>{profil.username}</td>
                <td className={styles.tableCell}>{profil.password}</td>
                <td className={styles.tableCell}>{profil.userRole}</td>
                <td className={styles.tableCell}>{new Date(profil.tanggalInput).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}</td>
                <td className={styles.tableCell}>{new Date(profil.tanggalUbah).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}</td>
                <td className={styles.tableCell}>
                    <Link 
                        href="/ubah/profil/[id]"
                        as={`/ubah/profil/${profil._id}`}>
                        <ButtonUbah />
                    </Link>
                </td>
                <td className={styles.tableCell}></td>
            </tr>
        )
    }
}

export function Table({ data, rowsPerPage }) {
    const [page, setPage] = useState(1)
    const { slice, range } = useTable(data, page, rowsPerPage)

    const { data: session } = useSession()

    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                    <tr>
                        <th className={styles.tableHeader}>Nama Depan</th>
                        <th className={styles.tableHeader}>Nama Belakang</th>
                        <th className={styles.tableHeader}>Username</th>
                        <th className={styles.tableHeader}>Password</th>
                        <th className={styles.tableHeader}>Role</th>
                        <th className={styles.tableHeader}>Tanggal Input</th>
                        <th className={styles.tableHeader}>Tanggal Ubah</th>
                        <th className={styles.tableHeader} colSpan='2'>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map(profil => (
                        <ProfilUser 
                            profil={profil}
                            userSession={session}
                            key={profil._id} />
                    ))}
                </tbody>
            </table>

            <TableFooterPreLoadAll 
                range={range} 
                setPage={setPage} 
                page={page}
                slice={slice} />

            <ToastContainer />
        </>
    )
}
