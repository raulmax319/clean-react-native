import { ValidationComposite } from '~/validation/validators';
import { ValidationBuilder } from '~/validation/validators/builder/validation-builder';
import { makeLoginValidation } from './login-validation.factory';

describe('LoginValidationFactory', () => {
  test('should create ValidationComposite with correct validation', () => {
    const sut = makeLoginValidation();

    expect(sut).toEqual(
      new ValidationComposite([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build(),
      ]),
    );
  });
});
