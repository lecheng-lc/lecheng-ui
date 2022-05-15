import { noop } from './basic';
import { isPromise } from './validate';

/**
 * @description :拦截器
 * @param interceptor
 * @param param1
 */
export function callInterceptor(interceptor, _ref) {
  var _ref$args = _ref.args,
      args = _ref$args === void 0 ? [] : _ref$args,
      done = _ref.done,
      canceled = _ref.canceled;

  if (interceptor) {
    // eslint-disable-next-line prefer-spread
    var returnVal = interceptor.apply(null, args);

    if (isPromise(returnVal)) {
      returnVal.then(function (value) {
        if (value) {
          done();
        } else if (canceled) {
          canceled();
        }
      }).catch(noop);
    } else if (returnVal) {
      done();
    } else if (canceled) {
      canceled();
    }
  } else {
    done();
  }
}