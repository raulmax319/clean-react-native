import React from 'react';
import { ActivityIndicator as Loading, Button, ModalProps } from 'react-native';
import {
  Content,
  ModalContainer,
  Backdrop,
  ErrorText,
} from './activity-indicator.styles';

type Props = ModalProps & {
  isLoading: boolean;
  error?: string;
  toggle?: () => void;
};

const ActivityIndicator: React.FC<Props> = ({ isLoading, error, ...rest }) => {
  return (
    <ModalContainer
      visible={isLoading || !!error}
      testID="activity-indicator"
      {...rest}
    >
      <Backdrop>
        <Content>
          {isLoading && <Loading size="large" />}
          {!!error && <ErrorText>{error}</ErrorText>}
          <Button title="Close" onPress={rest.toggle} />
        </Content>
      </Backdrop>
    </ModalContainer>
  );
};

export default ActivityIndicator;
