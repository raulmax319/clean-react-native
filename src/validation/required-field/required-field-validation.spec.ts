import { RequiredFieldError } from '../errors';
import { RequiredFieldValidation } from './required-field-validation';

describe('RequiredFieldValidation', () => {
  test('Should return an error if the field is empty', () => {
    const sut = new RequiredFieldValidation('email');
    const error = sut.validate('');

    expect(error).toEqual(new RequiredFieldError());
  });

  test('Should not return if the field has a value', () => {
    const sut = new RequiredFieldValidation('email');
    const error = sut.validate('any_value');

    expect(error).toBeFalsy();
  });
});
