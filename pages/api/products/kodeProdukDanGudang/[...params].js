import clientPromise from "../../../../lib/mongodb"
import { numPerPage } from "../../../../utils/helpers"


export default async (req, res) => {
    const operationTime = new Date()

    try {
        const client = await clientPromise;
        const db = client.db("prod_product_inv");

        const reqParams = req.query.params
        console.log('[' + operationTime + '][API-GET-Products-By-KodeProduk-Gudang] Kode produk')
        console.log(reqParams[0])
        console.log('[' + operationTime + '][API-GET-Products-By-KodeProduk-Gudang] Gudang')
        console.log(reqParams[1])
        console.log('[' + operationTime + '][API-GET-Products-By-KodeProduk-Gudang] Page')
        console.log(reqParams[2])

        console.log(reqParams)

        const pageNumber = parseInt(reqParams[2])

        const products = await db
            .collection("products")
            .find({
                kodeProduk: {
                    $regex: reqParams[0]
                },
                gudang: {
                    $regex: reqParams[1]
                }})
            .skip(pageNumber > 0 ? ((pageNumber - 1) * numPerPage) : 0)
            .limit(numPerPage)
            .toArray()

        console.log('[' + operationTime + '][API-GET-Products-By-KodeProduk-Gudang] Fetched products')
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
