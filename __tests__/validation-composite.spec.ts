import faker from '@faker-js/faker';
import { FieldValidationSpy } from '<root>/__mocks__';
import { ValidationComposite } from '~/validation/validators/validation-composite/validation-composite';

const makeSut = (field: string) => {
  const validators = [
    new FieldValidationSpy(field),
    new FieldValidationSpy(field),
  ];
  const sut = new ValidationComposite(validators);

  return { sut, validators };
};

describe('ValidationComposite', () => {
  test('should return an error if any validation fails', () => {
    const fieldName = faker.random.word();
    const { sut, validators } = makeSut(fieldName);
    const firstError = faker.random.words();
    validators[0].error = new Error(firstError);
    validators[1].error = new Error(faker.random.words());
    const error = sut.validate(fieldName, faker.random.word());

    expect(error).toBe(firstError);
  });

  test('should not return an error if no validation fails', () => {
    const fieldName = faker.random.word();
    const { sut } = makeSut(fieldName);
    const error = sut.validate(fieldName, 'any_value');

    expect(error).toBeFalsy();
  });
});
