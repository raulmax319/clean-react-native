import React from 'react';
import { Text, View, ViewStyle } from 'react-native';

const viewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
} as ViewStyle;

const App: React.FC = () => (
  <View style={viewStyle}>
    <Text>Hello, world!</Text>
  </View>
);

export default App;
