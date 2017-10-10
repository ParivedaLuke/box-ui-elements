/**
 * 
 * @file Clickable breadcrumb component
 * @author Box
 */

import React from 'react';
import BreadcrumbDelimiter from './BreadcrumbDelimiter';
import { PlainButton } from '../Button';


var Breadcrumb = function Breadcrumb(_ref) {
    var _ref$name = _ref.name,
        name = _ref$name === undefined ? '' : _ref$name,
        onClick = _ref.onClick,
        isLast = _ref.isLast,
        delimiter = _ref.delimiter;

    var title = onClick ? React.createElement(
        PlainButton,
        { onClick: onClick },
        name
    ) : React.createElement(
        'span',
        null,
        name
    );
    return React.createElement(
        'span',
        { className: 'buik-breadcrumb' },
        title,
        isLast ? null : React.createElement(BreadcrumbDelimiter, { delimiter: delimiter })
    );
};

export default Breadcrumb;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJyZWFkY3J1bWIuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJCcmVhZGNydW1iRGVsaW1pdGVyIiwiUGxhaW5CdXR0b24iLCJCcmVhZGNydW1iIiwibmFtZSIsIm9uQ2xpY2siLCJpc0xhc3QiLCJkZWxpbWl0ZXIiLCJ0aXRsZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxtQkFBUCxNQUFnQyx1QkFBaEM7QUFDQSxTQUFTQyxXQUFULFFBQTRCLFdBQTVCOzs7QUFXQSxJQUFNQyxhQUFhLFNBQWJBLFVBQWEsT0FBc0Q7QUFBQSx5QkFBbkRDLElBQW1EO0FBQUEsUUFBbkRBLElBQW1ELDZCQUE1QyxFQUE0QztBQUFBLFFBQXhDQyxPQUF3QyxRQUF4Q0EsT0FBd0M7QUFBQSxRQUEvQkMsTUFBK0IsUUFBL0JBLE1BQStCO0FBQUEsUUFBdkJDLFNBQXVCLFFBQXZCQSxTQUF1Qjs7QUFDckUsUUFBTUMsUUFBUUgsVUFDUjtBQUFDLG1CQUFEO0FBQUEsVUFBYSxTQUFTQSxPQUF0QjtBQUNHRDtBQURILEtBRFEsR0FJUjtBQUFBO0FBQUE7QUFDR0E7QUFESCxLQUpOO0FBT0EsV0FDSTtBQUFBO0FBQUEsVUFBTSxXQUFVLGlCQUFoQjtBQUNLSSxhQURMO0FBRUtGLGlCQUFTLElBQVQsR0FBZ0Isb0JBQUMsbUJBQUQsSUFBcUIsV0FBV0MsU0FBaEM7QUFGckIsS0FESjtBQU1ILENBZEQ7O0FBZ0JBLGVBQWVKLFVBQWYiLCJmaWxlIjoiQnJlYWRjcnVtYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBDbGlja2FibGUgYnJlYWRjcnVtYiBjb21wb25lbnRcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQnJlYWRjcnVtYkRlbGltaXRlciBmcm9tICcuL0JyZWFkY3J1bWJEZWxpbWl0ZXInO1xyXG5pbXBvcnQgeyBQbGFpbkJ1dHRvbiB9IGZyb20gJy4uL0J1dHRvbic7XHJcbmltcG9ydCB0eXBlIHsgRGVsaW1pdGVyIH0gZnJvbSAnLi4vLi4vZmxvd1R5cGVzJztcclxuaW1wb3J0ICcuL0JyZWFkY3J1bWIuc2Nzcyc7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgb25DbGljaz86IEZ1bmN0aW9uLFxyXG4gICAgaXNMYXN0PzogYm9vbGVhbixcclxuICAgIGRlbGltaXRlcj86IERlbGltaXRlclxyXG59O1xyXG5cclxuY29uc3QgQnJlYWRjcnVtYiA9ICh7IG5hbWUgPSAnJywgb25DbGljaywgaXNMYXN0LCBkZWxpbWl0ZXIgfTogUHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHRpdGxlID0gb25DbGlja1xyXG4gICAgICAgID8gPFBsYWluQnV0dG9uIG9uQ2xpY2s9e29uQ2xpY2t9PlxyXG4gICAgICAgICAgICB7bmFtZX1cclxuICAgICAgICA8L1BsYWluQnV0dG9uPlxyXG4gICAgICAgIDogPHNwYW4+XHJcbiAgICAgICAgICAgIHtuYW1lfVxyXG4gICAgICAgIDwvc3Bhbj47XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nYnVpay1icmVhZGNydW1iJz5cclxuICAgICAgICAgICAge3RpdGxlfVxyXG4gICAgICAgICAgICB7aXNMYXN0ID8gbnVsbCA6IDxCcmVhZGNydW1iRGVsaW1pdGVyIGRlbGltaXRlcj17ZGVsaW1pdGVyfSAvPn1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnJlYWRjcnVtYjtcclxuIl19