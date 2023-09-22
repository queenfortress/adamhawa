import clientPromise from "../../../../lib/mongodb"
import { numPerPage } from "../../../../utils/helpers"


export default async (req, res) => {
    const operationTime = new Date()

    try {
        const client = await clientPromise;
        const db = client.db("prod_product_inv");

        const reqParams = req.query.params

        console.log('[' + operationTime + '][API-GET-Historicals-By-TglAwal] Tgl Aksi Awal')
        console.log(reqParams[0])
        console.log(new Date(reqParams[0]).toISOString())

        console.log('[' + operationTime + '][API-GET-Historicals-By-TglAwal] Page')
        console.log(reqParams[1])

        const pageNumber = parseInt(reqParams[1])

        const histories = await db
            .collection("historicals")
            .find({
                tanggalUbah: {
                    $gte: new Date(reqParams[0]).toISOString()
                }})
            .skip(pageNumber > 0 ? ((pageNumber - 1) * numPerPage) : 0)
            .limit(numPerPage)
            .toArray()

        console.log('['+ operationTime + '][API-GET-Historicals-By-TglAwal] Fetched histories')
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
