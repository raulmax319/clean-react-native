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
  const { isLoading, errorMessage } = React.useContext(LoginContext);

  return (
    <ModalContainer
      visible={isLoading || !!errorMessage}
      testID="activity-indicator"
    >
      <Backdrop>
        <Content>
          {isLoading && <Loading size="large" />}
          {!!errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </Content>
      </Backdrop>
    </ModalContainer>
  );
};

export default ActivityIndicator;
