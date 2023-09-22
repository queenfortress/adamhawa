import clientPromise from "../../../../lib/mongodb"
import { ObjectId } from 'mongodb'


export default async (req, res) => {
    const client = await clientPromise;
    const db = client.db("prod_product_inv");

    const profilID = req.query.id

    if (req.method === "GET") {
        try {
            console.log("[API-GET-UserProfiles-By-ID] ID Profile to fetch")
            console.log(profilID)

            const profiles = await db
                .collection("user_profiles")
                .find({_id: new ObjectId(profilID)})
                .toArray()

            console.log("[API-GET-UserProfiles-By-ID] Fetched profiles")
            console.log(profiles)

            res.status(200).json({ message: profiles })
        } catch (e) {
            res.status(405).json({ message: e.message, profilID: profilID })
        }
    } else if (req.method === "PUT") {
        try {
            console.log("[API-PUT-UserProfiles] ID Profile to update")
            console.log(profilID)
            console.log("[API-PUT-UserProfiles] New profile info: " + JSON.stringify(req.body))

            const profile = await db
                .collection("user_profiles")
                .updateOne(
                    {
                        _id: new ObjectId(profilID)
                    }, 
                    { 
                        $set: req.body
                    })

            console.log("[API-PUT-UserProfiles] Profile was updated: " + JSON.stringify(profile))
            res.status(200).json({
                message: profile, 
                profilID: profilID, 
                tipeEndpoint: 'userProfile',
                resStatus: 200 })
        } catch (e) {
            res.status(405).json({
                message: e.message, 
                profilID: profilID, 
                tipeEndpoint: 'userProfile',
                resStatus: 405 })
        }
    } else if (req.method === "DELETE") {
        try {
            console.log("[API-DELETE-UserProfiles] ID Profile to remove")
            console.log(profilID)

            const profile = await db
                .collection("user_profiles")
                .deleteOne({
                    _id: new ObjectId(profilID)
                })

            console.log("[API-DELETE-UserProfiles] Profile was removed: " + JSON.stringify(profile))
            res.status(200).json({
                message: profile, 
                profilID: profilID,
                tipeEndpoint: 'userProfile',
                resStatus: 200 })
        } catch (e) {
            res.status(405).json({
                message: e.message,
                profilID: profilID,
                tipeEndpoint: 'userProfile',
                resStatus: 405 })
        }
    }
}
