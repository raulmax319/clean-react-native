import React from 'react';
import { ActivityIndicator as Loading, ModalProps } from 'react-native';
import { Content, ModalContainer, Backdrop } from './activity-indicator.styles';

type Props = ModalProps;

const ActivityIndicator: React.FC<Props> = ({ visible }) => {
  return (
    <ModalContainer visible={visible} testID="activity-indicator">
      <Backdrop>
        <Content>
          <Loading size="large" />
        </Content>
      </Backdrop>
    </ModalContainer>
  );
};

export default ActivityIndicator;
