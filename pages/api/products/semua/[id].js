import clientPromise from "../../../../lib/mongodb"
import { numPerPage } from "../../../../utils/helpers"


export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("prod_product_inv");

        const reqParam = req.query.id
        console.log('[API-GET-Products-By-ALL] Page')
        console.log(reqParam)

        const pageNumber = parseInt(reqParam)

        console.log(numPerPage)

        const products = await db
            .collection("products")
            .find()
            .skip(pageNumber > 0 ? ((pageNumber - 1) * numPerPage) : 0)
            .limit(numPerPage)
            .toArray()

        console.log('[API-GET-Products-By-ALL] Fetched products')
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
