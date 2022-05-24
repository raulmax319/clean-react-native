import faker from '@faker-js/faker';
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from '~/validation/validators';
import { ValidationBuilder } from './validation-builder';

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const field = faker.database.column();
    const validators = ValidationBuilder.field(field).required().build();

    expect(validators).toEqual([new RequiredFieldValidation(field)]);
  });

  test('should return EmailValidation', () => {
    const field = faker.database.column();
    const validators = ValidationBuilder.field(field).email().build();

    expect(validators).toEqual([new EmailValidation(field)]);
  });

  test('should return MinLengthValidation', () => {
    const field = faker.database.column();
    const validators = ValidationBuilder.field(field).min(5).build();

    expect(validators).toEqual([new MinLengthValidation(field, 5)]);
  });

  test('should return a list of validators', () => {
    const field = faker.database.column();
    const validators = ValidationBuilder.field(field)
      .required()
      .min(5)
      .email()
      .build();

    expect(validators).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, 5),
      new EmailValidation(field),
    ]);
  });
});
