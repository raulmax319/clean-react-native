export class UnauthorizedError extends Error {
  constructor() {
    super('Credentials are invalid');
    this.name = 'UnauthorizedError';
  }
}
