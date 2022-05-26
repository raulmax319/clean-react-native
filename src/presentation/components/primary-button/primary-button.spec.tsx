import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { act, fireEvent, render } from '@testing-library/react-native';
import { PrimaryButton } from '~/presentation/components';
import theme from '~/presentation/theme';

const makeComponent = (component: React.ReactNode) => {
  return <ThemeProvider theme={theme}>{component}</ThemeProvider>;
};

describe('PrimaryButton', () => {
  test('should highlight button when pressed', () => {
    const { getByTestId } = render(makeComponent(<PrimaryButton />));
    const button = getByTestId('primary-button');

    const highlightProps = {
      ...button.props.style[0],
      backgroundColor: theme.colors.highlight,
    };

    act(() => {
      fireEvent.press(button, (button.props.style[0] = highlightProps));
    });
    expect(button.props.style[0]).toEqual(highlightProps);
  });
});
