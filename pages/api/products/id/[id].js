import clientPromise from "../../../../lib/mongodb"
import { ObjectId } from 'mongodb'


export default async (req, res) => {
    const client = await clientPromise;
    const db = client.db("prod_product_inv");

    const produkID = req.query.id

    if (req.method === "GET") {
        try {
            console.log("[API-GET-Products-By-ID] ID Product to fetch")
            console.log(produkID)

            const products = await db
                .collection("products")
                .find({_id: new ObjectId(produkID)})
                .toArray()

            console.log("[API-GET-Products-By-ID] Fetched products")
            console.log(products)

            res.status(200).json({ 
                message: products,
                tipeEndpoint: 'products', 
                resStatus: 200
            })
        } catch (e) {
            res.status(405).json({
                message: e.message, 
                produkID: produkID,
                tipeEndpoint: 'products', 
                resStatus: 405
            })
        }
    } else if (req.method === "PUT") {
        try {
            console.log("[API-PUT-Products] ID Product to update")
            console.log(produkID)
            console.log("[API-PUT-Products] New product info: " + JSON.stringify(req.body))

            // const product = await db
            //     .collection("products")
            //     .updateOne(
            //         {
            //             _id: new ObjectId(produkID)
            //         }, 
            //         { 
            //             $set: {
            //                 kodeProduk: req.body.kodeProduk, 
            //                 gudang: req.body.gudang, 
            //                 jumlahStok: req.body.jumlahStok
            //             } 
            //         })
            
            const product = await db
                .collection("products")
                .updateOne(
                    {
                        _id: new ObjectId(produkID)
                    }, 
                    { 
                        $set: req.body
                    })

            console.log("[API-PUT-Products] Product was updated: " + JSON.stringify(product))
            res.status(200).json({
                message: product, 
                produkID: produkID, 
                tipeEndpoint: 'products',
                resStatus: 200
            })
        } catch (e) {
            res.status(405).json({
                message: e.message, 
                produkID: produkID, 
                tipeEndpoint: 'products',
                resStatus: 405
            })
        }
    } else if (req.method === "DELETE") {
        try {
            console.log("[API-DELETE-Products] ID Product to remove")
            console.log(produkID)

            const product = await db
                .collection("products")
                .deleteOne({
                    _id: new ObjectId(produkID)
                })

            console.log("[API-DELETE-Products] Product was removed: " + JSON.stringify(product))
            res.status(200).json({
                message: product, 
                produkID: produkID,
                tipeEndpoint: 'products',
                resStatus: 200
            })
        } catch (e) {
            res.status(405).json({
                message: e.message, 
                produkID: produkID,
                tipeEndpoint: 'products',
                resStatus: 405
            })
        }
    }
}
