import React, { ComponentProps } from 'react';
import { StatusBar } from 'react-native';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';

import { RootStack } from './root-stack';

export const RootNavigator = React.forwardRef<
  NavigationContainerRef<unknown>,
  Partial<ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <StatusBar translucent backgroundColor="transparent" />
      <RootStack />
    </NavigationContainer>
  );
});

RootNavigator.displayName = 'RootNavigator';
