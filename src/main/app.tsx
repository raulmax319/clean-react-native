import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { ThemeProvider } from 'styled-components/native';
import { RootNavigator } from '../presentation/router';
import theme from '~/presentation/theme';

enableScreens();

const App: React.FC = () => (
  <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    <ThemeProvider theme={theme}>
      <RootNavigator />
    </ThemeProvider>
  </SafeAreaProvider>
);

export default App;
