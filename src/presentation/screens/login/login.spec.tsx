import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { PressableProps, TextInputProps, ViewProps } from 'react-native';
import Login from './login';
import theme from '~/presentation/theme';

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
    const emailInputChildren = emailInputComponent.props
      .children as React.ReactNode[];
    const emailTextInputProps =
      emailInputChildren[1] as React.ReactElement<TextInputProps>;

    const passwordInputComponent = getByTestId(
      'password-input',
    ) as unknown as React.ReactElement<ViewProps>;
    const passwordInputChildren = passwordInputComponent.props
      .children as React.ReactNode[];
    const passwordTextInputProps =
      passwordInputChildren[1] as React.ReactElement<TextInputProps>;

    expect(activityIndicator.children.length).toBe(0);
    expect(loginButton.props.accessibilityState.disabled).toBe(true);
    expect(emailTextInputProps.props.defaultValue).toBe('');
    expect(passwordTextInputProps.props.defaultValue).toBe('');
  });
});
