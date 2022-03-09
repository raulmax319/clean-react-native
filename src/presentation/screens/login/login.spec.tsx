import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { PressableProps, TextInputProps, ViewProps } from 'react-native';
import Login from './login';
import theme from '~/presentation/theme';

const renderWithTheme = (component: React.ReactNode) => (
  <ThemeProvider theme={theme}>{component}</ThemeProvider>
);

const getSecondChild = <T,>(
  children: React.ReactNode[],
): React.ReactElement<T> => {
  const [, secondChild] = children;
  return secondChild as React.ReactElement<T>;
};

const makeComponent = () => {
  const result = render(renderWithTheme(<Login />));

  return {
    result,
  };
};

describe('Login Screen', () => {
  test('Should start with initial state', () => {
    const { result } = makeComponent();

    const activityIndicator = result.getByTestId('activity-indicator');
    const loginButton = result.getByTestId(
      'primary-button',
    ) as unknown as React.ReactElement<PressableProps>;

    const emailInputComponent = result.getByTestId(
      'email-input',
    ) as unknown as React.ReactElement<ViewProps>;
    const passwordInputComponent = result.getByTestId(
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
