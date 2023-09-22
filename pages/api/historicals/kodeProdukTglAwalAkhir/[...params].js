import clientPromise from "../../../../lib/mongodb"
import { numPerPage } from "../../../../utils/helpers"


export default async (req, res) => {
    const operationTime = new Date()

    try {
        const client = await clientPromise;
        const db = client.db("prod_product_inv");

        const reqParams = req.query.params

        console.log('[' + operationTime + '][API-GET-Historicals-By-KodeProdukTglAwalAkhir] Kode produk')
        console.log(reqParams[0])

        console.log('[' + operationTime + '][API-GET-Historicals-By-KodeProdukTglAwalAkhir] Tgl Aksi Awal')
        console.log(reqParams[1])
        console.log(new Date(reqParams[1]).toISOString())

        console.log('[' + operationTime + '][API-GET-Historicals-By-KodeProdukTglAwalAkhir] Tgl Aksi Akhir')
        console.log(reqParams[2])
        console.log(new Date(reqParams[2]).toISOString())

        console.log('[' + operationTime + '][API-GET-Historicals-By-KodeProdukTglAwalAkhir] Page')
        console.log(reqParams[3])

        const pageNumber = parseInt(reqParams[3])

        const histories = await db
            .collection("historicals")
            .find({
                kodeProduk: {
                    $regex: reqParams[0]
                },
                tanggalUbah: {
                    $gte: new Date(reqParams[1]).toISOString()
                },
                tanggalUbah: {
                    $lte: new Date(reqParams[2]).toISOString()
                }})
            .skip(pageNumber > 0 ? ((pageNumber - 1) * numPerPage) : 0)
            .limit(numPerPage)
            .toArray()

        console.log('[' + operationTime + '][API-GET-Historicals-By-KodeProdukTglAwalAkhir] Fetched histories')
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
