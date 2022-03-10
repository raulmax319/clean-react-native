import { Validation } from '~/presentation/protocols/validation';

export class LoginValidation implements Validation {
  field: string;
  value: string;
  errorMessage: string;

  validate(field: string, value: string): string {
    this.field = field;
    this.value = value;
    return this.errorMessage;
  }
}
