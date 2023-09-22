import { signIn } from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { InputText } from './InputText'
import { ButtonSignUp } from './Button'
import styles from './UserSignUp.module.css'
import { fetcherPost } from '../utils/fetchers'


export function UserSignUp() {
    function handleClick(event) {
        event.preventDefault()

        const recordDate = new Date()

        var userRole = 'user'
        if (event.target.username.value === 'admin') {
            userRole = 'admin'
        } else if (event.target.username.value === 'superadmin') {
            userRole = 'superadmin'
        }

        const objectWithData = {
            'firstName': event.target.firstName.value,
            'lastName': event.target.lastName.value,
            'username': event.target.username.value,
            'password': event.target.password.value,
            'userRole': userRole,
            'tanggalInput': recordDate,
            'tanggalUbah': recordDate
        }

        fetcherPost('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objectWithData)
        }).then((data) => {
            console.log(data.message)

            if (data.resStatus === 200) {
                signIn('credentials', {
                    username: event.target.username.value,
                    password: event.target.password.value,
                    callbackUrl: '/'
                })
            } else {
                toast.error('Registrasi gagal. ' + data.message, {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        })
    }

    return (
        <main className={styles.main}>
            <div className={styles.regisBox}>
                <h2 className={styles.subtitle}>Sign Up</h2>

                <form className={styles.form} onSubmit={handleClick}>
                    <InputText
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        required={true} />
                    <InputText
                        type="text"
                        placeholder="Last Name"
                        name="lastName" />
                    <InputText
                        type="text"
                        placeholder="Username"
                        name="username"
                        required={true} />
                    <InputText
                        type="password"
                        placeholder="Password"
                        name="password"
                        required={true} />

                    <ButtonSignUp />

                    <p>
                        Sudah punya akun? <a href='/auth/signin' className={styles.urlMasuk}>Masuk</a>
                    </p>

                    <ToastContainer />
                </form>
            </div>
        </main>
    )
}
