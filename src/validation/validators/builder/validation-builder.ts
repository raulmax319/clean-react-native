import { FieldValidation } from '~/validation/protocols/field-validation';
import { RequiredFieldValidation } from '../required-field/required-field-validation';

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validators: Array<FieldValidation>,
  ) {}

  static field(field: string): ValidationBuilder {
    return new ValidationBuilder(field, []);
  }

  required(): ValidationBuilder {
    this.validators.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  build(): Array<FieldValidation> {
    return this.validators;
  }
}
