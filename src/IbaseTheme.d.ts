import 'styled-components';

import { ITheme } from './styles/IbaseTheme';

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}