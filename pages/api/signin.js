import clientPromise from "../../lib/mongodb"


export default async (req, res) => {
    const client = await clientPromise;
    const db = client.db("prod_product_inv");

    try {
        if (req.method !== 'POST') {
            res.status(405).json({ 
                message: 'Only POST requests allowed', 
                tipeEndpoint: 'userSignIn' })
        }

        const body = JSON.parse(JSON.stringify(req.body))
        const user = await db
            .collection("user_profiles")
            .find({
                username: body.username,
                password: body.password
            })
            .toArray()

        if (user.length <= 0) {
            res.status(404).json({ 
                message: 'User does not exist or wrong password', 
                tipeEndpoint: 'userSignIn' })
        }

        res.status(200).json({
            message: {
                username: user[0].username,
                firstName: user[0].firstName,
                lastName: user[0].lastName,
                userRole: user[0].userRole
            }
        })
    } catch (error) {
        res.status(405).json({ 
            message: error.message, 
            tipeEndpoint: 'userSignIn' })
    }
}
