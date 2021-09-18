import { v4 as UUID } from "uuid";

// Interfaces
interface IProps {
  id?: string;
  customerId: string;
  materials: string[];
  price: number;
}

export default class OrderModel {
  private _id: string;
  private _customerId: string;
  private _materials: string[];
  private _price: number;

  constructor({
    id = UUID(),
    customerId = "",
    materials = [],
    price = 0,
  }: IProps) {
    this._id = id;
    this._customerId = customerId;
    this._materials = materials;
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
      materials: this._materials,
      price: this._price,
    };
  }
}
