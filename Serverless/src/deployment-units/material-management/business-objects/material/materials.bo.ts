import * as AWS from "aws-sdk";
import { v4 as UUID } from "uuid";
import databaseService from "@/shared/database.service";
import { BusinessObject } from "src/shared/business-object.class";
import Access from "src/interfaces/access.interface";
import { TransactWriteItemsInput } from "aws-sdk/clients/dynamodb";

// Interfaces
interface MaterialDto {
  id?: string;
  code: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

export default class Material extends BusinessObject {
  private _id: string;
  private _code: string;
  private _name: string;
  private _description: string;
  private _image: string;
  private _category: string;
  private _price: string;
  private _quantity: number;
  private _inventoryStatus: string;
  private _rating: number;

  constructor({
    id = UUID(),
    code = "",
    name = "",
    description = "",
    image = "",
    category = "",
    price = null,
    quantity = null,
    inventoryStatus = "",
    rating = null,
  }: MaterialDto) {
    super();
    this._id = id;
    this._code = code;
    this._name = name;
    this._description = description;
    this._image = image;
    this._category = category;
    this._price = price;
    this._quantity = quantity;
    this._inventoryStatus = inventoryStatus;
    this._rating = rating;
  }

  static get pk(): string {
    //  CUST#${this._id}
    // Removed id to have all customer in the same collection. Adding
    // a gsi may be a better choice in the longrun
    return `MAT`;
  }
  get pk(): string {
    return `MAT`;
  }
  get sk(): string {
    return `MAT#${this._id}`;
  }
  toItem(): Record<string, unknown> {
    return {
      ...this.keys(),
      ...this.toDTO(),
    };
  }

  toDTO(): MaterialDto {
    return {
      id: this._id,
      code: this._code,
      name: this._name,
      description: this._description,
      image: this._image,
      category: this._category,
      price: this._price,
      quantity: this._quantity,
      inventoryStatus: this._inventoryStatus,
      rating: this._rating,
    };
  }

  /**
   * Get Base entity mappings
   * @return {IListInterface}
   */
  getEntityMappings(): MaterialDto {
    return {
      id: this._id,
      code: this._code,
      name: this._name,
      description: this._description,
      image: this._image,
      category: this._category,
      price: this._price,
      quantity: this._quantity,
      inventoryStatus: this._inventoryStatus,
      rating: this._rating,
    };
  }
}

class MaterialRespository implements Access<MaterialDto, number> {
  create = async (requestData: any): Promise<MaterialDto> => {
    const materialBusinessObject = new Material(requestData);
    const documentClient = new AWS.DynamoDB.DocumentClient({
      correctClockSkew: true,
    });

    const params = {
      TransactItems: [
        {
          Put: {
            TableName: process.env.LIST_TABLE,
            Item: {
              ...materialBusinessObject.toItem(),
            },
          },
        },
        {
          Update: {
            TableName: process.env.LIST_TABLE,
            Key: {
              PK: `MATERIALS`,
              SK: `MATERIALS`,
            },
            UpdateExpression: "ADD Materials :materials",
            ExpressionAttributeValues: {
              ":materials": documentClient.createSet([
                materialBusinessObject.pk,
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

    return materialBusinessObject.toDTO();
  };

  read = async (id: number): Promise<MaterialDto> => {
    const params = {
      TableName: process.env.LIST_TABLE,
      Key: {
        PK: Material.pk,
        SK: `${Material.pk}${id}`,
      },
    };

    const material = await databaseService.get(params);
    return (material as Material).toDTO();
  };

  update = async (id: number): Promise<MaterialDto> => {
    const params = {
      TableName: process.env.LIST_TABLE,
      Key: {
        PK: Material.pk,
        SK: `${Material.pk}${id}`,
      },
    };

    const material = await databaseService.get(params);
    return (material as Material).toDTO();
  };

  delete = async (id: number): Promise<MaterialDto> => {
    const params = {
      TableName: process.env.LIST_TABLE,
      Key: {
        PK: Material.pk,
        SK: `${Material.pk}${id}`,
      },
    };

    const material = await databaseService.get(params);
    return (material as Material).toDTO();
  };

  list = async (): Promise<Array<MaterialDto>> => {
    // Initialise DynamoDB PUT parameters
    const params = {
      TableName: process.env.LIST_TABLE,
      KeyConditionExpression: "#pk = :pk AND begins_with(#sk, :sk)",
      ExpressionAttributeValues: {
        ":pk": Material.pk,
        ":sk": Material.pk,
      },
      ExpressionAttributeNames: {
        "#pk": "PK",
        "#sk": "SK",
      },
    };
    // Inserts item into DynamoDB table
    const materials = await databaseService.query(params);
    const { Items } = materials;
    console.log("items", Items);
    return Items as unknown as Array<MaterialDto>;
  };
}
const MATERIAL_RESPOSITORY = new MaterialRespository();
export { MATERIAL_RESPOSITORY };
