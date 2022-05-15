import { ref, reactive, computed, defineComponent } from 'vue'; // import { useTouch } from '../composables/index.ts'
// import { useTouch,useRect, useExpose, useClickAway } from '../composables/index'

import { useTouch } from '../composables/use-touch'; // touch结合touch元素信息

import { useExpose } from '../composables/use-expose'; // 挂在方法到vue getCurrentInstance().proxy上去

import { useClickAway } from '../composables/use-click-awway';
import { useRect } from '../composables/use-rect';
import { clamp, isDef, numericProp, // 事件拦截器type
preventDefault, // 阻止默认事件
callInterceptor, // 事件拦截器
createNamespace, // 创建bem风格
makeNumericProp //  类型校验
} from '../utils/index';

var _createNamespace = createNamespace('swipe-cell'),
    name = _createNamespace[0],
    bem = _createNamespace[1];

var swipeCellProps = {
  name: makeNumericProp(''),
  disabled: Boolean,
  leftWidth: numericProp,
  rightWidth: numericProp,
  beforeClose: Function,
  stopPropagation: Boolean
};
export default defineComponent({
  name: name,
  props: swipeCellProps,
  emits: ['open', 'close', 'click'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var opened;
    var lockClick;
    var startOffset;
    var root = ref();
    var leftRef = ref();
    var rightRef = ref();
    var state = reactive({
      offset: 0,
      dragging: false
    });
    var touch = useTouch();

    var getWidthByRef = function getWidthByRef(ref) {
      return ref.value ? useRect(ref).width : 0;
    };

    var leftWidth = computed(function () {
      return isDef(props.leftWidth) ? +props.leftWidth : getWidthByRef(leftRef);
    });
    var rightWidth = computed(function () {
      return isDef(props.rightWidth) ? +props.rightWidth : getWidthByRef(rightRef);
    });

    var open = function open(side) {
      state.offset = side === 'left' ? leftWidth.value : -rightWidth.value;

      if (!opened) {
        opened = true;
        emit('open', {
          name: props.name,
          position: side
        });
      }
    };

    var close = function close(position) {
      state.offset = 0;

      if (opened) {
        opened = false;
        emit('close', {
          name: props.name,
          position: position
        });
      }
    };

    var toggle = function toggle(side) {
      var offset = Math.abs(state.offset);
      var THRESHOLD = 0.15;
      var threshold = opened ? 1 - THRESHOLD : THRESHOLD;
      var width = side === 'left' ? leftWidth.value : rightWidth.value;

      if (width && offset > width * threshold) {
        open(side);
      } else {
        close(side);
      }
    };

    var onTouchStart = function onTouchStart(event) {
      if (!props.disabled) {
        startOffset = state.offset;
        touch.start(event);
      }
    };

    var onTouchMove = function onTouchMove(event) {
      if (props.disabled) {
        return;
      }

      var deltaX = touch.deltaX;
      touch.move(event);

      if (touch.isHorizontal()) {
        lockClick = true;
        state.dragging = true; // 对edge浏览器做判定

        var isEdge = !opened || deltaX.value * startOffset < 0;

        if (isEdge) {
          preventDefault(event, props.stopPropagation);
        } // 算移动距离


        console.log(deltaX.value + startOffset, -rightWidth.value, leftWidth.value);
        state.offset = clamp(deltaX.value + startOffset, -rightWidth.value, leftWidth.value);
      }
    };

    var onTouchEnd = function onTouchEnd() {
      if (state.dragging) {
        state.dragging = false;
        toggle(state.offset > 0 ? 'left' : 'right'); // compatible with desktop scenario

        setTimeout(function () {
          lockClick = false;
        }, 0);
      }
    };

    var onClick = function onClick(position) {
      if (position === void 0) {
        position = 'outside';
      }

      emit('click', position);

      if (opened && !lockClick) {
        callInterceptor(props.beforeClose, {
          args: [{
            name: props.name,
            position: position
          }],
          done: function done() {
            return close(position);
          }
        });
      }
    };
    /**
     * @description 点击事件
     * @param position
     * @param stop
     * @returns
     */


    var getClickHandler = function getClickHandler(position, stop) {
      return function (event) {
        if (stop) {
          event.stopPropagation();
        }

        onClick(position);
      };
    }; // 渲染slot内容


    var renderSideContent = function renderSideContent(side, ref) {
      var contentSlot = slots[side];

      if (contentSlot) {
        return <div ref={ref} class={bem(side)} onClick={getClickHandler(side, true)}>
            {contentSlot()}
          </div>;
      }
    };

    useExpose({
      open: open,
      close: close
    });
    useClickAway(root, function () {
      return onClick('outside');
    }, {
      eventName: 'touchstart'
    });
    return function () {
      var wrapperStyle = {
        transform: "translate3d(" + state.offset + "px, 0, 0)",
        transitionDuration: state.dragging ? '0s' : '.6s'
      };
      return <div ref={root} class={bem()} onClick={getClickHandler('cell', lockClick)} onTouchstart={onTouchStart} onTouchmove={onTouchMove} onTouchend={onTouchEnd} onTouchcancel={onTouchEnd}>
        <div class={bem('wrapper')} style={wrapperStyle}>
          {renderSideContent('left', leftRef)}
          {slots.default == null ? void 0 : slots.default()}
          {renderSideContent('right', rightRef)}
        </div>
      </div>;
    };
  }
});