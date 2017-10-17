var _rotations, _tops, _lefts;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 
 * @file Icon
 * @author Box
 */

import React from 'react';


var DOWN = 'down';
var LEFT = 'left';
var RIGHT = 'right';
var UP = 'up';

var rotations = (_rotations = {}, _defineProperty(_rotations, DOWN, 135), _defineProperty(_rotations, LEFT, 225), _defineProperty(_rotations, RIGHT, 45), _defineProperty(_rotations, UP, 315), _rotations);

var tops = (_tops = {}, _defineProperty(_tops, DOWN, -2), _defineProperty(_tops, LEFT, 0), _defineProperty(_tops, RIGHT, 0), _defineProperty(_tops, UP, 0), _tops);

var lefts = (_lefts = {}, _defineProperty(_lefts, DOWN, 0), _defineProperty(_lefts, LEFT, 0), _defineProperty(_lefts, RIGHT, -2), _defineProperty(_lefts, UP, 0), _lefts);

var IconChevron = function IconChevron(_ref) {
    var _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? '#777' : _ref$color,
        _ref$direction = _ref.direction,
        direction = _ref$direction === undefined ? UP : _ref$direction,
        _ref$size = _ref.size,
        size = _ref$size === undefined ? 5 : _ref$size,
        _ref$thickness = _ref.thickness,
        thickness = _ref$thickness === undefined ? 1 : _ref$thickness;
    return React.createElement('span', {
        className: className,
        style: {
            borderColor: color,
            borderStyle: 'solid solid none none',
            borderWidth: thickness + 'px',
            display: 'inline-block',
            height: size + 'px',
            transform: 'rotate(' + rotations[direction] + 'deg)',
            width: size + 'px',
            position: 'relative',
            top: tops[direction] + 'px',
            left: lefts[direction] + 'px'
        }
    });
};

export default IconChevron;