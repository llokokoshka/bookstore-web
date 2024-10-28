import 'styled-components';

import { IbaseTheme } from './styles/IbaseTheme';

declare module 'styled-components' {
  export interface DefaultTheme extends IbaseTheme {}
}
