#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { InfraStack } from "../lib/infra-stack";

const app = new cdk.App();
new InfraStack(app, "demomarket", {
    env: {
        account: "028071413917",
        region: "us-east-1",
    },
});
