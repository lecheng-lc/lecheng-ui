import { withInstall } from '../utils';
import _ScrollTab from './ScrollTap';

export const ScrollTab = withInstall(_ScrollTab);
export default ScrollTab;
export type { ScrollTabProps } from './ScrollTap';
export type {
  ScrollTabInstance,
} from './types'
declare module 'vue' {
  export interface GlobalComponents {
    LcScrollTab: typeof ScrollTab;
  }
}
