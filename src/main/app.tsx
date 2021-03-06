import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';

import { RootNavigator } from '~/main/router';
import theme from '~/presentation/theme';
import { rootStore } from './store/store';

const App: React.FC = () => (
  <StoreProvider store={rootStore}>
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider theme={theme}>
        <RootNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  </StoreProvider>
);

export default App;
