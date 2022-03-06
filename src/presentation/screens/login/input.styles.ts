import { Animated, TextInputProps } from 'react-native';
import { TextInput as RNTextInput } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const TextInput = styled(RNTextInput).attrs<TextInputProps>({
  placeholderTextColor: '#999',
  selectionColor: '#f84e69',
  autoCapitalize: 'none',
  keyboardType: 'email-address',
})`
  font-size: 20px;
  font-weight: 900;
  color: #fdfdfd;
`;

export const Container = styled.View`
  padding: 20px;
  width: 100%;
  height: 60px;
  border-width: 1px;
  border-color: #212121;
  border-radius: 4px;
  background-color: #373737;
`;

export const Label = styled(Animated.Text)`
  font-size: 16px;
  font-weight: 900;
  color: #fdfdfd;
`;
