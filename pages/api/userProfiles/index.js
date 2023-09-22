import clientPromise from "../../../lib/mongodb"


export default async (req, res) => {
    const client = await clientPromise;
    const db = client.db("prod_product_inv");

    if (req.method !== "GET") {
        res.status(405).json({ message: 'Only GET request allowed', tipeEndpoint: 'userProfile'})
    }

    try {
        const userProfiles = await db
            .collection("user_profiles")
            .find()
            .toArray()

        console.log("[API-GET-UserProfiles] Fetched profiles")
        console.log(userProfiles)

        res.status(200).json({ message: userProfiles, tipeEndpoint: 'userProfile' });
    } catch (e) {
        res.status(405).json({ message: e.message, profilID: profilID, tipeEndpoint: 'userProfile' })
    }
}
