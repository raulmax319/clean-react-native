import { faker } from '@faker-js/faker';
import { RequiredFieldError } from '../../errors';
import { RequiredFieldValidation } from './required-field-validation';

const makeSut = () => new RequiredFieldValidation(faker.database.column());

describe('RequiredFieldValidation', () => {
  test('Should return an error if the field is empty', () => {
    const sut = makeSut();
    const error = sut.validate('');

    expect(error).toEqual(new RequiredFieldError());
  });

  test('Should not return if the field has a value', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.word());

    expect(error).toBeFalsy();
  });
});
