// disable eslint for `any` type assertion of ReactTestInstance
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { PressableProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { faker } from '@faker-js/faker';
import { LoginComponent } from './login';
import theme from '~/presentation/theme';
import { AuthenticationSpy, ValidationSpy } from '../../mocks';
import { LoginContext, LoginState } from '~/presentation/contexts';

const renderWithContext = (
  component: React.ReactNode,
  customValues?: Partial<LoginState>,
) => {
  const contextValueSpy = {
    isLoading: false,
    inputState: { email: '', password: '' },
    errorState: { errorMessage: '', email: false, password: false },
  };

  return (
    <LoginContext.Provider
      value={{
        ...contextValueSpy,
        handleSubmit: jest.fn(),
        handleInput: jest.fn(),
        ...customValues,
      }}
    >
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </LoginContext.Provider>
  );
};

const makeLoginComponent = (customValues?: Partial<LoginState>) => {
  const authenticationSpy = new AuthenticationSpy();
  const validationSpy = new ValidationSpy();
  const result = render(renderWithContext(<LoginComponent />, customValues));

  return {
    result,
    validationSpy,
    authenticationSpy,
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
    expect(loginButton.props.accessibilityState.disabled).toBe(false);
    expect(emailInput.props.defaultValue).toBe('');
    expect(passwordInput.props.defaultValue).toBe('');
  });

  test('Should call onChangeText with correct email', () => {
    const mockOnChangeText = jest.fn();
    const { result } = makeLoginComponent({
      handleInput: mockOnChangeText,
    });
    const emailInput = result.getByTestId('email-input').findByType(TextInput);
    const email = faker.internet.email();

    fireEvent(emailInput, 'onChangeText', email);

    expect(mockOnChangeText).toHaveBeenCalledWith({ email });
  });

  test('Should call onChangeText with correct password', () => {
    const mockOnChangeText = jest.fn();
    const { result } = makeLoginComponent({
      handleInput: mockOnChangeText,
    });
    const passwordInput = result
      .getByTestId('password-input')
      .findByType(TextInput);
    const password = faker.internet.password();

    fireEvent(passwordInput, 'onChangeText', password);

    expect(mockOnChangeText).toHaveBeenCalledWith({ password });
  });

  test('Should call validation with correct email', () => {
    const mockOnPress = jest.fn();
    const { result, validationSpy } = makeLoginComponent({
      handleSubmit: mockOnPress,
    });
    const primaryButton = result.getByTestId('primary-button');
    const email = faker.internet.email();

    fireEvent.press(primaryButton, validationSpy.validate('email', email));

    expect(mockOnPress).toHaveBeenCalled();
    expect(validationSpy.field).toBe('email');
    expect(validationSpy.value).toBe(email);
  });

  test('Should call validation with correct password', () => {
    const mockOnPress = jest.fn();
    const { result, validationSpy } = makeLoginComponent({
      handleSubmit: mockOnPress,
    });
    const primaryButton = result.getByTestId('primary-button');
    const password = faker.internet.password();

    fireEvent.press(
      primaryButton,
      validationSpy.validate('password', password),
    );

    expect(mockOnPress).toHaveBeenCalled();
    expect(validationSpy.field).toEqual('password');
    expect(validationSpy.value).toEqual(password);
  });

  test('Should not be able to press the button when disabled', () => {
    const mockOnPress = jest.fn();
    const mockContextValue = {
      isLoading: true,
      handleSubmit: mockOnPress,
    };
    const { result } = makeLoginComponent(mockContextValue);
    const primaryButton = result.getByTestId('primary-button');

    fireEvent.press(primaryButton);

    expect(primaryButton.props.accessibilityState.disabled).toBe(true);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  test('Should show ActivityIndicator when isLoading is true', () => {
    const { result } = makeLoginComponent({
      isLoading: true,
    });
    const activityIndicator = result.getByTestId('activity-indicator');

    expect(activityIndicator.children.length).toBe(1);
  });

  test('Should call Authentication with correct values', async () => {
    const mockOnChangeText = jest.fn();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const { result, validationSpy, authenticationSpy } = makeLoginComponent({
      handleInput: mockOnChangeText,
    });
    const primaryButton = result.getByTestId('primary-button');

    fireEvent.press(primaryButton, [
      validationSpy.validate('email', email),
      validationSpy.validate('password', password),
      await authenticationSpy.auth({ email, password }),
    ]);

    expect(authenticationSpy.params).toEqual({ email, password });
  });
});
