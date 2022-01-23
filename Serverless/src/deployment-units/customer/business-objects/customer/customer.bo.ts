import * as AWS from "aws-sdk";
import { TransactWriteItemsInput } from "aws-sdk/clients/dynamodb";
import { v4 as UUID } from "uuid";
import databaseService from "@/shared/database.service";
import { BusinessObject } from "src/shared/business-object.class";
import Access from "src/interfaces/access.interface";

interface CustomerDto {
  id?: string;
  name: string;
  surname: string;
  age: number;
  city: string;
  email: string;
}

export default class Customer extends BusinessObject {
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
  }: CustomerDto) {
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
    return `${Customer.pk}${this._id}`;
  }

  toItem(): Record<string, unknown> {
    return {
      ...this.keys(),
      ...this.toDTO(),
    };
  }

  toDTO(): CustomerDto {
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

class CustomerRespository implements Access<CustomerDto, number> {
  create = async (requestData: any): Promise<CustomerDto> => {
    console.log("create Repose");
    const customerBusinessObject = new Customer(requestData);
    const documentClient = new AWS.DynamoDB.DocumentClient({
      correctClockSkew: true,
    });

    const params = {
      TransactItems: [
        {
          Put: {
            TableName: process.env.LIST_TABLE,
            Item: {
              ...customerBusinessObject.toItem(),
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
              ":customers": documentClient.createSet([
                customerBusinessObject.id,
              ]),
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

    return customerBusinessObject.toDTO();
  };

  read = async (id: number): Promise<CustomerDto> => {
    const params = {
      TableName: process.env.LIST_TABLE,
      Key: {
        PK: Customer.pk,
        SK: `${Customer.pk}${id}`,
      },
    };

    const customer = await databaseService.get(params);
    return (customer as Customer).toDTO();
  };

  update = async (id: number): Promise<CustomerDto> => {
    const params = {
      TableName: process.env.LIST_TABLE,
      Key: {
        PK: Customer.pk,
        SK: `${Customer.pk}${id}`,
      },
    };

    const customer = await databaseService.get(params);
    return (customer as Customer).toDTO();
  };

  delete = async (id: number): Promise<CustomerDto> => {
    const params = {
      TableName: process.env.LIST_TABLE,
      Key: {
        PK: Customer.pk,
        SK: `${Customer.pk}${id}`,
      },
    };

    const customer = await databaseService.get(params);
    return (customer as Customer).toDTO();
  };

  list = async (): Promise<Array<CustomerDto>> => {
    // Initialise DynamoDB PUT parameters
    const params = {
      TableName: process.env.LIST_TABLE,
      KeyConditionExpression: "#pk = :pk AND begins_with(#sk, :sk)",
      ExpressionAttributeValues: {
        ":pk": Customer.pk,
        ":sk": Customer.pk,
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
    return Items as unknown as Array<CustomerDto>;
  };
}
const CUSTOMER_REPOSITORY = new CustomerRespository();
export { CUSTOMER_REPOSITORY };
