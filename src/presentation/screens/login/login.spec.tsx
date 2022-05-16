import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react-native';
import '~/presentation/mocks/use-authentication.mock';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from 'styled-components/native';
import { ActivityIndicator, PressableProps, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { faker } from '@faker-js/faker';
import { AuthenticationSpy, ValidationSpy } from '../../mocks';
import { UnauthorizedError } from '~/domain/errors';
import theme from '~/presentation/theme';
import Login from './login';
import * as hooks from '../../hooks';

const withTheme = (component: React.ReactNode) => {
  return <ThemeProvider theme={theme}>{component}</ThemeProvider>;
};

type Options = {
  isLoading?: boolean;
};

const makeLoginComponent = (options: Options = {}) => {
  jest
    .spyOn(hooks, 'useAuthentication')
    .mockImplementationOnce(() => [options.isLoading || false, jest.fn()]);

  const authenticationSpy = new AuthenticationSpy();
  const validationSpy = new ValidationSpy();

  const result = render(
    withTheme(
      <Login validation={validationSpy} authentication={authenticationSpy} />,
    ),
  );

  return {
    result,
    validationSpy,
    authenticationSpy,
  };
};

describe('Login Screen', () => {
  afterEach(cleanup);
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

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

  test('Should call onChangeText with correct email and password', () => {
    const { result } = makeLoginComponent();
    const emailInput = result.getByTestId('email-input').findByType(TextInput);
    const passwordInput = result
      .getByTestId('password-input')
      .findByType(TextInput);
    const password = faker.internet.password();
    const email = faker.internet.email();

    fireEvent.changeText(emailInput, email);
    fireEvent.changeText(passwordInput, password);

    expect(emailInput.props.defaultValue).toBe(email);
    expect(passwordInput.props.defaultValue).toBe(password);
  });

  test('Should call validation with correct values', () => {
    const { result, validationSpy } = makeLoginComponent();
    const primaryButton = result.getByTestId('primary-button');
    const emailInput = result.getByTestId('email-input').findByType(TextInput);
    const email = faker.internet.email();

    fireEvent.changeText(emailInput, email);
    fireEvent.press(primaryButton);

    expect(validationSpy.errorMessage).toBeFalsy();
  });

  test('Should not be able to press the button when disabled', () => {
    const { result } = makeLoginComponent({ isLoading: true });
    const primaryButton = result.getByTestId('primary-button');

    fireEvent.press(primaryButton);

    expect(primaryButton.props.accessibilityState.disabled).toBe(true);
  });

  test('Should show ActivityIndicator when isLoading is true', () => {
    const { result } = makeLoginComponent({ isLoading: true });
    const activityIndicator = result.getByTestId('activity-indicator');
    const spinner = activityIndicator.findByType(ActivityIndicator);

    expect(activityIndicator.children.length).toBe(1);
    expect(spinner).toBeTruthy();
  });

  test('Should call Authentication with correct values', () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const { result, authenticationSpy } = makeLoginComponent();
    const primaryButton = result.getByTestId('primary-button');

    const emailInput = result.getByTestId('email-input').findByType(TextInput);
    const passwordInput = result
      .getByTestId('password-input')
      .findByType(TextInput);

    fireEvent.changeText(emailInput, email);
    fireEvent.changeText(passwordInput, password);
    fireEvent.press(primaryButton, [
      authenticationSpy.auth({ email, password }),
    ]);

    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test('Should throw an error if Authentication fails', () => {
    const error = new UnauthorizedError();
    const { result, validationSpy } = makeLoginComponent();
    const primaryButton = result.getByTestId('primary-button');

    validationSpy.errorMessage = error.message;

    fireEvent.press(primaryButton);

    const activityIndicator = result.getByTestId('activity-indicator');
    const errorMessage = activityIndicator.findByType(Text);

    expect(errorMessage.props.children).toEqual(error.message);
  });

  test('Should save accessToken to Async Storage', () => {
    const accessToken = faker.datatype.uuid();
    jest.spyOn(hooks, 'useAuthentication').mockImplementationOnce(() => [
      false,
      jest.fn(() => {
        void AsyncStorage.setItem('accessToken', accessToken);
        return Promise.resolve();
      }),
    ]);
    const { result } = makeLoginComponent();
    const primaryButton = result.getByTestId('primary-button');

    fireEvent.press(primaryButton);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      accessToken,
    );
  });
});
