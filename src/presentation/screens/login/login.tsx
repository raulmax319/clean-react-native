import React from 'react';
import {
  ActivityIndicator,
  Circle,
  Input,
  PrimaryButton,
  TabView,
} from '~/presentation/components';
import { LoginContextProvider, useLoginContext } from '~/presentation/contexts';
import {
  Container,
  Footer,
  Form,
  Head,
  SignUp,
  SubButton,
} from './login.styles';

const tabItems = [{ label: 'Login' }, { label: 'Register' }];

const LoginComponent: React.FC = () => {
  const { isLoading, handleSubmit } = useLoginContext();

  return (
    <Container>
      <Head>
        <TabView data={tabItems} />
      </Head>
      <Form>
        <Input label="Email" />
        <Input label="Password" secureTextEntry />
      </Form>
      <Footer>
        <SubButton>Forgot password?</SubButton>
        <PrimaryButton disabled={isLoading} onPress={handleSubmit}>
          Log in
        </PrimaryButton>
        <SignUp>
          Don&apos;t have an account? <SignUp strong>Sign up</SignUp>
        </SignUp>
      </Footer>
      <Circle top left />
      <Circle small bottom right />
      <ActivityIndicator />
    </Container>
  );
};

const Login: React.FC = () => (
  <LoginContextProvider>
    <LoginComponent />
  </LoginContextProvider>
);

export default Login;
