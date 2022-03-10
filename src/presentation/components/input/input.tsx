import React from 'react';
import { TextInputProps, View } from 'react-native';
import { InputState, useLoginContext } from '~/presentation/contexts';
import { Label, TextInput } from './input.styles';

export type InputProps = {
  label: string;
} & TextInputProps;

const Input: React.FC<InputProps> = ({ label, ...otherProps }) => {
  const { inputState, handleInput } = useLoginContext();

  return (
    <View testID={`${label.toLowerCase()}-input`}>
      <Label>{label}</Label>
      <TextInput
        defaultValue={inputState[label.toLowerCase() as keyof InputState]}
        onChangeText={(text) => handleInput({ [label.toLowerCase()]: text })}
        {...otherProps}
      />
    </View>
  );
};

export default Input;
