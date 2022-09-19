import { Stack, StackProps } from "aws-cdk-lib";
import { Table, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { User, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { PROJECT_ID, TABLE_INDEX, EMAIL_INDEX, ENTITY_INDEX } from "utils";

export class InfraStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const table = new Table(this, `${PROJECT_ID}-table`, {
            tableName: `${PROJECT_ID}-table`,
            partitionKey: {
                name: TABLE_INDEX.partitionKey,
                type: AttributeType.STRING,
            },
            sortKey: {
                name: TABLE_INDEX.sortKey,
                type: AttributeType.STRING,
            },
        });
        table.addGlobalSecondaryIndex({
            indexName: EMAIL_INDEX.name,
            partitionKey: {
                name: EMAIL_INDEX.partitionKey,
                type: AttributeType.STRING,
            },
            sortKey: {
                name: EMAIL_INDEX.sortKey,
                type: AttributeType.STRING,
            },
        });
        table.addGlobalSecondaryIndex({
            indexName: ENTITY_INDEX.name,
            partitionKey: {
                name: ENTITY_INDEX.partitionKey,
                type: AttributeType.STRING,
            },
            sortKey: {
                name: ENTITY_INDEX.sortKey,
                type: AttributeType.STRING,
            },
        });

        // Create a service user to access the table in Next
        const sp = new User(this, `${PROJECT_ID}-service-principal`, {
            userName: `sp-${PROJECT_ID}`,
        });
        // Add policies
        sp.addToPolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                actions: ["dynamodb:*"],
                // Grant access to the table index and all the global secondary indexes
                resources: [table.tableArn, table.tableArn + "/index/*"],
            })
        );
    }
}
