export class ApiResponse<T> {
  constructor(
    public statusCode: number,
    public data: T,
    public message = 'Success',
  ) {}

  get success() {
    return this.statusCode < 400;
  }
}