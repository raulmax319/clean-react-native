import React from 'react';
import { render } from '@testing-library/react-native';
import Login from './login';
import { ThemeProvider } from 'styled-components/native';
import theme from '~/presentation/theme';

describe('Login Screen', () => {
  test('Should not render ActivityIndicator on start', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>,
    );
    const activityIndicator = getByTestId('activity-indicator');

    expect(activityIndicator.children.length).toBe(0);
  });
});
