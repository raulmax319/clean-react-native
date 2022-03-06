import React from 'react';
import { Container, Label, TabItem } from './login-tabs.styles';

const items = [{ label: 'Login' }, { label: 'Register' }];

const LoginTabs: React.FC = () => {
  return (
    <Container>
      {items.map((item, index) => (
        <TabItem selected={index === 1} key={index}>
          <Label selected={index === 1}>{item.label}</Label>
        </TabItem>
      ))}
    </Container>
  );
};

export default LoginTabs;
