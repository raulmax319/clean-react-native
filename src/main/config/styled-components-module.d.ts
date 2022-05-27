import 'styled-components';
import { colors } from '~/presentation/theme';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: typeof colors;
  }
}
