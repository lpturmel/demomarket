import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const _client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.ENV_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.ENV_AWS_SECRET_ACCESS_KEY!,
    },
});

export const client = DynamoDBDocumentClient.from(_client);
