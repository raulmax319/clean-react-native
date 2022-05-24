import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { makeLogin } from '~/main/factories/screens/login/login-factory';

const Stack = createStackNavigator();

export const RootStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={makeLogin} />
    </Stack.Navigator>
  );
};
