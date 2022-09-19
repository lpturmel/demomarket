import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { SignJWT } from "jose";
import { v4 as uuid } from "uuid";
import { createUser } from "../../lib/db/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const method = req.method;
        if (!(method === "POST")) {
            res.status(405).json({ name: "Method Not Allowed" });
        }

        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({ name: "Bad Request" });
        }

        const passwordHash = await hash(password, 10);

        const id = uuid();

        await createUser({
            id,
            email,
            name,
            hash: passwordHash,
        });

        const iat = Math.floor(Date.now() / 1000);
        const exp = iat + 3600 * 24 * 7;
        const payload = {
            email,
            full_name: name,
            id,
        };
        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setExpirationTime(exp)
            .setIssuedAt(iat)
            .setNotBefore(iat)
            .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

        res.setHeader(
            "Set-Cookie",
            `token=${token}; max-age=${exp}; HttpOnly; Secure; path=/; SameSite=None;`
        );

        res.status(200).json(payload);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
