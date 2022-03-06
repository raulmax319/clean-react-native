import React from 'react';
import { TextInputProps } from 'react-native';
import { Container, Label, TextInput } from './input.styles';

type InputProps = {
  label: string;
} & TextInputProps;

const Input: React.FC<InputProps> = ({ label, ...otherProps }) => {
  return (
    <>
      <Label>{label}</Label>
      <Container>
        <TextInput {...otherProps} />
      </Container>
    </>
  );
};

export default Input;
