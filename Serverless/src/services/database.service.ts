import * as AWS from "aws-sdk";
import IConfig from "src/interfaces/config.interface";

// Models
import ResponseModel from "../models/response.model";

// Interfaces

// Enums

// Put
type PutItem = AWS.DynamoDB.DocumentClient.PutItemInput;
type PutItemOutput = AWS.DynamoDB.DocumentClient.PutItemOutput;

// Batch write
type BatchWrite = AWS.DynamoDB.DocumentClient.BatchWriteItemInput;
type BatchWriteOutPut = AWS.DynamoDB.DocumentClient.BatchWriteItemOutput;

// Update
type UpdateItem = AWS.DynamoDB.DocumentClient.UpdateItemInput;
type UpdateItemOutPut = AWS.DynamoDB.DocumentClient.UpdateItemOutput;

// Query
type QueryItem = AWS.DynamoDB.DocumentClient.QueryInput;
type QueryItemOutput = AWS.DynamoDB.DocumentClient.QueryOutput;

// Get
type GetItem = AWS.DynamoDB.DocumentClient.GetItemInput;
type GetItemOutput = AWS.DynamoDB.DocumentClient.GetItemOutput;

// Delete
type DeleteItem = AWS.DynamoDB.DocumentClient.DeleteItemInput;
type DeleteItemOutput = AWS.DynamoDB.DocumentClient.DeleteItemOutput;

const config: IConfig = { region: "eu-central-1" };
if (process.env.STAGE === process.env.DYNAMODB_LOCAL_STAGE) {
    config.accessKeyId = process.env.DYNAMODB_LOCAL_ACCESS_KEY_ID;
    config.secretAccessKey = process.env.DYNAMODB_LOCAL_SECRET_ACCESS_KEY;
    config.endpoint = process.env.DYNAMODB_LOCAL_ENDPOINT;

    if (process.env.IS_OFFLINE) {
        config.region = "localhost";
    }
}
console.log(config);
AWS.config.update(config);

const documentClient = new AWS.DynamoDB.DocumentClient();

export default class DatabaseService {
  static create = async (params: PutItem): Promise<PutItemOutput> => {
      try {
          return await documentClient.put(params).promise();
      } catch (error) {
          throw new ResponseModel({}, 500, `create-error: ${error}`);
      }
  };

  static batchCreate = async (
      params: BatchWrite,
  ): Promise<BatchWriteOutPut> => {
      try {
          return await documentClient.batchWrite(params).promise();
      } catch (error) {
          throw new ResponseModel({}, 500, `batch-write-error: ${error}`);
      }
  };

  static update = async (params: UpdateItem): Promise<UpdateItemOutPut> => {
      try {
          return await documentClient.update(params).promise();
      } catch (error) {
          throw new ResponseModel({}, 500, `update-error: ${error}`);
      }
  };

  static query = async (params: QueryItem): Promise<QueryItemOutput> => {
      try {
          return await documentClient.query(params).promise();
      } catch (error) {
          throw new ResponseModel({}, 500, `query-error: ${error}`);
      }
  };

  static get = async (params: GetItem): Promise<GetItemOutput> => {
      try {
          return await documentClient.get(params).promise();
      } catch (error) {
          throw new ResponseModel({}, 500, `get-error: ${error}`);
      }
  };

  static delete = async (params: DeleteItem): Promise<DeleteItemOutput> => {
      try {
          return await documentClient.delete(params).promise();
      } catch (error) {
          throw new ResponseModel({}, 500, `delete-error: ${error}`);
      }
  };
}
