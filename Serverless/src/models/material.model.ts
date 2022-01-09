import { v4 as UUID } from "uuid";
import { Item } from "./item.model";
import databaseService from "../services/database.service";
import Repository from "./repository.interface";
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

export default class MaterialModel extends Item {
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

  get pk(): string {
    return `MAT`;
  }
  get sk(): string {
    return `MAT#${this._id}`;
  }
  toItem(): Record<string, unknown> {
    return {
      ...this.keys(),
      ...this.toItemWithoutKeys(),
    };
  }

  toItemWithoutKeys(): MaterialDto {
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

class MaterialRespository implements Repository<MaterialDto> {
  create = async (requestData: any): Promise<MaterialDto> => {
    // Validate against constraints
    // Initialise and hydrate model
    const materialModel = new MaterialModel(requestData);

    const params = {
      TableName: process.env.LIST_TABLE,
      Item: {
        ...materialModel.toItem(),
      },
    };

    await databaseService.create(params);
    return materialModel.toItemWithoutKeys();
  };

  getById = async (id: number): Promise<any> => {
    // Validate against constraints
    // Initialise and hydrate model
    // Initialise DynamoDB PUT parameters
    const params = {
      TableName: process.env.LIST_TABLE,
      Key: {
        PK: `MATERIAL`,
        SK: `MAT#${id}`,
      },
    };
    // Inserts item into DynamoDB table

    const material = await databaseService.get(params);
    return material;
  };

  list = async (): Promise<Array<MaterialDto>> => {
    // Initialise DynamoDB PUT parameters
    const params = {
      TableName: process.env.LIST_TABLE,
      KeyConditionExpression: "#pk = :pk AND begins_with(#sk, :sk)",
      ExpressionAttributeValues: {
        ":pk": "MAT",
        ":sk": "MAT",
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
