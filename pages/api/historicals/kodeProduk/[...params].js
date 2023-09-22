import clientPromise from "../../../../lib/mongodb"
import { numPerPage } from "../../../../utils/helpers"


export default async (req, res) => {
    const operationTime = new Date()

    try {
        const client = await clientPromise;
        const db = client.db("prod_product_inv");

        const reqParams = req.query.params

        console.log('[' + operationTime + '][API-GET-Historicals-By-KodeProduk] Kode produk')
        console.log(reqParams[0])
        console.log('[' + operationTime + '][API-GET-Historicals-By-KodeProduk] Page')
        console.log(reqParams[1])

        const pageNumber = parseInt(reqParams[1])

        const histories = await db
            .collection("historicals")
            .find({
                kodeProduk: {
                    $regex: reqParams[0]
                }})
            .skip(pageNumber > 0 ? ((pageNumber - 1) * numPerPage) : 0)
            .limit(numPerPage)
            .toArray()

        console.log('['+ operationTime + '][API-GET-Historicals-By-KodeProduk] Fetched histories')
        console.log(histories)

        res.status(200).json({ 
            message: histories,
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
