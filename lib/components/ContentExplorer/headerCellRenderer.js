/**
 * 
 * @file Function to render the date table cell
 * @author Box
 */

import React from 'react';
import IconChevron from '../icons/IconChevron';
import { SORT_ASC } from '../../constants';


export default (function (_ref) {
    var dataKey = _ref.dataKey,
        label = _ref.label,
        sortBy = _ref.sortBy,
        sortDirection = _ref.sortDirection;

    var by = sortBy.toLowerCase();
    var direction = sortDirection === SORT_ASC ? 'up' : 'down';
    return React.createElement(
        'div',
        null,
        label,
        '\xA0\xA0',
        by === dataKey && React.createElement(IconChevron, { direction: direction })
    );
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlckNlbGxSZW5kZXJlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkljb25DaGV2cm9uIiwiU09SVF9BU0MiLCJkYXRhS2V5IiwibGFiZWwiLCJzb3J0QnkiLCJzb3J0RGlyZWN0aW9uIiwiYnkiLCJ0b0xvd2VyQ2FzZSIsImRpcmVjdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxXQUFQLE1BQXdCLHNCQUF4QjtBQUNBLFNBQVNDLFFBQVQsUUFBeUIsaUJBQXpCOzs7QUFVQSxnQkFBZSxnQkFBc0Q7QUFBQSxRQUFuREMsT0FBbUQsUUFBbkRBLE9BQW1EO0FBQUEsUUFBMUNDLEtBQTBDLFFBQTFDQSxLQUEwQztBQUFBLFFBQW5DQyxNQUFtQyxRQUFuQ0EsTUFBbUM7QUFBQSxRQUEzQkMsYUFBMkIsUUFBM0JBLGFBQTJCOztBQUNqRSxRQUFNQyxLQUFLRixPQUFPRyxXQUFQLEVBQVg7QUFDQSxRQUFNQyxZQUFZSCxrQkFBa0JKLFFBQWxCLEdBQTZCLElBQTdCLEdBQW9DLE1BQXREO0FBQ0EsV0FDSTtBQUFBO0FBQUE7QUFDS0UsYUFETDtBQUFBO0FBR0tHLGVBQU9KLE9BQVAsSUFBa0Isb0JBQUMsV0FBRCxJQUFhLFdBQVdNLFNBQXhCO0FBSHZCLEtBREo7QUFPSCxDQVZEIiwiZmlsZSI6ImhlYWRlckNlbGxSZW5kZXJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBGdW5jdGlvbiB0byByZW5kZXIgdGhlIGRhdGUgdGFibGUgY2VsbFxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBJY29uQ2hldnJvbiBmcm9tICcuLi9pY29ucy9JY29uQ2hldnJvbic7XHJcbmltcG9ydCB7IFNPUlRfQVNDIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHR5cGUgeyBTb3J0QnksIFNvcnREaXJlY3Rpb24gfSBmcm9tICcuLi8uLi9mbG93VHlwZXMnO1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICAgIGRhdGFLZXk6IFNvcnRCeSxcclxuICAgIGxhYmVsOiBzdHJpbmcsXHJcbiAgICBzb3J0Qnk6IFNvcnRCeSxcclxuICAgIHNvcnREaXJlY3Rpb246IFNvcnREaXJlY3Rpb25cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICh7IGRhdGFLZXksIGxhYmVsLCBzb3J0QnksIHNvcnREaXJlY3Rpb24gfTogUHJvcHMpID0+IHtcclxuICAgIGNvbnN0IGJ5ID0gc29ydEJ5LnRvTG93ZXJDYXNlKCk7XHJcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBzb3J0RGlyZWN0aW9uID09PSBTT1JUX0FTQyA/ICd1cCcgOiAnZG93bic7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIHtsYWJlbH1cclxuICAgICAgICAgICAgJm5ic3A7Jm5ic3A7XHJcbiAgICAgICAgICAgIHtieSA9PT0gZGF0YUtleSAmJiA8SWNvbkNoZXZyb24gZGlyZWN0aW9uPXtkaXJlY3Rpb259IC8+fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufTtcclxuIl19