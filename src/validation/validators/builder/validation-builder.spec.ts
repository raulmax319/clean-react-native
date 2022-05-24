import { RequiredFieldValidation } from '~/validation/validators';
import { ValidationBuilder } from './validation-builder';

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const validators = ValidationBuilder.field('field').required().build();

    expect(validators).toEqual([new RequiredFieldValidation('field')]);
  });
});
