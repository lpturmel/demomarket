import { useMutation } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { doCreateListing } from "../../api/listing";
export { getServerSideProps } from "../../utils/page";

const CreateListing: NextPage = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0.0);
    const [condition, setCondition] = useState("");
    const disabled = useMemo(() => {
        return !title || price == 0.0 || !condition;
    }, [title, price, condition]);
    const createListing = useMutation(doCreateListing, {
        onSuccess: () => {
            router.push("/");
        },
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!disabled) {
            createListing.mutate({
                title,
                price,
                condition,
            });
        }
    };
    return (
        <div className="container max-w-lg m-auto">
            <form className="form-control" onSubmit={onSubmit}>
                <div className="w-full flex flex-col gap-4">
                    <p className="text-2xl font-bold"> New Listing </p>
                    <label className="input-group">
                        <span className="w-24">Title</span>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                            placeholder="Title..."
                            className="input input-bordered w-full"
                        />
                    </label>
                    <label className="input-group">
                        <span className="w-24">Price</span>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) =>
                                setPrice(parseInt(e.currentTarget.value))
                            }
                            placeholder="price..."
                            className="input input-bordered w-full"
                        />
                        <span>USD</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        value={condition}
                        onChange={(e) => setCondition(e.currentTarget.value)}
                    >
                        <option disabled>Condition</option>
                        <option>New</option>
                        <option>Used - Like New</option>
                        <option>Used - Good </option>
                        <option>Used - Fair</option>
                    </select>
                    <button
                        disabled={disabled}
                        className="btn btn-primary"
                        type="submit"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateListing;
