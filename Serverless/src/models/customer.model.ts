import { v4 as UUID } from "uuid";
import { Item } from "./item.model";
import DynamoDB from "aws-sdk/clients/dynamodb";
import { validateAgainstConstraints } from "../utils/util";
import CreateCustomerValidator from "../validators/customer/create.validator";
import * as AWS from "aws-sdk";
import databaseService from "../services/database.service";

export default class CustomerModel extends Item {
  private _id: string;
  private _name: string;
  private _surname: string;
  private _age: number;
  private _city: string;
  private _email: string;

  constructor({
    id = UUID(),
    name = "",
    surname = "",
    age = null,
    city = null,
    email = null,
  }) {
    super();
    this._id = id;
    this._name = name;
    this._surname = surname;
    this._age = age;
    this._city = city;
    this._email = email;
  }

  get id(): string {
    return this._id;
  }

  get pk(): string {
    return `CUST#${this._id}`;
  }

  get sk(): string {
    return `CUST#${this._id}`;
  }

  toItem(): Record<string, unknown> {
    return {
      ...this.keys(),
      ...this.toItemWithoutKeys(),
    };
  }

  toItemWithoutKeys(): Record<string, unknown> {
    return {
      id: this._id,
      name: this._name,
      surname: this._surname,
      age: this._age,
      city: this._city,
      email: this._email,
    };
  }

  static fromItem(item?: DynamoDB.AttributeMap): CustomerModel {
    if (!item) throw new Error("No item!");
    return new CustomerModel(item);
  }
}

export const createCustomer = async (
  requestData: any,
): Promise<CustomerModel> => {
  // Validate against constraints
  // Initialise and hydrate model
  const customerModel = new CustomerModel(requestData);
  const documentClient = new AWS.DynamoDB.DocumentClient();
  // Make a batchWrite-Operation to check if user already exists and then add user to
  // the set of user-ids. For more details refer to the access patterns for the user
  const params = {
    TransactItems: [
      {
        Put: {
          TableName: process.env.LIST_TABLE,
          Item: {
            ...customerModel.toItem(),
          },
        },
      },
      {
        Update: {
          TableName: process.env.LIST_TABLE,
          Key: {
            PK: `CUSTOMERS`,
            SK: `CUSTOMERS`,
          },
          UpdateExpression: "ADD Customers :customers",
          ExpressionAttributeValues: {
            ":customers": documentClient.createSet([customerModel.id]),
          },
          ReturnValues: "UPDATED_NEW",
        },
      },
    ],
  };

  // Inserts item into DynamoDB table
  //https://stackoverflow.com/questions/42103263/aws-dynamodb-how-to-achieve-in-1-call-add-value-to-set-if-set-exists-or-el
  await databaseService.transact_write_items(params);
  return customerModel;
};
