import React, { useEffect, useState, useRef } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SignedInUser } from './SignedInUser'
import { InputText } from './InputText'
import { ButtonSimpan, ButtonNavigasi } from './Button'
import styles from './UbahStok.module.css'
import { fetcherGet, fetcherPost, fetcherPut } from '../utils/fetchers'


// function InfoPengubahan({ tipeUbah, kodeProduk, jumlahUbah }) {
//     var productEndpoint = null

//     if (kodeProduk !== '' && jumlahUbah !== '') {
//         productEndpoint = '/api/products/kodeProdukExact/' + kodeProduk
//     }

//     const { data, error, isLoading, isValidating } = useSWR(
//         productEndpoint, 
//         fetcherGet
//     )

//     const previousValues = useRef({ kodeProduk, jumlahUbah })

//     useEffect(() => {
//         if (data) {
//             if (data.message.length > 0) {
//                 if (
//                     previousValues.current.kodeProduk !== kodeProduk ||
//                     previousValues.current.jumlahUbah !== jumlahUbah
//                     ) {
//                     console.log(previousValues.current)

//                     const idProduk = data.message[0]._id
//                     const gudang = data.message[0].gudang
//                     const jumlahStokSebelum = data.message[0].jumlahStok

//                     var jumlahStokSetelah = null
//                     if (tipeUbah.toLowerCase() === 'pengambilan') {
//                         jumlahStokSetelah = parseInt(jumlahStokSebelum) - parseInt(jumlahUbah)
//                     } else if (tipeUbah.toLowerCase() === 'penambahan') {
//                         jumlahStokSetelah = parseInt(jumlahStokSebelum) + parseInt(jumlahUbah)
//                     }

//                     console.log('Kode produk yang diambil: ' + kodeProduk)
//                     console.log('Jumlah ubah: ' + jumlahUbah)
//                     console.log('[API Res] ID produk: ' + idProduk)
//                     console.log('[API Res] Kode produk: ' + kodeProduk)
//                     console.log('[API Res] Gudang: ' + gudang)
//                     console.log('[API Res] Jumlah stok sebelum: ' + jumlahStokSebelum)
//                     console.log('Jumlah stok setelah ubah: ' + jumlahStokSetelah)

//                     const recordDate = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })

//                     const objectWithData = {
//                         'jumlahStok': jumlahStokSetelah.toString(),
//                         'tanggalUbah': recordDate
//                     }
                    
//                     fetcherPut('/api/products/id/' + idProduk, {
//                         method: 'PUT',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify(objectWithData)
//                     }).then(() => {
//                         const objectHistorical = {
//                             'kodeProduk': kodeProduk,
//                             'gudang': gudang,
//                             'tipeUbah': tipeUbah.toLowerCase(),
//                             'jumlahUbah': jumlahUbah,
//                             'jumlahStokSebelum': jumlahStokSebelum,
//                             'jumlahStokSetelah': jumlahStokSetelah.toString(),
//                             'tanggalUbah': recordDate
//                         }
    
//                         console.log('objh')
//                         console.log(objectHistorical)
    
//                         fetcherPost('/api/historicals', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify(objectHistorical)
//                         })
//                     })

//                     previousValues.current = { kodeProduk, jumlahUbah }
//                 }
//             }
//         }
//     }, [data, kodeProduk, jumlahUbah])

//     if (error) return <div><h2>{error.message}</h2></div>
//     if (isLoading) return <div><h2>Loading...</h2></div>
//     if (!data) return null

//     if (data.message.length <= 0) return <div><h2>Kode produk {kodeProduk} tidak ditemukan</h2></div>
    
//     return (
//         <></>
//     )
// }


function InfoPengubahan({ 
    tipeUbah, 
    kodeProduk, 
    gudang,
    jumlahUbah, 
    ubahKomplit, 
    onFilterUbahKomplit, 
    session }) {
    var productEndpoint = null

    if (kodeProduk !== '' && jumlahUbah !== '' && gudang !== '') {
        productEndpoint = '/api/products/kodeProdukGudangExact/' + kodeProduk + '/' + gudang
    }

    if (!ubahKomplit) {
        if (productEndpoint) {
            fetcherGet(productEndpoint).then(
                (data) => {
                    if (data.resStatus === 200) {
                        if (data.message.length > 0) {
                            const idProduk = data.message[0]._id
                            const jumlahStokSebelum = data.message[0].jumlahStok

                            var jumlahStokSetelah = null
                            if (tipeUbah.toLowerCase() === 'pengambilan') {
                                jumlahStokSetelah = parseInt(jumlahStokSebelum) - parseInt(jumlahUbah)
                            } else if (tipeUbah.toLowerCase() === 'penambahan') {
                                jumlahStokSetelah = parseInt(jumlahStokSebelum) + parseInt(jumlahUbah)
                            }

                            console.log('Kode produk yang diambil: ' + kodeProduk)
                            console.log('Gudang: ' + gudang)
                            console.log('Jumlah ubah: ' + jumlahUbah)
                            console.log('[API Res] ID produk: ' + idProduk)
                            console.log('[API Res] Kode produk: ' + kodeProduk)
                            console.log('[API Res] Gudang: ' + gudang)
                            console.log('[API Res] Jumlah stok sebelum: ' + jumlahStokSebelum)
                            console.log('Jumlah stok setelah ubah: ' + jumlahStokSetelah)

                            const recordDate = new Date()

                            const objectWithData = {
                                'jumlahStok': jumlahStokSetelah.toString(),
                                'tanggalUbah': recordDate
                            }
                            
                            fetcherPut('/api/products/id/' + idProduk, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(objectWithData)
                            }).then((data) => {
                                if (data.resStatus === 200) {
                                    toast.success('Ubah stok ' + kodeProduk + ' di gudang ' + gudang + ' berhasil', {
                                        position: toast.POSITION.TOP_CENTER
                                    })

                                    const objectHistorical = {
                                        'kodeProduk': kodeProduk,
                                        'gudang': gudang,
                                        'tipeUbah': tipeUbah.toLowerCase(),
                                        'jumlahUbah': jumlahUbah,
                                        'jumlahStokSebelum': jumlahStokSebelum,
                                        'jumlahStokSetelah': jumlahStokSetelah.toString(),
                                        'tanggalUbah': recordDate,
                                        'diubahOleh': session.user.username
                                    }

                                    fetcherPost('/api/historicals', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(objectHistorical)
                                    }).then((data) => {
                                        console.log(data.message)

                                        if (data.resStatus === 200) {
                                            toast.success('Berhasil ditambahkan ke riwayat perubahan stok', {
                                                position: toast.POSITION.TOP_CENTER
                                            })
                                        } else {
                                            toast.error('Gagal ditambahkan ke riwayat perubahan stok', {
                                                position: toast.POSITION.TOP_CENTER
                                            })
                                        }

                                        onFilterUbahKomplit(true)
                                    })
                                } else {
                                    toast.error('Ubah stok ' + kodeProduk + ' di gudang ' + gudang + ' gagal', {
                                        position: toast.POSITION.TOP_CENTER
                                    })

                                    onFilterUbahKomplit(true)
                                }
                            })
                        } else {
                            toast.error('Kode produk ' + kodeProduk + ' dan gudang ' + gudang + ' tidak ditemukan', {
                                position: toast.POSITION.TOP_CENTER
                            })

                            onFilterUbahKomplit(true)
                        }
                    } else {
                        toast.error('Terjadi kesalahan saat mengambil info produk: ' + data.message, {
                            position: toast.POSITION.TOP_CENTER
                        })

                        onFilterUbahKomplit(true)
                    }
                }
            )
        }
    }

    return (
        <></>
    )
}

function SearchBar({ 
    tipeUbah, 
    onFilterKodeProduk, 
    onFilterGudang, 
    onFilterJumlahUbah, 
    onFilterUbahKomplit }) {
    function handleClick(event) {
        event.preventDefault()

        onFilterKodeProduk(event.target.kodeProduk.value)
        onFilterGudang(event.target.gudang.value)
        onFilterJumlahUbah(event.target.jumlahUbah.value)
        onFilterUbahKomplit(false)
    }

    const placeholderInputText = "Jumlah " + tipeUbah

    return (
        <form className={styles.form} onSubmit={handleClick}>
            <InputText 
                type="text" 
                placeholder="Kode Produk" 
                name="kodeProduk"
                required={true} />
            <InputText 
                type="text" 
                placeholder="Gudang" 
                name="gudang"
                required={true} />
            <InputText 
                type="text" 
                placeholder={placeholderInputText}
                name="jumlahUbah"
                required={true} />

            <ButtonSimpan />

            <Link href="/" as={`/`}>
                <ButtonNavigasi />
            </Link>
        </form>
    )
}

export function UbahStok({ tipeUbah, subjudul, deskripsi }) {
    const [filterKodeProduk, setFilterKodeProduk] = useState('')
    const [filterGudang, setFilterGudang] = useState('')
    const [filterJumlahUbah, setFilterJumlahUbah] = useState('')

    const [filterUbahKomplit, setFilterUbahKomplit] = useState(true)
    const { data: session } = useSession()

    return (
        <main className={styles.main}>
            <SignedInUser />

            <h2 className={styles.subtitle}>{subjudul}</h2>
            <p className={styles.description}>{deskripsi}</p>

            <SearchBar 
                tipeUbah={tipeUbah}
                onFilterKodeProduk={setFilterKodeProduk}
                onFilterGudang={setFilterGudang}
                onFilterJumlahUbah={setFilterJumlahUbah}
                onFilterUbahKomplit={setFilterUbahKomplit} />

            <InfoPengubahan
                tipeUbah={tipeUbah}
                kodeProduk={filterKodeProduk}
                gudang={filterGudang}
                jumlahUbah={filterJumlahUbah}
                ubahKomplit={filterUbahKomplit}
                onFilterUbahKomplit={setFilterUbahKomplit}
                session={session} />
            
            <ToastContainer />
        </main>
    )
}
