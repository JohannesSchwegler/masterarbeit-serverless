import * as AWS from "aws-sdk";
import { TransactWriteItemsInput } from "aws-sdk/clients/dynamodb";
import { BusinessObject } from "src/shared/business-object.class";
import Access from "src/interfaces/access.interface";
import { v4 as UUID } from "uuid";
import databaseService from "@/shared/database.service";
interface SaleOrderDto {
  id?: string;
  customerId: string;
  materialId: string;
  price: number;
}

export default class SaleOrder extends BusinessObject {
  private _id: string;
  private _customerId: string;
  private _materialId: string;
  private _price: number;

  constructor({
    id = UUID(),
    customerId = "",
    materialId = "",
    price,
  }: SaleOrderDto) {
    super();
    this._id = id;
    this._customerId = customerId;
    this._materialId = materialId;
    this._price = price;
  }

  get id(): string {
    return this._id;
  }

  static get pk(): string {
    //  CUST#${this._id}
    // Removed id to have all customer in the same collection. Adding
    // a gsi may be a better choice in the longrun
    return `SO`;
  }
  get pk(): string {
    return `SO`;
  }
  get sk(): string {
    return `${SaleOrder.pk}${this._id}`;
  }

  toItem(): Record<string, unknown> {
    return {
      ...this.keys(),
      ...this.toDTO(),
    };
  }

  toDTO(): SaleOrderDto {
    return {
      id: this._id,
      customerId: this._customerId,
      materialId: this._materialId,
      price: this._price,
    };
  }
}

class SaleOrderRespository implements Access<SaleOrderDto, number> {
  create = async (requestData: any): Promise<SaleOrderDto> => {
    const customerBusinessObject = new SaleOrder(requestData);
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

  read = async (id: number): Promise<SaleOrderDto> => {
    const params = {
      TableName: process.env.LIST_TABLE,
      Key: {
        PK: SaleOrder.pk,
        SK: `${SaleOrder.pk}${id}`,
      },
    };

    const customer = await databaseService.get(params);
    return (customer as SaleOrder).toDTO();
  };

  update = async (id: number): Promise<SaleOrderDto> => {
    const params = {
      TableName: process.env.LIST_TABLE,
      Key: {
        PK: SaleOrder.pk,
        SK: `${SaleOrder.pk}${id}`,
      },
    };

    const customer = await databaseService.get(params);
    return (customer as SaleOrder).toDTO();
  };

  delete = async (id: number): Promise<SaleOrderDto> => {
    const params = {
      TableName: process.env.LIST_TABLE,
      Key: {
        PK: SaleOrder.pk,
        SK: `${SaleOrder.pk}${id}`,
      },
    };

    const customer = await databaseService.get(params);
    return (customer as SaleOrder).toDTO();
  };

  list = async (): Promise<Array<SaleOrderDto>> => {
    // Initialise DynamoDB PUT parameters
    const params = {
      TableName: process.env.LIST_TABLE,
      KeyConditionExpression: "#pk = :pk AND begins_with(#sk, :sk)",
      ExpressionAttributeValues: {
        ":pk": SaleOrder.pk,
        ":sk": SaleOrder.pk,
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
    return Items as unknown as Array<SaleOrderDto>;
  };
}
const SALE_ORDER_REPOSITORY = new SaleOrderRespository();
export { SALE_ORDER_REPOSITORY };
