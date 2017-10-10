var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 
 * @file Function to render the action table cell
 */

import React from 'react';
import ItemAction from './ItemAction';


export default (function (_onClick, getLocalizedMessage) {
    return function (_ref) {
        var rowData = _ref.rowData;
        return React.createElement(ItemAction, _extends({}, rowData, { onClick: function onClick() {
                return _onClick(rowData);
            }, getLocalizedMessage: getLocalizedMessage }));
    };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbkNlbGxSZW5kZXJlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkl0ZW1BY3Rpb24iLCJvbkNsaWNrIiwiZ2V0TG9jYWxpemVkTWVzc2FnZSIsInJvd0RhdGEiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7O0FBS0EsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsY0FBdkI7OztBQU9BLGdCQUFlLFVBQUNDLFFBQUQsRUFBb0JDLG1CQUFwQjtBQUFBLFdBQXNEO0FBQUEsWUFBR0MsT0FBSCxRQUFHQSxPQUFIO0FBQUEsZUFDakUsb0JBQUMsVUFBRCxlQUFnQkEsT0FBaEIsSUFBeUIsU0FBUztBQUFBLHVCQUFNRixTQUFRRSxPQUFSLENBQU47QUFBQSxhQUFsQyxFQUEwRCxxQkFBcUJELG1CQUEvRSxJQURpRTtBQUFBLEtBQXREO0FBQUEsQ0FBZiIsImZpbGUiOiJhY3Rpb25DZWxsUmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgRnVuY3Rpb24gdG8gcmVuZGVyIHRoZSBhY3Rpb24gdGFibGUgY2VsbFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBJdGVtQWN0aW9uIGZyb20gJy4vSXRlbUFjdGlvbic7XHJcbmltcG9ydCB0eXBlIHsgVXBsb2FkSXRlbSB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgcm93RGF0YTogVXBsb2FkSXRlbVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKG9uQ2xpY2s6IEZ1bmN0aW9uLCBnZXRMb2NhbGl6ZWRNZXNzYWdlOiBGdW5jdGlvbikgPT4gKHsgcm93RGF0YSB9OiBQcm9wcykgPT5cclxuICAgIDxJdGVtQWN0aW9uIHsuLi5yb3dEYXRhfSBvbkNsaWNrPXsoKSA9PiBvbkNsaWNrKHJvd0RhdGEpfSBnZXRMb2NhbGl6ZWRNZXNzYWdlPXtnZXRMb2NhbGl6ZWRNZXNzYWdlfSAvPjtcclxuIl19