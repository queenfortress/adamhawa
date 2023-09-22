import clientPromise from "../../../lib/mongodb"


export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("prod_product_inv");

        console.log("[API-POST-Products] New product to insert: " + JSON.stringify(req.body))
        const products = await db.collection("products").insertOne(req.body)

        console.log("[API-POST-Products] Product was inserted: " + JSON.stringify(products))
        res.status(200).json({
            message: products, 
            tipeEndpoint: 'products', 
            resStatus: 200
        })
    } catch (e) {
        res.status(405).json({
            message: e.message, 
            tipeEndpoint: 'products', 
            resStatus: 405
        })
    }
}
