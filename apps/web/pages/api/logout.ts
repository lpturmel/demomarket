import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
    runtime: "experimental-edge",
};
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const method = req.method;
        if (!(method === "POST")) {
            res.status(405).json({ name: "Method Not Allowed" });
        }
        res.setHeader(
            "Set-Cookie",
            `token=; max-age=${0}; HttpOnly; Secure; path=/; SameSite=None;`
        );

        res.status(302).redirect("/login");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
