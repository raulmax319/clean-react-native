import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const ModalContainer = styled.Modal.attrs({
  transparent: true,
  animationType: 'slide',
})``;

export const Content = styled.View`
  max-width: 90%;
  justify-content: center;
  align-items: center;
  padding: 50px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
`;

export const Backdrop = styled.View`
  ${StyleSheet.absoluteFill}
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ErrorText = styled.Text`
  color: #000;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;
