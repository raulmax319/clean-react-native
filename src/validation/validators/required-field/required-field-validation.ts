import { RequiredFieldError } from '../../errors';
import { FieldValidation } from '../../protocols/field-validation';

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error {
    if (!value) return new RequiredFieldError();
  }
}
