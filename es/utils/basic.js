export function noop() {}
export var extend = Object.assign;
export var inBrowser = typeof window !== 'undefined';
export function get(object, path) {
  var keys = path.split('.');
  var result = object;
  keys.forEach(function (key) {
    var _result$key;

    result = (_result$key = result[key]) != null ? _result$key : '';
  });
  return result;
}
export function pick(obj, keys, ignoreUndefined) {
  return keys.reduce(function (ret, key) {
    if (!ignoreUndefined || obj[key] !== undefined) {
      ret[key] = obj[key];
    }

    return ret;
  }, {});
}