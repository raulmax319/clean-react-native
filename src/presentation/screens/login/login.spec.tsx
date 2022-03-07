import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { PressableProps } from 'react-native';
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

    expect(activityIndicator.children.length).toBe(0);
    expect(loginButton.props.accessibilityState.disabled).toBe(true);
  });
});
