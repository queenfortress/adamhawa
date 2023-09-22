import React from 'react'
import { signIn } from "next-auth/react"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { InputTextWithOnChange } from './InputText'
import { ButtonLogIn } from './Button'
import styles from './UserSignIn.module.css'


export function UserSignIn() {
    const [userInfo, setUserInfo] = useState({ username: '', password: ''})

    function handleSubmit(event) {
        event.preventDefault();
        signIn('credentials', {
            username: userInfo.username,
            password: userInfo.password,
            redirect: false
            // callbackUrl: '/'
        }).then(({ ok, error }) => {
            if (ok) {
                window.location.replace('/')
            } else {
                console.log(error)
                toast.error('Username atau password salah', {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        })
    }

    return (
        <main className={styles.main}>
            <div className={styles.loginBox}>
                <h2 className={styles.subtitle}>Sign In</h2>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <InputTextWithOnChange
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={({ target }) => setUserInfo({ ...userInfo, username: target.value })}
                        required={true} />
                    <InputTextWithOnChange
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={({ target}) => setUserInfo({ ...userInfo, password: target.value })}
                        required={true} />

                    <ButtonLogIn />

                    <p>
                        Belum punya akun? <a href='/auth/signup' className={styles.urlDaftar}>Daftar</a>
                    </p>

                    <ToastContainer />
                </form>
            </div>
        </main>
    )
}
