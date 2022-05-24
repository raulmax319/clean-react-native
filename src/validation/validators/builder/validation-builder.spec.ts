import {
  RequiredFieldValidation,
  EmailValidation,
} from '~/validation/validators';
import { ValidationBuilder } from './validation-builder';

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const validators = ValidationBuilder.field('field').required().build();

    expect(validators).toEqual([new RequiredFieldValidation('field')]);
  });

  test('should return EmailValidation', () => {
    const validators = ValidationBuilder.field('field').email().build();

    expect(validators).toEqual([new EmailValidation('field')]);
  });
});
