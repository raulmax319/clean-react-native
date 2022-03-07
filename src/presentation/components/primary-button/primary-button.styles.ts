import { Pressable } from 'react-native';
import styled from 'styled-components/native';

type TextProps = {
  disabled?: boolean;
};

export const Label = styled.Text<TextProps>`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};

  ${(props) =>
    props.disabled &&
    `
      color: ${props.theme.colors.disabledText};
    `}
`;

export const Button = styled(Pressable)`
  width: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);

  ${(props) =>
    props.disabled &&
    `
  background-color: ${props.theme.colors.disabledBackground};
  `}
`;
