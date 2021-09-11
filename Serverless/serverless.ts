import type { AWS } from "@serverless/typescript";

// Functions
import functions from "./resources/functions";

// DynamoDB
import dynamoDbTables from "./resources/dynamodb-tables";

const serverlessConfiguration: AWS = {
  service: "serverless",
  frameworkVersion: "2",
  custom: {
    region: "${opt:region, self:provider.region}",
    stage: "${opt:stage, self:provider.stage}",
    list_table: "${self:service}-list-table-${opt:stage, self:provider.stage}",
    tasks_table:
      "${self:service}-tasks-table-${opt:stage, self:provider.stage}",
    table_throughputs: {
      prod: 5,
      default: 1,
    },
    table_throughput:
      "${self:custom.table_throughputs.${self:custom.stage}, self:custom.table_throughputs.default}",
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8008,
        inMemory: true,
        heapInitial: "200m",
        heapMax: "1g",
        migrate: true,
        seed: true,
        convertEmptyValues: true,
        // Uncomment only if you already have a DynamoDB running locally
        // noStart: true
      },
    },
    ["serverless-offline"]: {
      httpPort: 3000,
      babelOptions: {
        presets: ["env"],
      },
    },
  },
  plugins: [
    "serverless-bundle",
    "serverless-offline",
    "serverless-dotenv-plugin",
    "serverless-dynamodb-local",
  ],
  package: {
    individually: true,
  },
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      REGION: "${self:custom.region}",
      STAGE: "${self:custom.stage}",
      LIST_TABLE: "${self:custom.list_table}",
      TASKS_TABLE: "${self:custom.tasks_table}",
    },
    lambdaHashingVersion: "20201221",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:DescribeTable",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
        ],
        Resource: [
          { "Fn::GetAtt": ["ListTable", "Arn"] },
          { "Fn::GetAtt": ["TasksTable", "Arn"] },
        ],
      },
    ],
  },
  useDotenv: true,
  // import the function via paths
  functions: functions,

  resources: {
    Resources: dynamoDbTables,
  },
};

module.exports = serverlessConfiguration;
