import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

type SignUpProps = {
  strong?: boolean;
};

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #3d3d3d;
  padding: 0 30px;
`;

export const RedCircle = styled.View`
  width: 350px;
  height: 350px;
  border-radius: 175px;
  background-color: #f84e69;
  top: -156px;
  left: 0;
  position: absolute;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
`;

export const RedCircleSmall = styled.View`
  width: 250px;
  height: 250px;
  border-radius: 175px;
  background-color: #f84e69;
  bottom: -125px;
  right: 0;
  position: absolute;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
`;

export const SubButton = styled.Text`
  align-self: flex-end;
  font-size: 16px;
  color: #f84e69;
  margin-bottom: 30px;
`;

export const Header = styled(SafeAreaView)`
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
  color: #fdfdfd;
  font-weight: 600;
  text-align: center;
  margin-top: 35px;

  ${(props) => props.strong && `font-weight: 900;`}
`;
