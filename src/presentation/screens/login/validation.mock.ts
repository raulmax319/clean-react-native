import { Validation } from '~/presentation/protocols/validation';

export class ValidationSpy implements Validation {
  input: unknown;
  errorMessage: string;
  validate(input: unknown): string {
    this.input = input;
    return this.errorMessage;
  }
}
