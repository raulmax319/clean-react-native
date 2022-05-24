import faker from '@faker-js/faker';
import { InvalidFieldError } from '~/validation/errors';
import { MinLengthValidation } from './min-length-validation';

const makeSut = (field: string, length: number) =>
  new MinLengthValidation(field, length);

describe('MinLengthValidation', () => {
  test('Should return error if value is too short', () => {
    const field = faker.database.column();
    const sut = makeSut(field, 5);
    const result = sut.validate('123');

    expect(result).toEqual(new InvalidFieldError(field));
  });

  test('Should not return error if value length is valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field, 5);
    const result = sut.validate('12345');

    expect(result).toBeFalsy();
  });
});
