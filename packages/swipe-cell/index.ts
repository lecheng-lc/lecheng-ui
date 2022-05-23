import { withInstall } from '../utils';
import _SwipeCell from './SwipeCell';

export const SwipeCell = withInstall(_SwipeCell);
export default SwipeCell;
export type { SwipeCellProps } from './SwipeCell';
export type {
  SwipeCellSide,
  SwipeCellPosition,
  SwipeCellInstance,
} from './types'
declare module 'vue' {
  export interface GlobalComponents {
    LcSwipeCell: typeof SwipeCell;
  }
}
