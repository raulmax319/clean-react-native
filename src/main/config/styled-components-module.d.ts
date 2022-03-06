import 'styled-components';
import { colors } from '~/presentation/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
  }
}
