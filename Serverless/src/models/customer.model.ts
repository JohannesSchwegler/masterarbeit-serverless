import * as AWS from "aws-sdk";
import { TransactWriteItemsInput } from "aws-sdk/clients/dynamodb";
import { v4 as UUID } from "uuid";
import databaseService from "../services/database.service";
import { Item } from "./item.model";
import Repository from "./repository.interface";

interface CustomerlDto {
  id?: string;
  name: string;
  surname: string;
  age: number;
  city: string;
  email: string;
}

export default class CustomerModel extends Item {
  private _id: string;
  private _name: string;
  private _surname: string;
  private _age: number;
  private _city: string;
  private readonly _email: string;

  constructor({
    id = UUID(),
    name = "",
    surname = "",
    age = null,
    city = null,
    email = null,
  }: CustomerlDto) {
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

  static get pk(): string {
    //  CUST#${this._id}
    // Removed id to have all customer in the same collection. Adding
    // a gsi may be a better choice in the longrun
    return `CUST`;
  }
  get pk(): string {
    return `CUST`;
  }
  get sk(): string {
    return `${CustomerModel.pk}${this._id}`;
  }

  toItem(): Record<string, unknown> {
    return {
      ...this.keys(),
      ...this.toItemWithoutKeys(),
    };
  }

  toItemWithoutKeys(): CustomerlDto {
    return {
      id: this._id,
      name: this._name,
      surname: this._surname,
      age: this._age,
      city: this._city,
      email: this._email,
    };
  }
}

class CustomerRespository implements Repository<CustomerlDto> {
  create = async (requestData: any): Promise<CustomerlDto> => {
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
    await databaseService.transact_write_items(
      params as unknown as TransactWriteItemsInput,
    );

    return customerModel.toItemWithoutKeys();
  };

  getById = async (id: number): Promise<CustomerlDto> => {
    const params = {
      TableName: process.env.LIST_TABLE,
      Key: {
        PK: CustomerModel.pk,
        SK: `${CustomerModel.pk}${id}`,
      },
    };

    const customer = await databaseService.get(params);
    return (customer as CustomerModel).toItemWithoutKeys();
  };

  list = async (): Promise<Array<CustomerlDto>> => {
    // Initialise DynamoDB PUT parameters
    const params = {
      TableName: process.env.LIST_TABLE,
      KeyConditionExpression: "#pk = :pk AND begins_with(#sk, :sk)",
      ExpressionAttributeValues: {
        ":pk": CustomerModel.pk,
        ":sk": CustomerModel.pk,
      },
      ExpressionAttributeNames: {
        "#pk": "PK",
        "#sk": "SK",
      },
    };
    // Inserts item into DynamoDB table
    const customers = await databaseService.query(params);
    const { Items } = customers;
    console.log("items", Items);
    return Items as unknown as Array<CustomerlDto>;
  };
}
const CUSTOMER_REPOSITORY = new CustomerRespository();
export { CUSTOMER_REPOSITORY };
