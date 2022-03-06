import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

type SignUpProps = {
  strong?: boolean;
};

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 0 30px;
`;

export const SubButton = styled.Text`
  align-self: flex-end;
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 30px;
`;

export const Head = styled(SafeAreaView)`
  flex: 1;
  justify-content: flex-end;
  width: 100%;
`;

export const Form = styled.View`
  width: 100%;
  flex: 1;
  justify-content: space-evenly;
`;

export const Footer = styled.View`
  width: 100%;
  flex: 2;
  justify-content: flex-start;
  padding: 20px 0;
`;

export const SignUp = styled.Text<SignUpProps>`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;
  text-align: center;
  margin-top: 35px;

  ${(props) => props.strong && `font-weight: 900;`}
`;
