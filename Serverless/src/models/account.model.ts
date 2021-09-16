import { v4 as UUID } from "uuid";

// Interfaces
interface IProps {
  id?: string;
  balance: number;
}

export default class AccountModel {
  private _id: string;
  private _balance: number;

  constructor({ id = UUID(), balance = 0 }: IProps) {
    this._id = id;
    this._balance = balance;
  }

  /**
   * Get Base entity mappings
   * @return {IListInterface}
   */
  getEntityMappings(): IProps {
    return {
      id: this._id,
      balance: this._balance,
    };
  }
}
