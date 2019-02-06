'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.componentTransitionTime = exports.pageTransitionExists = exports.pageTransitionTime = exports.pageTransitionEvent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Transition = require('react-transition-group/Transition');

var _Transition2 = _interopRequireDefault(_Transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pageTransitionEvent = exports.pageTransitionEvent = 'gatsby-plugin-page-transition::exit';
var pageTransitionTime = exports.pageTransitionTime = 'gatsby-plugin-page-transition::time';
var pageTransitionExists = exports.pageTransitionExists = 'gatsby-plugin-page-transition::exists';
var componentTransitionTime = exports.componentTransitionTime = 'gatsby-plugin-page-transition::comTime';

var PageTransition = function (_React$Component) {
  _inherits(PageTransition, _React$Component);

  function PageTransition(props) {
    _classCallCheck(this, PageTransition);

    var _this = _possibleConstructorReturn(this, (PageTransition.__proto__ || Object.getPrototypeOf(PageTransition)).call(this, props));

    _this.setIn = _this.setIn.bind(_this);
    _this.listenerHandler = _this.listenerHandler.bind(_this);
    _this.state = {
      in: false,
      transitionTime: 0
    };
    return _this;
  }

  _createClass(PageTransition, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setIn(true);
      global.window.addEventListener(pageTransitionEvent, this.listenerHandler);
      global.window[pageTransitionExists] = true;
      global.window[componentTransitionTime] = this.props.transitionTime;
      this.setState({
        transitionTime: this.props.transitionTime || global.window[pageTransitionTime]
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      global.window.removeEventListener(pageTransitionEvent, this.listenerHandler);
      global.window[pageTransitionExists] = false;
      global.window[componentTransitionTime] = undefined;
    }
  }, {
    key: 'setIn',
    value: function setIn(inProp) {
      this.setState({ in: inProp });
    }
  }, {
    key: 'listenerHandler',
    value: function listenerHandler(event) {
      var currentPath = global.window.location.pathname;
      var nextPath = event.detail.pathname;
      if (currentPath !== nextPath) this.setIn(false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var defaultStyle = this.props.defaultStyle || {
        transition: 'opacity ' + this.state.transitionTime + 'ms ease-in-out',
        opacity: 0
      };

      var transitionStyles = this.props.transitionStyles || {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 }
      };

      return _react2.default.createElement(
        _Transition2.default,
        { 'in': this.state.in, timeout: this.state.transitionTime },
        function (state) {
          return _react2.default.createElement(
            'div',
            {
              style: _extends({}, defaultStyle, transitionStyles[state])
            },
            _this2.props.children
          );
        }
      );
    }
  }]);

  return PageTransition;
}(_react2.default.Component);

PageTransition.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.shape({})), _propTypes2.default.shape({})]).isRequired,
  transitionTime: _propTypes2.default.number,
  defaultStyle: _propTypes2.default.shape({}),
  transitionStyles: _propTypes2.default.shape({})
};

exports.default = PageTransition;