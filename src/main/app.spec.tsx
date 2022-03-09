import React from 'react';
import { render } from '@testing-library/react-native';
import App from './app';

describe('App', () => {
  test('Should render App correctly', () => {
    render(<App />);
  });
});
