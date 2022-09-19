import type { NextApiRequest, NextApiResponse } from "next";
import { getListings } from "../../api/db/listing";

export interface ListingResponse {
    id: string;
    title: string;
    price: number;
    condition: string;
    owner: {
        id: string;
        full_name: string;
        email: string;
    };
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const method = req.method;
        if (method === "GET") {
            const listings = (await getListings()).map((listing) => ({
                id: listing.id,
                title: listing.title,
                price: listing.price,
                condition: listing.condition,
                owner: listing.owner,
            }));

            res.status(200).json(listings);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}