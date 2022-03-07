import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '~/presentation/screens/login';

const Stack = createStackNavigator();

export const RootStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
