import React from 'react';
import { AccountModel } from '~/domain/models';
import { Authentication, AuthenticationParams } from '~/domain/usecases';
import {
  ActivityIndicator,
  Circle,
  Input,
  PrimaryButton,
  TabView,
} from '~/presentation/components';
import { LoginContextProvider, useLoginContext } from '~/presentation/contexts';
import { Validation } from '~/presentation/protocols/validation';
import {
  Container,
  Footer,
  Form,
  Head,
  SignUp,
  SubButton,
} from './login.styles';

const tabItems = [{ label: 'Login' }, { label: 'Register' }];

export const LoginComponent: React.FC = () => {
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

class TempValidation implements Validation {
  validate(field: string, value: string): string {
    return '';
  }
}

class TempAuthentication implements Authentication {
  accountModel: AccountModel;
  auth(params: AuthenticationParams): Promise<AccountModel> {
    return Promise.resolve(this.accountModel);
  }
}

const Login: React.FC = () => (
  <LoginContextProvider
    validation={new TempValidation()}
    authentication={new TempAuthentication()}
  >
    <LoginComponent />
  </LoginContextProvider>
);

export default Login;
