/**
 * prop type helpers
 * help us to write less code and reduce bundle size
 */
export var unknownProp = null; // 元祖类型  数字或者字符串

export var numericProp = [Number, String];
export var truthProp = {
  type: Boolean,
  default: true
};
export var makeRequiredProp = function makeRequiredProp(type) {
  return {
    type: type,
    required: true
  };
};
export var makeArrayProp = function makeArrayProp() {
  return {
    type: Array,
    default: function _default() {
      return [];
    }
  };
};
export var makeNumberProp = function makeNumberProp(defaultVal) {
  return {
    type: Number,
    default: defaultVal
  };
};
export var makeNumericProp = function makeNumericProp(defaultVal) {
  return {
    type: numericProp,
    default: defaultVal
  };
};
export var makeStringProp = function makeStringProp(defaultVal) {
  return {
    type: String,
    default: defaultVal
  };
};