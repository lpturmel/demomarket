import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { ENTITY_INDEX, PROJECT_ID } from "utils";
import { client } from "../client";

export interface Entity {
    id: string;
    title: string;
    owner: {
        id: string;
        name: string;
        email: string;
    };
    price: number;
    condition: string;
}
export const getListings = async () => {
    const req = new QueryCommand({
        TableName: `${PROJECT_ID}-table`,
        IndexName: ENTITY_INDEX.name,
        KeyConditionExpression: "#entity = :entity and begins_with(#sk, :sk)",
        ExpressionAttributeNames: {
            "#entity": ENTITY_INDEX.partitionKey,
            "#sk": ENTITY_INDEX.sortKey,
        },
        ExpressionAttributeValues: {
            ":entity": "listing",
            ":sk": "#listing",
        },
    });
    const { Items } = await client.send(req);
    return Items as Entity[];
};
export interface ICreateListing {
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
export const createListing = async (opts: ICreateListing) => {
    const newListing = {
        id: opts.id,
        sk: "#listing" + opts.id,
        entity: "listing",
        email: opts.owner.email,
        title: opts.title,
        price: opts.price,
        condition: opts.condition,
        owner: opts.owner,
    };
    const putRequest = new PutCommand({
        TableName: `${PROJECT_ID}-table`,
        Item: newListing,
    });
    await client.send(putRequest);
    return newListing;
};
