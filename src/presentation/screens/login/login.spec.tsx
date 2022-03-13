// disable eslint for `any` type assertion of ReactTestInstance
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { ActivityIndicator, PressableProps, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { faker } from '@faker-js/faker';
import { AuthenticationSpy, ValidationSpy } from '../../mocks';
import { HttpPostClientSpy } from '~/data/mocks';
import { UnauthorizedError } from '~/domain/errors';
import theme from '~/presentation/theme';
import Login from './login';

const withTheme = (component: React.ReactNode) => {
  return <ThemeProvider theme={theme}>{component}</ThemeProvider>;
};

const makeLoginComponent = () => {
  const authenticationSpy = new AuthenticationSpy();
  const validationSpy = new ValidationSpy();
  const httpPostClient = new HttpPostClientSpy();
  const result = render(
    withTheme(
      <Login validation={validationSpy} httpPostClient={httpPostClient} />,
    ),
  );

  return {
    result,
    validationSpy,
    authenticationSpy,
    httpPostClient,
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

  test('Should call validation with correct values', async () => {
    const { result, validationSpy } = makeLoginComponent();
    const primaryButton = result.getByTestId('primary-button');
    const emailInput = result.getByTestId('email-input').findByType(TextInput);
    const email = faker.internet.email();

    fireEvent.changeText(emailInput, email);
    void waitFor(async () => {
      await fireEvent.press(primaryButton);
    });

    await expect(validationSpy.errorMessage).toBeFalsy(); // eslint-disable-line
  });

  test('Should not be able to press the button when disabled', async () => {
    const { result } = makeLoginComponent();
    const primaryButton = result.getByTestId('primary-button');

    void waitFor(async () => {
      await fireEvent.press(primaryButton);
    });

    /* 
    This needs to be awaited due to a problem with how fireEvent works.
    It assumes that everything is done after the event is fired
    and the component is unmounted before some states updates are done
    so it'll console.error about memory leak issue with React 
    */
    await expect(primaryButton.props.accessibilityState.disabled).toBe(true); // eslint-disable-line
  });

  test('Should show ActivityIndicator when isLoading is true', async () => {
    const { result } = makeLoginComponent();
    const primaryButton = result.getByTestId('primary-button');
    const activityIndicator = result.getByTestId('activity-indicator');

    void waitFor(async () => {
      await fireEvent.press(primaryButton);
    });
    const spinner = activityIndicator.findByType(ActivityIndicator);

    await expect(activityIndicator.children.length).toBe(1); // eslint-disable-line
    await expect(spinner).toBeTruthy(); // eslint-disable-line
  });

  test('Should call Authentication with correct values', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const { result, validationSpy, authenticationSpy } = makeLoginComponent();
    const primaryButton = result.getByTestId('primary-button');

    void waitFor(async () => {
      await fireEvent.press(primaryButton, [
        validationSpy.validate('email', email),
        validationSpy.validate('password', password),
        authenticationSpy.auth({ email, password }),
      ]);
    });

    await expect(authenticationSpy.params).toEqual({ email, password }); // eslint-disable-line
  });

  test('Should throw an error if Authentication fails', async () => {
    const error = new UnauthorizedError();
    const { result, validationSpy } = makeLoginComponent();
    const primaryButton = result.getByTestId('primary-button');

    validationSpy.errorMessage = error.message;

    void waitFor(async () => {
      await fireEvent.press(primaryButton);
    });

    const activityIndicator = result.getByTestId('activity-indicator');
    const errorMessage = activityIndicator.findByType(Text);

    await expect(errorMessage.props.children).toEqual(error.message); // eslint-disable-line
  });
});
