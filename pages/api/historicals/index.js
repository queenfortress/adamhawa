import clientPromise from "../../../lib/mongodb"


export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("prod_product_inv");

        console.log("[API-POST-Historicals] New history to insert: " + JSON.stringify(req.body))
        const historicals = await db.collection("historicals").insertOne(req.body)

        console.log("[API-POST-Historicals] History was inserted: " + JSON.stringify(historicals))
        res.status(200).json({
            message: historicals, 
            tipeEndpoint: 'historicals', 
            resStatus: 200
        })
    } catch (e) {
        res.status(405).json({
            message: e.message, 
            tipeEndpoint: 'historicals', 
            resStatus: 405
        })
    }
}
