import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
import { createListing } from "../../api/db/listing";
import { jwtVerify } from "jose";

export const config = {
    runtime: "experimental-edge",
};
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const method = req.method;
        if (method === "POST") {
            const { title, price, condition } = req.body;

            if (!title || !price || !condition) {
                return res.status(400).json({ name: "Bad Request" });
            }
            const token = req.cookies.token;
            const { payload } = await jwtVerify(
                token!,
                new TextEncoder().encode(process.env.JWT_SECRET!)
            );
            const id = uuid();

            const newListing = await createListing({
                id,
                title,
                price,
                condition,
                owner: {
                    id: payload.id as string,
                    full_name: payload.full_name as string,
                    email: payload.email as string,
                },
            });

            res.status(200).json({
                id: newListing.id,
                title: newListing.title,
                price: newListing.price,
                condition: newListing.condition,
                owner: newListing.owner,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
