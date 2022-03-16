import React from 'react';
import { Authentication } from '~/domain/usecases';
import {
  ActivityIndicator,
  Circle,
  Input,
  PrimaryButton,
  TabView,
} from '~/presentation/components';
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

export type ErrorState = {
  email: boolean;
  password: boolean;
  errorMessage: string;
};

export type InputState = {
  email: string;
  password: string;
};

type Props = {
  validation: Validation;
  authentication: Authentication;
};

export const Login: React.FC<Props> = ({ validation, authentication }) => {
  const [isLoading, authenticate] = useAuthentication(authentication);
  const [inputState, setInputState] = React.useState<InputState>({
    email: '',
    password: '',
  });
  const [errorState, setErrorState] = React.useState<ErrorState>({
    email: false,
    password: false,
    errorMessage: null,
  });

  const handleInput = (value: Record<string, string>) =>
    setInputState((prev) => ({ ...prev, ...value }));

  const handleSubmit = async () => {
    try {
      const emailError = validation.validate('email', inputState.email);
      const passwordError = validation.validate(
        'password',
        inputState.password,
      );

      if (!!emailError) throw new Error(emailError);
      if (!!passwordError) throw new Error(passwordError);

      await authenticate(inputState);
    } catch (error) {
      setErrorState((prev) => ({ ...prev, errorMessage: error.message }));
    }
  };

  return (
    <Container>
      <Head>
        <TabView data={tabItems} />
      </Head>
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
      <ActivityIndicator
        isLoading={isLoading}
        error={errorState.errorMessage}
      />
    </Container>
  );
};

export default Login;
