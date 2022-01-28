import * as AWS from "aws-sdk";
import { TransactWriteItemsInput } from "aws-sdk/clients/dynamodb";
import { BusinessObject } from "src/shared/business-object.class";
import Access from "src/interfaces/access.interface";
import { v4 as UUID } from "uuid";
import databaseService from "@/shared/database.service";
interface AccountingDto {
  id?: string;
  customerId: string;
  amount: number;
}

export default class Accounting extends BusinessObject {
  private _id: string;
  private _customerId: string;
  private _amount: number;

  constructor({ id = UUID(), customerId = "", amount = 0 }: AccountingDto) {
    super();
    this._id = id;
    this._customerId = customerId;
    this._amount = amount;
  }

  get id(): string {
    return this._id;
  }

  static get pk(): string {
    //  CUST#${this._id}
    // Removed id to have all customer in the same collection. Adding
    // a gsi may be a better choice in the longrun
    return `ACC`;
  }
  get pk(): string {
    return `ACC`;
  }
  get sk(): string {
    return `${Accounting.pk}${this._id}`;
  }

  toItem(): Record<string, unknown> {
    return {
      ...this.keys(),
      ...this.toDTO(),
    };
  }

  toDTO(): AccountingDto {
    return {
      id: this._id,
      customerId: this._customerId,
      amount: this._amount,
    };
  }
}

class AccountingRespository implements Access<AccountingDto, number> {
  create = async (requestData: any): Promise<AccountingDto> => {
    const accountingBusinessObject = new Accounting(requestData);
    const documentClient = new AWS.DynamoDB.DocumentClient({
      correctClockSkew: true,
    });

    const params = {
      TransactItems: [
        {
          Put: {
            TableName: process.env.LIST_TABLE,
            Item: {
              ...accountingBusinessObject.toItem(),
            },
          },
        },
        {
          Update: {
            TableName: process.env.LIST_TABLE,
            Key: {
              PK: `ACCOUNTINGS`,
              SK: `ACCOUNTINGS`,
            },
            UpdateExpression: "ADD Customers :customers",
            ExpressionAttributeValues: {
              ":customers": documentClient.createSet([
                accountingBusinessObject.id,
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

    return accountingBusinessObject.toDTO();
  };

  read = async (id: number): Promise<AccountingDto> => {
    const params = {
      TableName: process.env.LIST_TABLE,
      Key: {
        PK: Accounting.pk,
        SK: `${Accounting.pk}${id}`,
      },
    };

    const customer = await databaseService.get(params);
    return (customer as Accounting).toDTO();
  };

  update = async (id: number): Promise<AccountingDto> => {
    const params = {
      TableName: process.env.LIST_TABLE,
      Key: {
        PK: Accounting.pk,
        SK: `${Accounting.pk}${id}`,
      },
    };

    const customer = await databaseService.get(params);
    return (customer as Accounting).toDTO();
  };

  delete = async (id: number): Promise<AccountingDto> => {
    const params = {
      TableName: process.env.LIST_TABLE,
      Key: {
        PK: Accounting.pk,
        SK: `${Accounting.pk}${id}`,
      },
    };

    const customer = await databaseService.get(params);
    return (customer as Accounting).toDTO();
  };

  list = async (): Promise<Array<AccountingDto>> => {
    // Initialise DynamoDB PUT parameters
    const params = {
      TableName: process.env.LIST_TABLE,
      KeyConditionExpression: "#pk = :pk AND begins_with(#sk, :sk)",
      ExpressionAttributeValues: {
        ":pk": Accounting.pk,
        ":sk": Accounting.pk,
      },
      ExpressionAttributeNames: {
        "#pk": "PK",
        "#sk": "SK",
      },
    };
    // Inserts item into DynamoDB table
    const customers = await databaseService.query(params);
    const { Items } = customers;
    return Items as unknown as Array<AccountingDto>;
  };
}
const ACCOUNTING_REPOSITORY = new AccountingRespository();
export { ACCOUNTING_REPOSITORY };
