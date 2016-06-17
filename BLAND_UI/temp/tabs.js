/*(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.*/
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _animation_mixin = require('pui-react-mixins/mixins/animation_mixin');

var _animation_mixin2 = _interopRequireDefault(_animation_mixin);

var _Tab = require('react-bootstrap/lib/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _small_tabs = require('./small_tabs');

var _mediaSize = require('./media-size');

var _mediaSize2 = _interopRequireDefault(_mediaSize);

var _puiReactMixins = require('pui-react-mixins');

var _puiReactMixins2 = _interopRequireDefault(_puiReactMixins);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.uniqueid');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('pui-css-tabs');


var types = _react2.default.PropTypes;

var Tabs = function (_mixin$with) {
  _inherits(Tabs, _mixin$with);

  function Tabs(props, context) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tabs).call(this, props, context));

    _this.checkScreenSize = function () {
      if (_mediaSize2.default.matches(_this.props.responsiveBreakpoint)) {
        _this.setState({ smallScreen: false });
      } else {
        _this.setState({ smallScreen: true });
      }
    };

    _this.handleClick = function (e, eventKey, callback) {
      if (callback) {
        callback(e, eventKey);
      } else {
        _this.setActiveKey(eventKey);
      }
    };

    var id = _this.props.id;

    if (typeof id === 'undefined') {
      id = (0, _lodash2.default)('pui-react-tabs-');
    }
    _this.state = {
      activeKey: _this.props.defaultActiveKey,
      smallScreen: false,
      id: id
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.defaultActiveKey !== this.props.defaultActiveKey) {
        this.setActiveKey(nextProps.defaultActiveKey);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.checkScreenSize);
      this.checkScreenSize();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.checkScreenSize);
    }
  }, {
    key: 'setActiveKey',
    value: function setActiveKey(key) {
      var previousActiveKey = this.state.activeKey;
      this.setState({
        activeKey: key,
        previousActiveKey: previousActiveKey
      });
      if (key !== previousActiveKey) this.animate('transitionProgress', 0);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var actions = _props.actions;
      var children = _props.children;
      var className = _props.className;
      var _props$id = _props.id;
      var id = _props$id === undefined ? this.state.id : _props$id;
      var largeScreenClassName = _props.largeScreenClassName;
      var onSelect = _props.onSelect;
      var paneWidth = _props.paneWidth;
      var position = _props.position;
      var tabType = _props.tabType;
      var tabWidth = _props.tabWidth;

      var props = _objectWithoutProperties(_props, ['actions', 'children', 'className', 'id', 'largeScreenClassName', 'onSelect', 'paneWidth', 'position', 'tabType', 'tabWidth']);

      var largeScreenClasses = (0, _classnames4.default)(['tab-' + tabType, largeScreenClassName, className]);

      var transitionProgress = this.animate('transitionProgress', 1, Tabs.ANIMATION_TIME);

      var childArray = _react2.default.Children.toArray(children);

      if (this.state.smallScreen) {
        return _react2.default.createElement(_small_tabs.SmallTabs, _extends({}, this.state, this.props, {
          transitionProgress: transitionProgress,
          handleClick: this.handleClick
        }));
      }

      var listChildren = childArray.map(function (child, key) {
        var eventKey = child.props.eventKey;

        var paneId = id + '-pane-' + key;
        var tabId = id + '-tab-' + key;
        var isActive = eventKey === _this2.state.activeKey;

        return _react2.default.createElement(
          'li',
          { key: key, role: 'presentation', className: (0, _classnames4.default)({ active: isActive }) },
          _react2.default.createElement(
            'a',
            { id: tabId, 'aria-controls': paneId, 'aria-selected': isActive, role: 'tab',
              onClick: function onClick(e) {
                return _this2.handleClick(e, eventKey, onSelect);
              } },
            child.props.title
          )
        );
      });

      var isLeft = position === 'left';
      var leftPaneClasses = 'col-xs-' + paneWidth;
      var leftTabClasses = 'col-xs-' + tabWidth + ' nav-pills nav-stacked';

      var tabContent = null;
      var activeKey = transitionProgress >= 0.5 ? this.state.activeKey : this.state.previousActiveKey;
      childArray.forEach(function (child, key) {
        var _child$props = child.props;
        var eventKey = _child$props.eventKey;
        var children = _child$props.children;

        var paneId = id + '-pane-' + key;
        var tabId = id + '-tab-' + key;
        var isActive = eventKey === activeKey;
        var style = transitionProgress < 1 ? { opacity: Math.abs(1 - 2 * transitionProgress) } : {};

        if (!isActive) return false;
        tabContent = _react2.default.createElement(
          'div',
          { className: (0, _classnames4.default)('tab-content', _defineProperty({}, leftPaneClasses, isLeft)) },
          _react2.default.createElement(
            'div',
            { className: 'tab-pane fade active in', id: paneId, role: 'tabpanel', 'aria-labelledby': tabId,
              'aria-hidden': 'false', style: style },
            children
          )
        );
      });

      var actionsNode = actions ? _react2.default.createElement(
        'div',
        { className: 'tabs-action' },
        actions
      ) : null;

      return _react2.default.createElement(
        'div',
        _extends({ className: (0, _classnames4.default)(largeScreenClasses, { 'tab-left clearfix': isLeft }) }, props),
        actionsNode,
        _react2.default.createElement(
          'ul',
          { role: 'tablist',
            className: (0, _classnames4.default)('nav', { 'nav-tabs': !isLeft }, _defineProperty({}, leftTabClasses, isLeft)) },
          listChildren
        ),
        tabContent
      );
    }
  }]);

  return Tabs;
}((0, _puiReactMixins2.default)(_react2.default.Component).with(_animation_mixin2.default));

Tabs.propTypes = {
  actions: types.node,
  activeKey: types.number,
  defaultActiveKey: types.any,
  id: types.string,
  largeScreenClassName: types.string,
  onSelect: types.func,
  paneWidth: types.number,
  position: types.oneOf(['top', 'left']),
  responsiveBreakpoint: types.oneOf(['xs', 'sm', 'md', 'lg']),
  smallScreenClassName: types.string,
  tabType: types.oneOf(['simple', 'simple-alt', 'left']),
  tabWidth: types.number
};
Tabs.defaultProps = {
  responsiveBreakpoint: 'xs',
  tabType: 'simple'
};
Tabs.ANIMATION_TIME = 400;

var LeftTabs = function (_React$Component) {
  _inherits(LeftTabs, _React$Component);

  function LeftTabs() {
    _classCallCheck(this, LeftTabs);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LeftTabs).apply(this, arguments));
  }

  _createClass(LeftTabs, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var tabWidth = _props2.tabWidth;
      var paneWidth = _props2.paneWidth;

      var props = _objectWithoutProperties(_props2, ['tabWidth', 'paneWidth']);

      if (!paneWidth) {
        paneWidth = 24 - tabWidth;
      }
      return _react2.default.createElement(Tabs, _extends({}, props, { tabWidth: tabWidth, paneWidth: paneWidth }));
    }
  }]);

  return LeftTabs;
}(_react2.default.Component);

LeftTabs.propTypes = {
  position: types.oneOf(['top', 'left']),
  tabWidth: types.number,
  paneWidth: types.number
};
LeftTabs.defaultProps = {
  position: 'left',
  tabWidth: 6,
  tabType: 'left'
};


var Tab = _Tab2.default;

module.exports = {
  Tabs: Tabs,
  Tab: Tab,
  LeftTabs: LeftTabs
};