import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { SignedInUser } from './SignedInUser'
import { InputText } from './InputText'
import { ButtonSimpan, ButtonNavigasi } from './Button'
import styles from './Simpan.module.css'
import { fetcherPost } from '../utils/fetchers'


export function Simpan() {
    function handleClick(event) {
        event.preventDefault()

        const recordDate = new Date()

        const objectWithData = {
            'kodeProduk': event.target.kodeProduk.value,
            'gudang': event.target.gudang.value,
            'jumlahStok': event.target.jumlahStok.value,
            'merek': event.target.merek.value,
            'harga': event.target.harga.value,
            'urlGambar': event.target.urlGambar.value,
            'tanggalInput': recordDate,
            'tanggalUbah': recordDate
        }

        fetcherPost('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objectWithData)
        }).then((data) => {
            console.log(data.message)

            if (data.resStatus === 200) {
                toast.success('Produk ' + event.target.kodeProduk.value + ' berhasil disimpan', {
                    position: toast.POSITION.TOP_CENTER
                })
            } else {
                toast.error('Produk ' + event.target.kodeProduk.value + ' gagal disimpan', {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        })
    }

    return (
        <main className={styles.main}>
            <SignedInUser />

            <h2 className={styles.subtitle}>Penyimpanan Produk</h2>
            <p className={styles.description}>Silahkan masukan informasi produk</p>

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
                    placeholder="Jumlah Stok" 
                    name="jumlahStok"
                    required={true} />
                <InputText 
                    type="text" 
                    placeholder="Merek" 
                    name="merek"
                    required={true} />
                <InputText 
                    type="text" 
                    placeholder="Harga" 
                    name="harga"
                    required={true} />
                <InputText 
                    type="text" 
                    placeholder="URL Gambar" 
                    name="urlGambar"
                    required={true} />

                <ButtonSimpan />

                <Link href="/" as={`/`}>
                    <ButtonNavigasi />
                </Link>

                <ToastContainer />
            </form>
        </main>
    )
}
