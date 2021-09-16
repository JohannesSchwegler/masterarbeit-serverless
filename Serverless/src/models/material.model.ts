import { v4 as UUID } from "uuid";

// Interfaces
interface IProps {
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

export default class MaterialModel {
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
  }: IProps) {
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

  /**
   * Get Base entity mappings
   * @return {IListInterface}
   */
  getEntityMappings(): IProps {
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
