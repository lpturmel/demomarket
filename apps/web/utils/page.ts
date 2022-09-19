import { jwtVerify } from "jose";
import { GetServerSideProps } from "next";
import { getUser } from "../api/db/user";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const now = performance.now();
    const token = context.req.cookies.token;

    if (!token) {
        return {
            props: {
                user: null,
            },
        };
    }
    const { payload } = await jwtVerify(
        token!,
        new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    const user = await getUser(payload.id as string);
    console.log("getServerSideProps took", performance.now() - now, "ms");

    return {
        props: {
            user: {
                id: user?.id,
                full_name: user?.full_name,
                email: user?.email,
            },
        },
    };
};
