import React from 'react';
import { ActivityIndicator as Loading, ModalProps } from 'react-native';
import { LoginContext } from '~/presentation/contexts';
import {
  Content,
  ModalContainer,
  Backdrop,
  ErrorText,
} from './activity-indicator.styles';

type Props = ModalProps;

const ActivityIndicator: React.FC<Props> = () => {
  const { isLoading, errorState } = React.useContext(LoginContext);

  return (
    <ModalContainer
      visible={isLoading || !!errorState.errorMessage}
      testID="activity-indicator"
    >
      <Backdrop>
        <Content>
          {isLoading && <Loading size="large" />}
          {!!errorState.errorMessage && (
            <ErrorText>{errorState.errorMessage}</ErrorText>
          )}
        </Content>
      </Backdrop>
    </ModalContainer>
  );
};

export default ActivityIndicator;
