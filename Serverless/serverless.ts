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
    lambda_prefix: "masterarbeit",
    table_throughputs: {
      prod: 5,
      default: 5,
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
    [" serverless-offline-sns:"]: {
      port: 4002,
      debug: true,
    },
  },
  plugins: [
    "serverless-bundle",
    "serverless-offline",
    "serverless-dotenv-plugin",
    "serverless-dynamodb-local",
    "serverless-offline-sns",
  ],
  package: {
    individually: true,
  },
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "dev",
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      STAGE: "${self:custom.stage}",
      LIST_TABLE: "${self:custom.list_table}",
      FUNCTION_ARN:
        "arn:aws:lambda::${self:provider.region}:function:${self:service}-${self:provider.stage}-readMaterial",
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
        Resource: [{ "Fn::GetAtt": ["ListTable", "Arn"] }],
      },
      {
        Effect: "Allow",
        Action: ["lambda:InvokeFunction", "lambda:InvokeAsync"],
        Resource: "*",
      },
    ],
  },
  useDotenv: true,
  resources: {
    Resources: {
      AccessLogs: {
        Type: "AWS::Logs::LogGroup",
        Properties: {
          LogGroupName: "/aws/apigateway/${self:service}-AccessLogs",
        },
      },

      ...dynamoDbTables,
    },
  },
  // import the function via paths
  functions: functions,
};

module.exports = serverlessConfiguration;
