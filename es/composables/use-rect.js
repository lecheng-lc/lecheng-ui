import { unref } from 'vue';

var isWindow = function isWindow(val) {
  return val === window;
};

var makeDOMRect = function makeDOMRect(width, height) {
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width: width,
    height: height
  };
};

export var useRect = function useRect(elementOrRef) {
  var element = unref(elementOrRef);

  if (isWindow(element)) {
    var width = element.innerWidth;
    var height = element.innerHeight;
    return makeDOMRect(width, height);
  }

  if (element != null && element.getBoundingClientRect) {
    return element.getBoundingClientRect();
  }

  return makeDOMRect(0, 0);
};