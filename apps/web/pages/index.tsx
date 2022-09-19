import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { Suspense } from "react";
import { User } from "../lib/db/user";
import ListingItem from "../components/ListingItem";
import { ListingResponse } from "./api/listings";
export { getServerSideProps } from "../utils/page";

interface PageProps {
    user?: User;
}
const Home: NextPage<PageProps> = (props) => {
    const { data } = useQuery<ListingResponse[]>(["listings"], async () => {
        const res = await fetch("/api/listings");
        const data = await res.json();
        if (res.status !== 200) {
            throw new Error(data.name);
        }
        return data;
    });
    return (
        <div className="m-auto container max-w-xl flex flex-col gap-8">
            <div className="flex w-full items-center justify-between">
                <p className="text-3xl font-bold">Market</p>
                {props.user && (
                    <a className="btn" href="/listing/create">
                        Create Listing
                    </a>
                )}
            </div>
            <div className="flex flex-col gap-4">
                <Suspense
                    fallback={<div className="animate-pulse">Loading...</div>}
                >
                    {data?.map((listing) => (
                        <ListingItem key={listing.id} listing={listing} />
                    ))}
                </Suspense>
            </div>
        </div>
    );
};

export default Home;
