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


export function UbahProfilUser() {
    const { query } = useRouter()

    const { data, error, isLoading, isValidating } = useSWR(
        () => (query.id ? `/api/userProfiles/id/${query.id}` : null), 
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

        const recordDate = new Date()

        const objectWithData = {
            'firstName': event.target.firstName.value,
            'lastName': event.target.lastName.value,
            'username': event.target.username.value,
            'password': event.target.password.value,
            'userRole': event.target.userRole.value,
            'tanggalUbah': recordDate
        }

        fetcherPut('/api/userProfiles/id/' + query.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objectWithData)
        }).then((data) => {
            if (data.resStatus === 200) {
                toast.success('Ubah profil berhasil', {
                    position: toast.POSITION.TOP_CENTER
                })
            } else {
                toast.error('Ubah profil gagal: ' + data.message, {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        })
    }

    return (
        <main className={styles.main}>
            <SignedInUser />

            <h2 className={styles.subtitle}>Ubah Profil</h2>
            <p className={styles.description}>Ubah informasi pengguna</p>

            <form className={styles.form} onSubmit={handleClick}>
                <InputTextWithDefaultValues 
                    type="text" 
                    placeholder="Nama Depan" 
                    name="firstName"
                    defaultValue={data.message[0].firstName} />
                <InputTextWithDefaultValues 
                    type="text" 
                    placeholder="Nama Belakang" 
                    name="lastName"
                    defaultValue={data.message[0].lastName} />
                <InputTextWithDefaultValues 
                    type="text" 
                    placeholder="Username" 
                    name="username"
                    defaultValue={data.message[0].username} />
                <InputTextWithDefaultValues 
                    type="text" 
                    placeholder="Password" 
                    name="password"
                    defaultValue={data.message[0].password} />
                <InputTextWithDefaultValues 
                    type="text" 
                    placeholder="Role" 
                    name="userRole"
                    defaultValue={data.message[0].userRole} />

                <ButtonSimpan />

                <Link href="/" as={`/`}>
                    <ButtonNavigasi />
                </Link>

                <ToastContainer />
            </form>
        </main>
    )
}
