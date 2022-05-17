import { InvalidFieldError } from '~/validation/errors';
import { EmailValidation } from './email-validation';

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const email = 'test';
    const sut = new EmailValidation('email');
    const result = sut.validate(email);

    expect(result).toEqual(new InvalidFieldError('email'));
  });
});
