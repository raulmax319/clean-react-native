import { FieldValidationSpy } from '../mocks/field-validation.mock';
import { ValidationComposite } from './validation-composite';

const makeSut = () => {
  const validators = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field'),
  ];
  const sut = new ValidationComposite(validators);

  return { sut, validators };
};

describe('ValidationComposite', () => {
  test('should return an error if any validation fails', () => {
    const { sut, validators } = makeSut();
    validators[0].error = new Error('first_error');
    validators[1].error = new Error('second_error');
    const error = sut.validate('any_field', 'any_value');

    expect(error).toBe(validators[0].error.message);
  });
});
