import {
  ref,
  Ref,
  reactive,
  computed,
  defineComponent,
  type PropType,
  type ExtractPropTypes,
  type ComponentPublicInstance
} from 'vue'
// import { useTouch } from '../composables/index.ts'
// import { useTouch,useRect, useExpose, useClickAway } from '../composables/index'
import { useTouch } from '../composables/use-touch'; // touch结合touch元素信息
import { useExpose } from '../composables/use-expose'; // 挂在方法到vue getCurrentInstance().proxy上去
import { useClickAway } from '../composables/use-click-awway';
import { useRect } from '../composables/use-rect';

import {
  clamp,
  isDef,
  numericProp, // [number,string]
  Interceptor,  // 事件拦截器type
  preventDefault, // 阻止默认事件
  callInterceptor, // 事件拦截器
  createNamespace, // 创建bem风格
  makeNumericProp, //  类型校验
} from '../utils/index';
const [name, bem] = createNamespace('swipe-cell')
type SwipeCellSide = 'left' | 'right';
type SwipeCellPosition = SwipeCellSide | 'cell' | 'outside';
type SwipeCellExpose = {
  open: (side: SwipeCellSide) => void;
  close: (position: SwipeCellPosition) => void;
}
const swipeCellProps = {
  name: makeNumericProp(''),
  disabled: Boolean,
  leftWidth: numericProp,
  rightWidth: numericProp,
  beforeClose: Function as PropType<Interceptor>,
  stopPropagation: Boolean,
};
type SwipeCellProps = ExtractPropTypes<typeof swipeCellProps>; // 精确的提取类型约束
type SwipeCellInstance = ComponentPublicInstance<
  SwipeCellProps,
  SwipeCellExpose
>
export default defineComponent({
  name,
  props: swipeCellProps,
  emits: ['open', 'close', 'click'],
  setup(props, { emit, slots }) {
    let opened: boolean;
    let lockClick: boolean;
    let startOffset: number;
    const root = ref<HTMLElement>();
    const leftRef = ref<HTMLElement>();
    const rightRef = ref<HTMLElement>();

    const state = reactive({
      offset: 0,
      dragging: false,
    });

    const touch = useTouch();

    const getWidthByRef = (ref: Ref<HTMLElement | undefined>) =>{
      return ref.value ? useRect(ref).width : 0;
    }

    const leftWidth = computed(() =>{
      return isDef(props.leftWidth) ? +props.leftWidth : getWidthByRef(leftRef)
    }


    );

    const rightWidth = computed(() =>
      isDef(props.rightWidth) ? +props.rightWidth : getWidthByRef(rightRef)
    );

    const open = (side: SwipeCellSide) => {
      state.offset = side === 'left' ? leftWidth.value : -rightWidth.value;
      if (!opened) {
        opened = true;
        emit('open', {
          name: props.name,
          position: side,
        });
      }
    };

    const close = (position: SwipeCellPosition) => {
      state.offset = 0;
      if (opened) {
        opened = false;
        emit('close', {
          name: props.name,
          position,
        });
      }
    };

    const toggle = (side: SwipeCellSide) => {
      const offset = Math.abs(state.offset);
      const THRESHOLD = 0.15;
      const threshold = opened ? 1 - THRESHOLD : THRESHOLD;
      const width = side === 'left' ? leftWidth.value : rightWidth.value;

      if (width && offset > width * threshold) {
        open(side);
      } else {
        close(side);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (!props.disabled) {
        startOffset = state.offset;
        touch.start(event);
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (props.disabled) {
        return;
      }

      const { deltaX } = touch;
      touch.move(event);

      if (touch.isHorizontal()) {
        lockClick = true;
        state.dragging = true;
        // 对edge浏览器做判定
        const isEdge = !opened || deltaX.value * startOffset < 0;
        if (isEdge) {
          preventDefault(event, props.stopPropagation);
        }
        // 算移动距离
        console.log(deltaX.value + startOffset, -rightWidth.value,leftWidth.value)
        state.offset = clamp(
          deltaX.value + startOffset,
          -rightWidth.value,
          leftWidth.value
        );
      }
    };

    const onTouchEnd = () => {
      if (state.dragging) {
        state.dragging = false;
        toggle(state.offset > 0 ? 'left' : 'right');
        // compatible with desktop scenario
        setTimeout(() => {
          lockClick = false;
        }, 0);
      }
    };

    const onClick = (position: SwipeCellPosition = 'outside') => {
      emit('click', position);
      if (opened && !lockClick) {
        callInterceptor(props.beforeClose, {
          args: [
            {
              name: props.name,
              position,
            },
          ],
          done: () => close(position)
        })
      }
    }
    /**
     * @description 点击事件
     * @param position
     * @param stop
     * @returns
     */
    const getClickHandler =
      (position: SwipeCellPosition, stop?: boolean) => (event: MouseEvent) => {
        if (stop) {
          event.stopPropagation();
        }
        onClick(position);
      };
    // 渲染slot内容
    const renderSideContent = (
      side: SwipeCellSide,
      ref: Ref<HTMLElement | undefined>
    ) => {
      const contentSlot = slots[side];
      if (contentSlot) {
        return (
          <div
            ref={ref}
            class={bem(side)}
            onClick={getClickHandler(side, true)}
          >
            {contentSlot()}
          </div>
        );
      }
    };

    useExpose<SwipeCellExpose>({
      open,
      close,
    });

    useClickAway(root, () => onClick('outside'), { eventName: 'touchstart' })
    return () => {
      const wrapperStyle = {
        transform: `translate3d(${state.offset}px, 0, 0)`,
        transitionDuration: state.dragging ? '0s' : '.6s',
      };
      return (
        <div
        ref={root}
        class={bem()}
        onClick={getClickHandler('cell', lockClick)}
        onTouchstart={onTouchStart}
        onTouchmove={onTouchMove}
        onTouchend={onTouchEnd}
        onTouchcancel={onTouchEnd}
      >
        <div class={bem('wrapper')} style={wrapperStyle}>
          {renderSideContent('left', leftRef)}
          {slots.default?.()}
          {renderSideContent('right', rightRef)}
        </div>
      </div>
      )

    }
  },
})
