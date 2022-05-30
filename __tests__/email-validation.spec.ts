import faker from '@faker-js/faker';
import { InvalidFieldError } from '~/validation/errors';
import { EmailValidation } from '~/validation/validators/email/email-validation';

const makeSut = () => new EmailValidation('email');

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const email = faker.random.word();
    const sut = makeSut();
    const result = sut.validate(email);

    expect(result).toEqual(new InvalidFieldError('email'));
  });

  test('Should return not return anything if email is valid', () => {
    const email = faker.internet.email();
    const sut = makeSut();
    const result = sut.validate(email);

    expect(result).toBeFalsy();
  });

  test('Should return not return anything if email is empty', () => {
    const sut = makeSut();
    const result = sut.validate('');

    expect(result).toBeFalsy();
  });
});
