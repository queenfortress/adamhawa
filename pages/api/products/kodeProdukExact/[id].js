import clientPromise from "../../../../lib/mongodb"


export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("prod_product_inv");

        const reqParam = req.query.id
        console.log('[API-GET-Products-By-KodeProdukExact] Kode produk')
        console.log(reqParam)

        const products = await db
            .collection("products")
            .find({
                kodeProduk: reqParam
            })
            .toArray()

        console.log('[API-GET-Products-By-KodeProdukExact] Fetched products')
        console.log(products)

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
