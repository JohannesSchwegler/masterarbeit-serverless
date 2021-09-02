import { v4 as UUID } from "uuid";

// Interfaces
interface IProps {
  id?: string;
  name: string;
  surname: string;
  age: number;
}

export default class CustomerModel {
  private _id: string;
  private _name: string;
  private _surname: string;
  private _age: number;

  constructor({ id = UUID(), name = "", surname = "", age = 1 }: IProps) {
      this._id = id;
      this._name = name;
      this._surname = surname;
      this._age = age;
  }

  /**
   * Set Id
   * @param value
   */
  setId(value: string) {
      this._id = value !== "" ? value : null;
  }

  /**
   * Get Id
   * @return {string|*}
   */
  getId() {
      return this._id;
  }

  /**
   * Set Name
   * @param value
   */
  setName(value: string) {
      this._name = value !== "" ? value : null;
  }

  /**
   * Get Name
   * @return {string|*}
   */
  getName() {
      return this._name;
  }

  /**
   * Get surname
   * @return {string|*}
   */
  getSurname() {
      return this._surname;
  }

  /**
   * Get Age
   * @return {number|*}
   */
  getAge() {
      return this._age;
  }

  /**
   * Get Base entity mappings
   * @return {IListInterface}
   */
  getEntityMappings(): IProps {
      return {
          id: this.getId(),
          name: this.getName(),
          surname: this.getSurname(),
          age: this.getAge(),
      };
  }
}
