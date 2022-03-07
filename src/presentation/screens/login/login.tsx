import React from 'react';
import {
  ActivityIndicator,
  Circle,
  Input,
  PrimaryButton,
  TabView,
} from '~/presentation/components';
import { LoginContextProvider } from '~/presentation/contexts';
import {
  Container,
  Footer,
  Form,
  Head,
  SignUp,
  SubButton,
} from './login.styles';

const tabItems = [{ label: 'Login' }, { label: 'Register' }];

const Login: React.FC = () => {
  const handleLogin = () => {
    return;
  };

  return (
    <Container>
      <LoginContextProvider>
        <Head>
          <TabView data={tabItems} />
        </Head>
        <Form>
          <Input label="Email" defaultValue="" />
          <Input label="Password" defaultValue="" secureTextEntry />
        </Form>
        <Footer>
          <SubButton>Forgot password?</SubButton>
          <PrimaryButton disabled onPress={handleLogin}>
            Log in
          </PrimaryButton>
          <SignUp>
            Don&apos;t have an account? <SignUp strong>Sign up</SignUp>
          </SignUp>
        </Footer>
        <Circle top left />
        <Circle small bottom right />
        <ActivityIndicator />
      </LoginContextProvider>
    </Container>
  );
};

export default Login;
