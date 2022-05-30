import { Validation } from '~/presentation/protocols/validation';

export class ValidationSpy implements Validation {
  field: string;
  value: string;
  errorMessage: string;
  shouldPass = false;

  validate(field: string, value: string): string {
    this.field = field;
    this.value = value;
    if (this.shouldPass) {
      if (field === 'email') return null;
    }

    return this.errorMessage;
  }
}
