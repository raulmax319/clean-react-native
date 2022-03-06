import React from 'react';
import Input from './input';
import LoginTabs from './login-tabs';
import {
  Container,
  Footer,
  Form,
  Header,
  RedCircle,
  RedCircleSmall,
  SignUp,
  SubButton,
} from './login.styles';
import { PrimaryButton } from './primary-button';

const Login: React.FC = () => {
  const handleLogin = () => {
    return;
  };

  return (
    <Container>
      <Header>
        <LoginTabs />
      </Header>
      <Form>
        <Input label="Email" />
        <Input label="Password" secureTextEntry />
      </Form>
      <Footer>
        <SubButton>Forgot password?</SubButton>
        <PrimaryButton onPress={handleLogin}>Log in</PrimaryButton>
        <SignUp>
          Don&apos;t have an account? <SignUp strong>Sign up</SignUp>
        </SignUp>
      </Footer>
      <RedCircle />
      <RedCircleSmall />
    </Container>
  );
};

export default Login;
