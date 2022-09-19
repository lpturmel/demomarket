import { GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { EMAIL_INDEX, PROJECT_ID } from "utils";
import { client } from "../client";

export interface User {
    id: string;
    full_name: string;
    email: string;
    password: string;
}

export const getUser = async (id: string) => {
    const req = new GetCommand({
        TableName: `${PROJECT_ID}-table`,
        Key: {
            id,
            sk: "#user",
        },
        ProjectionExpression: "id, full_name, email, password",
    });
    const res = await client.send(req);

    return res.Item as User | null;
};
export const getUserByEmail = async (email: string) => {
    // Request on a GSI
    //
    // We cannot use GetCommand as previously since it is on a GSI
    const req = new QueryCommand({
        TableName: `${PROJECT_ID}-table`,
        IndexName: EMAIL_INDEX.name,
        KeyConditionExpression: "email = :email AND begins_with(sk, :sk)",
        ProjectionExpression: "id, full_name, email, password",
        ExpressionAttributeValues: {
            ":email": email,
            ":sk": "#user",
        },
    });
    const res = await client.send(req);
    return res.Items![0] as User | null;
};
interface ICreateUser {
    id: string;
    email: string;
    name: string;
    hash: string;
}
export const createUser = async (opts: ICreateUser) => {
    const newUser = {
        id: opts.id,
        sk: "#user",
        email: opts.email,
        // The reason we call it full_name here is because it is a reserved word in DynamoDB
        // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html
        full_name: opts.name,
        password: opts.hash,
    };
    const putRequest = new PutCommand({
        TableName: `${PROJECT_ID}-table`,
        Item: newUser,
    });
    await client.send(putRequest);
};
