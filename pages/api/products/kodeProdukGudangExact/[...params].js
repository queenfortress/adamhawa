import clientPromise from "../../../../lib/mongodb"


export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("prod_product_inv");

        const reqParams = req.query.params
        console.log('[API-GET-Products-By-KodeProdukGudangExact] Kode produk')
        console.log(reqParams[0])
        console.log('[API-GET-Products-By-KodeProdukGudangExact] Gudang')
        console.log(reqParams[1])

        const products = await db
            .collection("products")
            .find({
                kodeProduk: reqParams[0],
                gudang: reqParams[1]
            })
            .toArray()

        console.log('[API-GET-Products-By-KodeProdukGudangExact] Fetched products')
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
