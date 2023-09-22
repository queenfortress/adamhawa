import clientPromise from "../../lib/mongodb"


export default async (req, res) => {
    try {
        if (req.method !== 'POST') {
            res.status(405).json({
                message: 'Only POST requests allowed', 
                tipeEndpoint: 'userSignUp', 
                resStatus: 405 })
        }

        const client = await clientPromise;
        const db = client.db("prod_product_inv");

        const existingUser = await db
            .collection("user_profiles")
            .find({username: req.body.username})
            .toArray()

        if (existingUser.length > 0) {
            console.log("[API-POST-SignUp] Username " + req.body.username + " already exists")

            res.status(405).json({
                message: "Username " + req.body.username + " sudah ada", 
                tipeEndpoint: 'userSignUp', 
                resStatus: 405 })
        } else {
            console.log("[API-POST-SignUp] New user to insert: " + JSON.stringify(req.body))
            const user = await db.collection("user_profiles").insertOne(req.body)

            console.log("[API-POST-SignUp] User was inserted: " + JSON.stringify(user))
            res.status(200).json({
                message: user, 
                tipeEndpoint: 'userSignUp', 
                resStatus: 200 })
        }
    } catch (e) {
        res.status(405).json({
            message: e.message, 
            tipeEndpoint: 'userSignUp', 
            resStatus: 405 })
    }
}
