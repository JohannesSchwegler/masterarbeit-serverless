import { v4 as UUID } from "uuid";

// Interfaces
interface IProps {
  id?: string;
  customerId: string;
  materialCode: string;
  price: number;
}

export default class OrderModel {
  private _id: string;
  private _customerId: string;
  private _materialCode: string;
  private _price: number;

  constructor({
    id = UUID(),
    customerId = "",
    materialCode,
    price = 0,
  }: IProps) {
    this._id = id;
    this._customerId = customerId;
    this._materialCode = materialCode;
    this._price = price;
  }

  /**
   * Get Base entity mappings
   * @return {IListInterface}
   */
  getEntityMappings(): IProps {
    return {
      id: this._id,
      customerId: this._customerId,
      materialCode: this._materialCode,
      price: this._price,
    };
  }
}
