import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { PressableProps, TextInputProps, ViewProps } from 'react-native';
import Login from './login';
import theme from '~/presentation/theme';

const getSecondChild = <T,>(
  children: React.ReactNode[],
): React.ReactElement<T> => {
  const [, secondChild] = children;
  return secondChild as React.ReactElement<T>;
};

describe('Login Screen', () => {
  test('Should start with initial state', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>,
    );
    const activityIndicator = getByTestId('activity-indicator');
    const loginButton = getByTestId(
      'primary-button',
    ) as unknown as React.ReactElement<PressableProps>;

    const emailInputComponent = getByTestId(
      'email-input',
    ) as unknown as React.ReactElement<ViewProps>;
    const passwordInputComponent = getByTestId(
      'password-input',
    ) as unknown as React.ReactElement<ViewProps>;

    const emailInput = getSecondChild<TextInputProps>(
      emailInputComponent.props.children as React.ReactNode[],
    );
    const passwordInput = getSecondChild<TextInputProps>(
      passwordInputComponent.props.children as React.ReactNode[],
    );

    expect(activityIndicator.children.length).toBe(0);
    expect(loginButton.props.accessibilityState.disabled).toBe(true);
    expect(emailInput.props.defaultValue).toBe('');
    expect(passwordInput.props.defaultValue).toBe('');
  });
});
