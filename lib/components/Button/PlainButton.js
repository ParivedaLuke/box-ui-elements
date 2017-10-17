var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * 
 * @file Plain Button component
 * @author Box
 */

import React from 'react';
import Button from './Button';

var PlainButton = function PlainButton(_ref) {
    var children = _ref.children,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        rest = _objectWithoutProperties(_ref, ['children', 'className']);

    return React.createElement(
        Button,
        _extends({ className: 'buik-btn-plain ' + className }, rest),
        children
    );
};

export default PlainButton;