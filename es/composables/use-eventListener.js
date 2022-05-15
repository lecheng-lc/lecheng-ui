import { watch, isRef, unref, onUnmounted, onDeactivated } from 'vue';
import { onMountedOrActivated } from './on-mounted-or-activated';
import { inBrowser } from '../utils';
export function useEventListener(type, listener, options) {
  if (options === void 0) {
    options = {};
  }

  if (!inBrowser) {
    return;
  }

  var _options = options,
      _options$target = _options.target,
      target = _options$target === void 0 ? window : _options$target,
      _options$passive = _options.passive,
      passive = _options$passive === void 0 ? false : _options$passive,
      _options$capture = _options.capture,
      capture = _options$capture === void 0 ? false : _options$capture;
  var attached;

  var add = function add(target) {
    var element = unref(target);

    if (element && !attached) {
      element.addEventListener(type, listener, {
        capture: capture,
        passive: passive
      });
      attached = true;
    }
  };

  var remove = function remove(target) {
    var element = unref(target);

    if (element && attached) {
      element.removeEventListener(type, listener, capture);
      attached = false;
    }
  };

  onUnmounted(function () {
    return remove(target);
  });
  onDeactivated(function () {
    return remove(target);
  });
  onMountedOrActivated(function () {
    return add(target);
  });

  if (isRef(target)) {
    watch(target, function (val, oldVal) {
      remove(oldVal);
      add(val);
    });
  }
}