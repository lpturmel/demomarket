import { FunctionComponent } from "react";
export interface ListingItemProps {
    listing: {
        title: string;
        price: number;
        condition: string;
        owner: {
            id: string;
            full_name: string;
            email: string;
        };
    };
}
const ListingItem: FunctionComponent<ListingItemProps> = ({ listing }) => {
    return (
        <div className="card w-96 bg-base-200 shadow-xl">
            <div className="card-body">
                <p className="text-xs">{listing.owner.full_name}</p>
                <p className="card-title">{listing.price}$</p>
                <h2 className="">{listing.title}</h2>

                <div className="card-actions justify-end">
                    <button className="btn btn-sm btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ListingItem;
