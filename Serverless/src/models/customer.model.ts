import { v4 as UUID } from "uuid";

// Interfaces
interface IProps {
  id?: string;
  name: string;
  surname: string;
  age: number;
  city?: string;
  email?: string;
}

export default class CustomerModel {
  private _id: string;
  private _name: string;
  private _surname: string;
  private _age: number;
  private _city: string;
  private _email: string;

  constructor({
    id = UUID(),
    name = "",
    surname = "",
    age = null,
    city = null,
    email = null,
  }: IProps) {
    this._id = id;
    this._name = name;
    this._surname = surname;
    this._age = age;
    this._city = city;
    this._email = email;
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
   * Get City
   * @return {string|*}
   */
  getCity() {
    return this._city;
  }

  /**
   * Get Email
   * @return {string|*}
   */
  getEmail() {
    return this._email;
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
      city: this.getCity(),
      email: this.getEmail(),
    };
  }
}
