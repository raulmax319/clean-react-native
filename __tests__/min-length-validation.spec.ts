import { faker } from '@faker-js/faker';
import { InvalidFieldError } from '~/validation/errors';
import { MinLengthValidation } from '~/validation/validators/min-length/min-length-validation';

const makeSut = (length: number) => {
  const field = faker.database.column();
  const sut = new MinLengthValidation(field, length);

  return {
    sut,
    field,
  };
};

describe('MinLengthValidation', () => {
  test('Should return error if value is too short', () => {
    const { sut, field } = makeSut(5);
    const result = sut.validate('123');

    expect(result).toEqual(new InvalidFieldError(field));
  });

  test('Should not return error if value length is valid', () => {
    const { sut } = makeSut(5);
    const result = sut.validate('12345');

    expect(result).toBeFalsy();
  });
});
