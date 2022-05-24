import { FieldValidationSpy } from '../mocks/field-validation.mock';
import { ValidationComposite } from './validation-composite';

describe('ValidationComposite', () => {
  test('should return an error if any validation fails', () => {
    const validationSpy = new FieldValidationSpy('any_field');
    const validationSpy2 = new FieldValidationSpy('any_field');
    validationSpy2.error = new Error('any_error');

    const validators = [validationSpy, validationSpy2];
    const sut = new ValidationComposite(validators);
    const error = sut.validate('any_field', 'any_value');

    expect(error).toBe(validationSpy2.error.message);
  });
});
