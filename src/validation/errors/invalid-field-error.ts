export class InvalidFieldError extends Error {
  constructor(readonly field: string) {
    super(`${field} is invalid.`);
  }
}
