import databaseService from "src/services/database.service";
import { v4 as UUID } from "uuid";
import { Item } from "./item.model";
import Repository from "./repository.interface";

// Interfaces
interface AccountDto {
  id?: string;
  balance: number;
}

export default class AccountModel extends Item {
  private _id: string;
  private _balance: number;

  constructor({ id = UUID(), balance = 0 }: AccountDto) {
    super();
    this._id = id;
    this._balance = balance;
  }

  static pk() {
    return `ACC`;
  }

  get pk(): string {
    return `ACC`;
  }
  get sk(): string {
    return `${this.pk}${this._id}`;
  }
  toItem(): Record<string, unknown> {
    return {
      ...this.keys(),
      ...this.toItemWithoutKeys(),
    };
  }

  toItemWithoutKeys(): AccountDto {
    return {
      id: this._id,
      balance: this._balance,
    };
  }

  get id(): string {
    return this._id;
  }

  /**
   * Get Base entity mappings
   * @return {IListInterface}
   */
  getEntityMappings(): AccountDto {
    return {
      id: this._id,
      balance: this._balance,
    };
  }
}

class AccountRespository implements Repository<AccountDto> {
  create = async (requestData: any): Promise<AccountDto> => {
    const accountModel = new AccountModel(requestData);

    const params = {
      TableName: process.env.LIST_TABLE,
      Item: {
        ...accountModel.toItem(),
      },
    };

    await databaseService.create(params);
    return accountModel.toItemWithoutKeys();
  };

  getById = async (id: number): Promise<AccountDto> => {
    // Validate against constraints
    // Initialise and hydrate model
    // Initialise DynamoDB PUT parameters
    const params = {
      TableName: process.env.LIST_TABLE,
      Key: {
        PK: AccountModel.pk,
        SK: `${AccountModel.pk}#${id}`,
      },
    };
    // Inserts item into DynamoDB table

    const account = await databaseService.get(params);
    return (account as AccountModel).toItemWithoutKeys();
  };

  list = async (): Promise<Array<AccountDto>> => {
    // Initialise DynamoDB PUT parameters
    const params = {
      TableName: process.env.LIST_TABLE,
      KeyConditionExpression: "#pk = :pk AND begins_with(#sk, :sk)",
      ExpressionAttributeValues: {
        ":pk": AccountModel.pk,
        ":sk": AccountModel.pk,
      },
      ExpressionAttributeNames: {
        "#pk": "PK",
        "#sk": "SK",
      },
    };
    // Inserts item into DynamoDB table
    const accounts = await databaseService.query(params);
    const { Items } = accounts;
    console.log("items", Items);
    return Items as unknown as Array<AccountDto>;
  };
}
const ACCOUNT_RESPOSITORY = new AccountRespository();
export { ACCOUNT_RESPOSITORY };
