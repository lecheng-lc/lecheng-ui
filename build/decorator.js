"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* remove typeof and extends */

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

/* remove toArray */

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _vuePropertyDecorator = require("vue-property-decorator");

var _loading = _interopRequireDefault(require("../loading/loading"));

var _utils = require("../utils");

/* decorator auto extract */ 
var _decorate = require("../utils/extract-decorator")

var _use = (0, _utils.use)('button'),
    _use2 = (0, _slicedToArray2.default)(_use, 1),
    bem = _use2[0];

var EscButton = _decorate([(0, _vuePropertyDecorator.Component)({
  components: {
    'esc-loading': _loading.default // methods: {
    //   bem
    // }

  }
})], function (_initialize, _Vue) {
  var EscButton =
  /*#__PURE__*/
  function (_Vue2) {
    (0, _inherits2.default)(EscButton, _Vue2);

    function EscButton() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, EscButton);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(EscButton)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _initialize((0, _assertThisInitialized2.default)(_this));

      return _this;
    }

    return EscButton;
  }(_Vue);

  return {
    F: EscButton,
    d: [{
      kind: "field",
      decorators: [(0, _vuePropertyDecorator.Prop)({
        default: 'default',
        type: String
      })],
      key: "type",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _vuePropertyDecorator.Prop)({
        default: 'normal',
        type: String
      })],
      key: "size",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _vuePropertyDecorator.Prop)(String)],
      key: "text",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _vuePropertyDecorator.Prop)(String)],
      key: "loadingText",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _vuePropertyDecorator.Prop)({
        default: false,
        type: Boolean
      })],
      key: "round",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _vuePropertyDecorator.Prop)({
        default: false,
        type: Boolean
      })],
      key: "square",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _vuePropertyDecorator.Prop)({
        default: false,
        type: Boolean
      })],
      key: "plain",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _vuePropertyDecorator.Prop)({
        default: false,
        type: Boolean
      })],
      key: "disabled",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _vuePropertyDecorator.Prop)({
        default: false,
        type: Boolean
      })],
      key: "loading",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _vuePropertyDecorator.Prop)({
        default: false,
        type: Boolean
      })],
      key: "block",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _vuePropertyDecorator.Prop)({
        default: false,
        type: Boolean
      })],
      key: "replace",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _vuePropertyDecorator.Prop)(Number)],
      key: "radius",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _vuePropertyDecorator.Prop)(String)],
      key: "color",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _vuePropertyDecorator.Prop)(String)],
      key: "url",
      value: void 0
    }, {
      kind: "get",
      key: "buttonClass",
      value: // pit 类型要写2遍
      function buttonClass() {
        return bem([this.type, this.size, {
          round: this.round,
          square: this.square,
          plain: this.plain,
          disabled: this.disabled,
          block: this.block
        }]);
      }
    }, {
      kind: "get",
      key: "hackButtonStyle",
      value: function hackButtonStyle() {
        var _this2 = this;

        var color = [this.color, '#fff'];

        var getColor = function getColor(isColor) {
          return color[isColor ? Number(!_this2.plain) : Number(_this2.plain)];
        };

        return {
          borderRadius: this.radius && "".concat(this.radius, "px"),
          backgroundColor: this.color && getColor(false),
          color: this.color && getColor(true),
          borderColor: this.color && this.color
        };
      }
    }, {
      kind: "method",
      key: "onClick",
      value: function onClick() {
        if (!this.loading && !this.disabled) {
          this.$emit('on-click');
          this.routeRedirect();
        }
      }
    }, {
      kind: "method",
      key: "routeRedirect",
      value: function routeRedirect() {
        if (/^https?/.test(this.url)) {
          this.replace ? location.replace(this.url) : location.href = this.url;
        } else if (/^\/[a-z]*/.test(this.url)) {
          this.$router[this.replace ? 'replace' : 'push'](this.url);
        }
      }
    }, {
      kind: "method",
      key: "renderLoading",
      value: function renderLoading() {
        var h = this.$createElement;
        return h("div", {
          "class": bem('loading', false)
        }, [h("esc-loading", {
          "attrs": {
            "size": "small",
            "value": this.loading
          }
        }), this.loadingText && h("span", [this.loadingText])]);
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        var h = arguments[0];
        return h("button", {
          "class": this.buttonClass,
          "style": this.hackButtonStyle,
          "on": {
            "click": this.onClick
          }
        }, [this.loading ? this.renderLoading() : h("span", [this.text])]);
      }
    }]
  };
}, _vuePropertyDecorator.Vue);

exports.default = EscButton;