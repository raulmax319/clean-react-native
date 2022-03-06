import styled from 'styled-components/native';

export const Label = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
`;

export const Button = styled.Pressable`
  width: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;
