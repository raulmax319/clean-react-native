import { createElement } from 'react';
import { Animated, TextInputProps, View } from 'react-native';
import { TextInput as RNTextInput } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

const Input = styled(RNTextInput).attrs<TextInputProps>((props) => ({
  placeholderTextColor: props.theme.colors.placeholder,
  selectionColor: props.theme.colors.primary,
  autoCapitalize: 'none',
  keyboardType: 'email-address',
}))`
  font-size: 20px;
  font-weight: 900;
  color: #fdfdfd;
`;

export const TextInput = styled(View).attrs<TextInputProps>(
  (props: TextInputProps) => ({
    children: createElement(Input, props),
  }),
)<TextInputProps>`
  padding: 20px;
  width: 100%;
  height: 60px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.surface};
`;

export const Label = styled(Animated.Text)`
  font-size: 16px;
  font-weight: 900;
  color: #fdfdfd;
`;
