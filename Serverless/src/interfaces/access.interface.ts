export default interface Access<T, ID> {
  create(requestData: any): Promise<T>;
  read(id: ID): Promise<T>;
  update(id: ID): Promise<T>;
  delete(id: ID): Promise<T>;
}
