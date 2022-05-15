import { inBrowser } from './basic';
export var isDef = function isDef(val) {
  return val !== undefined && val !== null;
}; // eslint-disable-next-line @typescript-eslint/ban-types

export var isFunction = function isFunction(val) {
  return typeof val === 'function';
};
export var isObject = function isObject(val) {
  return val !== null && typeof val === 'object';
};
export var isPromise = function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
export var isDate = function isDate(val) {
  return Object.prototype.toString.call(val) === '[object Date]' && !Number.isNaN(val.getTime());
};
export function isMobile(value) {
  value = value.replace(/[^-|\d]/g, '');
  return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value);
}
export var isNumeric = function isNumeric(val) {
  return typeof val === 'number' || /^\d+(\.\d+)?$/.test(val);
};
export var online = /\.com/.test(location.origin);
export var isIOS = function isIOS() {
  return inBrowser ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;
};