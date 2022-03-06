import React from 'react';
import { Container, Label, TabItem } from './tab-view.styles';

type Data = {
  label: string;
};

type TabViewProps = {
  data: Data[];
  onPress?: () => void;
};

const TabView: React.FC<TabViewProps> = ({ data }) => {
  return (
    <Container>
      {data.map((item, index) => (
        <TabItem selected={index === 0} key={index}>
          <Label selected={index === 0}>{item.label}</Label>
        </TabItem>
      ))}
    </Container>
  );
};

export default TabView;
