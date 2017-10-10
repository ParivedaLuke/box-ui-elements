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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkljb25DaGV2cm9uLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiRE9XTiIsIkxFRlQiLCJSSUdIVCIsIlVQIiwicm90YXRpb25zIiwidG9wcyIsImxlZnRzIiwiSWNvbkNoZXZyb24iLCJjbGFzc05hbWUiLCJjb2xvciIsImRpcmVjdGlvbiIsInNpemUiLCJ0aGlja25lc3MiLCJib3JkZXJDb2xvciIsImJvcmRlclN0eWxlIiwiYm9yZGVyV2lkdGgiLCJkaXNwbGF5IiwiaGVpZ2h0IiwidHJhbnNmb3JtIiwid2lkdGgiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjs7O0FBR0EsSUFBTUMsT0FBZSxNQUFyQjtBQUNBLElBQU1DLE9BQWUsTUFBckI7QUFDQSxJQUFNQyxRQUFpQixPQUF2QjtBQUNBLElBQU1DLEtBQVcsSUFBakI7O0FBU0EsSUFBTUMsMERBQ0RKLElBREMsRUFDTSxHQUROLCtCQUVEQyxJQUZDLEVBRU0sR0FGTiwrQkFHREMsS0FIQyxFQUdPLEVBSFAsK0JBSURDLEVBSkMsRUFJSSxHQUpKLGNBQU47O0FBT0EsSUFBTUUsMkNBQ0RMLElBREMsRUFDTSxDQUFDLENBRFAsMEJBRURDLElBRkMsRUFFTSxDQUZOLDBCQUdEQyxLQUhDLEVBR08sQ0FIUCwwQkFJREMsRUFKQyxFQUlJLENBSkosU0FBTjs7QUFPQSxJQUFNRyw4Q0FDRE4sSUFEQyxFQUNNLENBRE4sMkJBRURDLElBRkMsRUFFTSxDQUZOLDJCQUdEQyxLQUhDLEVBR08sQ0FBQyxDQUhSLDJCQUlEQyxFQUpDLEVBSUksQ0FKSixVQUFOOztBQU9BLElBQU1JLGNBQWMsU0FBZEEsV0FBYztBQUFBLDhCQUFHQyxTQUFIO0FBQUEsUUFBR0EsU0FBSCxrQ0FBZSxFQUFmO0FBQUEsMEJBQW1CQyxLQUFuQjtBQUFBLFFBQW1CQSxLQUFuQiw4QkFBMkIsTUFBM0I7QUFBQSw4QkFBbUNDLFNBQW5DO0FBQUEsUUFBbUNBLFNBQW5DLGtDQUErQ1AsRUFBL0M7QUFBQSx5QkFBbURRLElBQW5EO0FBQUEsUUFBbURBLElBQW5ELDZCQUEwRCxDQUExRDtBQUFBLDhCQUE2REMsU0FBN0Q7QUFBQSxRQUE2REEsU0FBN0Qsa0NBQXlFLENBQXpFO0FBQUEsV0FDaEI7QUFDSSxtQkFBV0osU0FEZjtBQUVJLGVBQU87QUFDSEsseUJBQWFKLEtBRFY7QUFFSEsseUJBQWEsdUJBRlY7QUFHSEMseUJBQWdCSCxTQUFoQixPQUhHO0FBSUhJLHFCQUFTLGNBSk47QUFLSEMsb0JBQVdOLElBQVgsT0FMRztBQU1ITyxtQ0FBcUJkLFVBQVVNLFNBQVYsQ0FBckIsU0FORztBQU9IUyxtQkFBVVIsSUFBVixPQVBHO0FBUUhTLHNCQUFVLFVBUlA7QUFTSEMsaUJBQVFoQixLQUFLSyxTQUFMLENBQVIsT0FURztBQVVIWSxrQkFBU2hCLE1BQU1JLFNBQU4sQ0FBVDtBQVZHO0FBRlgsTUFEZ0I7QUFBQSxDQUFwQjs7QUFpQkEsZUFBZUgsV0FBZiIsImZpbGUiOiJJY29uQ2hldnJvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBJY29uXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHR5cGUgeyBJY29uVHlwZSB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcblxyXG5jb25zdCBET1dOOiAnZG93bicgPSAnZG93bic7XHJcbmNvbnN0IExFRlQ6ICdsZWZ0JyA9ICdsZWZ0JztcclxuY29uc3QgUklHSFQ6ICdyaWdodCcgPSAncmlnaHQnO1xyXG5jb25zdCBVUDogJ3VwJyA9ICd1cCc7XHJcblxyXG50eXBlIERpcmVjdGlvbiA9IHR5cGVvZiBET1dOIHwgdHlwZW9mIExFRlQgfCB0eXBlb2YgVVAgfCB0eXBlb2YgUklHSFQ7XHJcbnR5cGUgUHJvcHMgPSBJY29uVHlwZSAmIHtcclxuICAgIGRpcmVjdGlvbjogRGlyZWN0aW9uLFxyXG4gICAgc2l6ZT86IG51bWJlcixcclxuICAgIHRoaWNrbmVzcz86IG51bWJlclxyXG59O1xyXG5cclxuY29uc3Qgcm90YXRpb25zOiB7IFtEaXJlY3Rpb25dOiBudW1iZXIgfSA9IHtcclxuICAgIFtET1dOXTogMTM1LFxyXG4gICAgW0xFRlRdOiAyMjUsXHJcbiAgICBbUklHSFRdOiA0NSxcclxuICAgIFtVUF06IDMxNVxyXG59O1xyXG5cclxuY29uc3QgdG9wczogeyBbRGlyZWN0aW9uXTogbnVtYmVyIH0gPSB7XHJcbiAgICBbRE9XTl06IC0yLFxyXG4gICAgW0xFRlRdOiAwLFxyXG4gICAgW1JJR0hUXTogMCxcclxuICAgIFtVUF06IDBcclxufTtcclxuXHJcbmNvbnN0IGxlZnRzOiB7IFtEaXJlY3Rpb25dOiBudW1iZXIgfSA9IHtcclxuICAgIFtET1dOXTogMCxcclxuICAgIFtMRUZUXTogMCxcclxuICAgIFtSSUdIVF06IC0yLFxyXG4gICAgW1VQXTogMFxyXG59O1xyXG5cclxuY29uc3QgSWNvbkNoZXZyb24gPSAoeyBjbGFzc05hbWUgPSAnJywgY29sb3IgPSAnIzc3NycsIGRpcmVjdGlvbiA9IFVQLCBzaXplID0gNSwgdGhpY2tuZXNzID0gMSB9OiBQcm9wcykgPT5cclxuICAgIDxzcGFuXHJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6IGNvbG9yLFxyXG4gICAgICAgICAgICBib3JkZXJTdHlsZTogJ3NvbGlkIHNvbGlkIG5vbmUgbm9uZScsXHJcbiAgICAgICAgICAgIGJvcmRlcldpZHRoOiBgJHt0aGlja25lc3N9cHhgLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgaGVpZ2h0OiBgJHtzaXplfXB4YCxcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiBgcm90YXRlKCR7cm90YXRpb25zW2RpcmVjdGlvbl19ZGVnKWAsXHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHtzaXplfXB4YCxcclxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgIHRvcDogYCR7dG9wc1tkaXJlY3Rpb25dfXB4YCxcclxuICAgICAgICAgICAgbGVmdDogYCR7bGVmdHNbZGlyZWN0aW9uXX1weGBcclxuICAgICAgICB9fVxyXG4gICAgLz47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJY29uQ2hldnJvbjtcclxuIl19