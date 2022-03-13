import React from 'react';
import { HttpPostClient } from '~/data/protocols/http';
import {
  ActivityIndicator,
  Circle,
  Input,
  PrimaryButton,
  TabView,
} from '~/presentation/components';
import { ErrorState, InputState, LoginContext } from '~/presentation/contexts';
import { useAuthentication } from '~/presentation/hooks';
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

type Props = {
  validation: Validation;
  httpPostClient: HttpPostClient;
};

export const Login: React.FC<Props> = ({ validation, httpPostClient }) => {
  const [isLoading, authenticate] = useAuthentication(httpPostClient);
  const [inputState, setInputState] = React.useState<InputState>({
    email: '',
    password: '',
  });
  const [errorState, setErrorState] = React.useState<ErrorState>({
    email: false,
    password: false,
    errorMessage: '',
  });

  const handleInput = (value: Record<string, string>) =>
    setInputState((prev) => ({ ...prev, ...value }));

  const handleSubmit = async () => {
    try {
      const emailError = validation.validate('email', inputState.email);
      if (!!emailError) throw new Error(emailError);

      const passwordError = validation.validate(
        'password',
        inputState.password,
      );
      if (!!passwordError) throw new Error(passwordError);

      const _accountModel = await authenticate(inputState);
    } catch (error) {
      setErrorState((prev) => ({ ...prev, errorMessage: error.message }));
    }
  };

  return (
    <Container>
      <Head>
        <TabView data={tabItems} />
      </Head>
      <LoginContext.Provider
        value={{
          isLoading,
          errorState,
        }}
      >
        <Form>
          <Input
            label="Email"
            defaultValue={inputState.email}
            onChangeText={(email) => handleInput({ email })}
          />
          <Input
            secureTextEntry
            label="Password"
            defaultValue={inputState.password}
            onChangeText={(password) => handleInput({ password })}
          />
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
      </LoginContext.Provider>
    </Container>
  );
};

export default Login;
