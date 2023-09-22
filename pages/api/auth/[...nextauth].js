import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions = {
    secret: process.env.NextAuth_SECRET,
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            type: "credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            // if empty, use our own signin page on the "pages" section below.
            credentials: {},
            async authorize(credentials, req) {
                const { username, password } = credentials
                const res = await fetch("http://localhost:3000/api/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                })
                const user = await res.json();
                if (res.ok && user) {
                    console.log(user)
                    return user
                } else {
                    console.log(user.message)
                    return null
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.username = user.message.username
                token.firstName = user.message.firstName
                token.lastName = user.message.lastName
                token.userRole = user.message.userRole
            }
            return token
        },
        async session({ session, token, user }) {
            if (token) {
                session.user.username = token.username
                session.user.firstName = token.firstName
                session.user.lastName = token.lastName
                session.user.userRole = token.userRole
            }
            return session
        },
    },
    pages: {
        signIn: '/auth/signin',
    }
}

export default NextAuth(authOptions)
