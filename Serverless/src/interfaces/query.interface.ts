export default interface Query<T> {
  list(): Promise<Array<T>>;
  findById(id: number): Promise<T>;
  search(input: string): Promise<Array<T>>;
}
