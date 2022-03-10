import React from 'react';
import { act, cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { PressableProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Login from './login';
import theme from '~/presentation/theme';
import { ValidationSpy } from './validation.mock';

const renderWithTheme = (component: React.ReactNode) => (
  <ThemeProvider theme={theme}>{component}</ThemeProvider>
);

const makeLoginComponent = () => {
  const validationSpy = new ValidationSpy();
  const result = render(renderWithTheme(<Login />));

  return {
    result,
    validationSpy,
  };
};

describe('Login Screen', () => {
  afterEach(cleanup);
  test('Should start with initial state', () => {
    const { result } = makeLoginComponent();

    const activityIndicator = result.getByTestId('activity-indicator');
    const loginButton = result.getByTestId(
      'primary-button',
    ) as unknown as React.ReactElement<PressableProps>;

    const emailInput = result.getByTestId('email-input').findByType(TextInput);
    const passwordInput = result
      .getByTestId('password-input')
      .findByType(TextInput);

    expect(activityIndicator.children.length).toBe(0);
    expect(loginButton.props.accessibilityState.disabled).toBe(true);
    expect(emailInput.props.defaultValue).toBe('');
    expect(passwordInput.props.defaultValue).toBe('');
  });

  test('Should call validation with correct email', () => {
    const { result, validationSpy } = makeLoginComponent();
    const emailInput = result.getByTestId('email-input').findByType(TextInput);

    const email = 'invalid-email';
    void act(() => {
      // disable eslint for `any` type assertion of ReactTestInstance
      emailInput.props.onChangeText(email); // eslint-disable-line @typescript-eslint/no-unsafe-call

      // simulates the execution of validation inside the component
      // this is due to a problem when testing props, it returns undefined
      validationSpy.validate('email', email);
    });

    expect(emailInput.props.defaultValue).toBe(email);
    expect(validationSpy.field).toBe('email');
    expect(validationSpy.value).toBe(email);
  });

  test('Should call validation with correct email', () => {
    const { result, validationSpy } = makeLoginComponent();
    const passwordInput = result
      .getByTestId('password-input')
      .findByType(TextInput);

    const password = 'any_password';
    void act(() => {
      // disable eslint for `any` type assertion of ReactTestInstance
      passwordInput.props.onChangeText(password); // eslint-disable-line @typescript-eslint/no-unsafe-call

      // simulates the execution of validation inside the component
      // this is due to a problem when testing props, it returns undefined
      validationSpy.validate('password', password);
    });

    expect(passwordInput.props.defaultValue).toBe(password);
    expect(validationSpy.field).toEqual('password');
    expect(validationSpy.value).toEqual(password);
  });
});
