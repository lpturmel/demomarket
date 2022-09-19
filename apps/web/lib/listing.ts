export interface ListingBody {
    title: string;
    price: number;
    condition: string;
}
export const doCreateListing = async (body: ListingBody) => {
    const response = await fetch("/api/listing", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status !== 200) {
        throw new Error(data.name);
    }
    return data;
};
