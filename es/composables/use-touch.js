import { ref } from 'vue';

function getDirection(x, y) {
  if (x > y) {
    return 'horizontal';
  }

  if (y > x) {
    return 'vertical';
  }

  return '';
}

export function useTouch() {
  var startX = ref(0);
  var startY = ref(0);
  var deltaX = ref(0);
  var deltaY = ref(0);
  var offsetX = ref(0);
  var offsetY = ref(0);
  var direction = ref('');

  var isVertical = function isVertical() {
    return direction.value === 'vertical';
  };

  var isHorizontal = function isHorizontal() {
    return direction.value === 'horizontal';
  };

  var reset = function reset() {
    deltaX.value = 0;
    deltaY.value = 0;
    offsetX.value = 0;
    offsetY.value = 0;
    direction.value = '';
  };

  var start = function start(event) {
    reset();
    startX.value = event.touches[0].clientX;
    startY.value = event.touches[0].clientY;
  };

  var move = function move(event) {
    var touch = event.touches[0]; // safari back will set clientX to negative number

    deltaX.value = (touch.clientX < 0 ? 0 : touch.clientX) - startX.value;
    deltaY.value = touch.clientY - startY.value;
    offsetX.value = Math.abs(deltaX.value);
    offsetY.value = Math.abs(deltaY.value); // lock direction when distance is greater than a certain value

    var LOCK_DIRECTION_DISTANCE = 10;

    if (!direction.value || offsetX.value < LOCK_DIRECTION_DISTANCE && offsetY.value < LOCK_DIRECTION_DISTANCE) {
      direction.value = getDirection(offsetX.value, offsetY.value);
    }
  };

  return {
    move: move,
    start: start,
    reset: reset,
    startX: startX,
    startY: startY,
    deltaX: deltaX,
    deltaY: deltaY,
    offsetX: offsetX,
    offsetY: offsetY,
    direction: direction,
    isVertical: isVertical,
    isHorizontal: isHorizontal
  };
}