import { useRouter } from 'next/router'
import useSWR from 'swr'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './Ubah.module.css'
import { SignedInUser } from './SignedInUser'
import { InputTextWithDefaultValues } from './InputText'
import { ButtonSimpan, ButtonNavigasi } from './Button';
import { fetcherGet, fetcherPut } from '../utils/fetchers'
import ClipLoader from "react-spinners/ClipLoader"


export function Ubah() {
    const { query } = useRouter()

    const { data, error, isLoading, isValidating } = useSWR(
        () => (query.id ? `/api/products/id/${query.id}` : null), 
        fetcherGet
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

    function handleClick(event) {
        event.preventDefault()

        console.log(query.id)

        const recordDate = new Date()

        const objectWithData = {
            'kodeProduk': event.target.kodeProduk.value,
            'gudang': event.target.gudang.value,
            'jumlahStok': event.target.jumlahStok.value,
            'merek': event.target.merek.value,
            'harga': event.target.harga.value,
            'urlGambar': event.target.urlGambar.value,
            'tanggalUbah': recordDate
        }

        fetcherPut('/api/products/id/' + query.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objectWithData)
        }).then((data) => {
            console.log(data.message)

            if (data.resStatus === 200) {
                toast.success('Ubah ' + event.target.kodeProduk.value + ' berhasil', {
                    position: toast.POSITION.TOP_CENTER
                })
            } else {
                toast.error('Ubah ' + event.target.kodeProduk.value + ' gagal', {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        })
    }

    return (
        <main className={styles.main}>
            <SignedInUser />

            <h2 className={styles.subtitle}>Ubah Produk</h2>
            <p className={styles.description}>Ubah informasi produk</p>

            <form className={styles.form} onSubmit={handleClick}>
                <InputTextWithDefaultValues 
                    type="text" 
                    placeholder="Kode Produk" 
                    name="kodeProduk"
                    defaultValue={data.message[0].kodeProduk} />
                <InputTextWithDefaultValues 
                    type="text" 
                    placeholder="Gudang" 
                    name="gudang"
                    defaultValue={data.message[0].gudang} />
                <InputTextWithDefaultValues 
                    type="text" 
                    placeholder="Jumlah Stok" 
                    name="jumlahStok"
                    defaultValue={data.message[0].jumlahStok} />
                <InputTextWithDefaultValues 
                    type="text" 
                    placeholder="Merek" 
                    name="merek"
                    defaultValue={data.message[0].merek} />
                <InputTextWithDefaultValues 
                    type="text" 
                    placeholder="Harga" 
                    name="harga"
                    defaultValue={data.message[0].harga} />
                <InputTextWithDefaultValues 
                    type="text" 
                    placeholder="URL Gambar" 
                    name="urlGambar"
                    defaultValue={data.message[0].urlGambar} />

                <ButtonSimpan />

                <Link href="/" as={`/`}>
                    <ButtonNavigasi />
                </Link>
                
                <ToastContainer />
            </form>
        </main>
    )
}
