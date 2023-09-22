import clientPromise from "../../../../lib/mongodb"
import { numPerPage } from "../../../../utils/helpers"


export default async (req, res) => {
    const operationTime = new Date()

    try {
        const client = await clientPromise;
        const db = client.db("prod_product_inv");

        const reqParam = req.query.id
        console.log('[' + operationTime + '][API-GET-Historicals-By-ALL] Page')
        console.log(reqParam)

        const pageNumber = parseInt(reqParam)

        const histories = await db
            .collection("historicals")
            .find()
            .skip(pageNumber > 0 ? ((pageNumber - 1) * numPerPage) : 0)
            .limit(numPerPage)
            .toArray()

        console.log('[' + operationTime + '][API-GET-Historicals-By-ALL] Fetched histories')
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
