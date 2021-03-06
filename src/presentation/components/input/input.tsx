import React from 'react';
import { TextInputProps, View } from 'react-native';
import { Label, TextInput } from './input.styles';

export type InputProps = {
  label: string;
} & TextInputProps;

const Input: React.FC<InputProps> = ({ label, ...otherProps }) => (
  <View testID={`${label.toLowerCase()}-input`}>
    <Label>{label}</Label>
    <TextInput {...otherProps} />
  </View>
);

export default Input;
