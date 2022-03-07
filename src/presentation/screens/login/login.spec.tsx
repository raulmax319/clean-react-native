import React from 'react';
import { render } from '@testing-library/react-native';
import Login from './login';
import { ThemeProvider } from 'styled-components/native';
import theme from '~/presentation/theme';

describe('Login Component', () => {
  test('Should render the Login screen', () => {
    render(
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>,
    );
  });
});
