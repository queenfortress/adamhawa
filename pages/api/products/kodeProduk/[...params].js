import clientPromise from "../../../../lib/mongodb"
import { numPerPage } from "../../../../utils/helpers"


export default async (req, res) => {
    const operationTime = new Date()

    try {
        const client = await clientPromise;
        const db = client.db("prod_product_inv");

        const reqParams = req.query.params
        console.log('[' + operationTime + '][API-GET-Products-By-KodeProduk] Kode produk')
        console.log(reqParams[0])
        console.log('[' + operationTime + '][API-GET-Products-By-KodeProduk] Page')
        console.log(reqParams[1])

        console.log(reqParams)

        const pageNumber = parseInt(reqParams[1])

        const products = await db
            .collection("products")
            .find({
                kodeProduk: {
                    $regex: reqParams[0]
                }})
            .skip(pageNumber > 0 ? ((pageNumber - 1) * numPerPage) : 0)
            .limit(numPerPage)
            .toArray()

        console.log('['+ operationTime + '][API-GET-Products-By-KodeProduk] Fetched products')
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
