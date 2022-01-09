export default interface Repository<T> {
  create(requestData: any): Promise<T>;
  getById(id: number): Promise<T>;
  list(): Promise<Array<T>>;
}
