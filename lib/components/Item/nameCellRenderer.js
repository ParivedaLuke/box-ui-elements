/**
 * 
 * @file Function to render the name table cell
 * @author Box
 */

import React from 'react';
import ItemName from './ItemName';
import ItemDetails from './ItemDetails';
import { VIEW_SEARCH } from '../../constants';


export default (function (rootId, getLocalizedMessage, view, onItemClick, onItemSelect) {
    var canPreview = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var showDetails = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
    var isTouch = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
    return function (_ref) {
        var rowData = _ref.rowData;
        return React.createElement(
            'div',
            { className: 'buik-item-name' },
            React.createElement(ItemName, {
                isTouch: isTouch,
                item: rowData,
                canPreview: canPreview,
                onClick: onItemClick,
                onFocus: onItemSelect
            }),
            view === VIEW_SEARCH || showDetails ? React.createElement(ItemDetails, {
                item: rowData,
                view: view,
                rootId: rootId,
                onItemClick: onItemClick,
                getLocalizedMessage: getLocalizedMessage
            }) : null
        );
    };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hbWVDZWxsUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJJdGVtTmFtZSIsIkl0ZW1EZXRhaWxzIiwiVklFV19TRUFSQ0giLCJyb290SWQiLCJnZXRMb2NhbGl6ZWRNZXNzYWdlIiwidmlldyIsIm9uSXRlbUNsaWNrIiwib25JdGVtU2VsZWN0IiwiY2FuUHJldmlldyIsInNob3dEZXRhaWxzIiwiaXNUb3VjaCIsInJvd0RhdGEiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFNQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixZQUFyQjtBQUNBLE9BQU9DLFdBQVAsTUFBd0IsZUFBeEI7QUFDQSxTQUFTQyxXQUFULFFBQTRCLGlCQUE1Qjs7O0FBSUEsZ0JBQWUsVUFDWEMsTUFEVyxFQUVYQyxtQkFGVyxFQUdYQyxJQUhXLEVBSVhDLFdBSlcsRUFLWEMsWUFMVztBQUFBLFFBTVhDLFVBTlcsdUVBTVcsS0FOWDtBQUFBLFFBT1hDLFdBUFcsdUVBT1ksSUFQWjtBQUFBLFFBUVhDLE9BUlcsdUVBUVEsS0FSUjtBQUFBLFdBU1Y7QUFBQSxZQUFHQyxPQUFILFFBQUdBLE9BQUg7QUFBQSxlQUNEO0FBQUE7QUFBQSxjQUFLLFdBQVUsZ0JBQWY7QUFDSSxnQ0FBQyxRQUFEO0FBQ0kseUJBQVNELE9BRGI7QUFFSSxzQkFBTUMsT0FGVjtBQUdJLDRCQUFZSCxVQUhoQjtBQUlJLHlCQUFTRixXQUpiO0FBS0kseUJBQVNDO0FBTGIsY0FESjtBQVFLRixxQkFBU0gsV0FBVCxJQUF3Qk8sV0FBeEIsR0FDSyxvQkFBQyxXQUFEO0FBQ0Usc0JBQU1FLE9BRFI7QUFFRSxzQkFBTU4sSUFGUjtBQUdFLHdCQUFRRixNQUhWO0FBSUUsNkJBQWFHLFdBSmY7QUFLRSxxQ0FBcUJGO0FBTHZCLGNBREwsR0FRSztBQWhCVixTQURDO0FBQUEsS0FUVTtBQUFBLENBQWYiLCJmaWxlIjoibmFtZUNlbGxSZW5kZXJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBGdW5jdGlvbiB0byByZW5kZXIgdGhlIG5hbWUgdGFibGUgY2VsbFxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBJdGVtTmFtZSBmcm9tICcuL0l0ZW1OYW1lJztcclxuaW1wb3J0IEl0ZW1EZXRhaWxzIGZyb20gJy4vSXRlbURldGFpbHMnO1xyXG5pbXBvcnQgeyBWSUVXX1NFQVJDSCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB0eXBlIHsgVmlldywgQm94SXRlbSB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcbmltcG9ydCAnLi9OYW1lQ2VsbC5zY3NzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChcclxuICAgIHJvb3RJZDogc3RyaW5nLFxyXG4gICAgZ2V0TG9jYWxpemVkTWVzc2FnZTogRnVuY3Rpb24sXHJcbiAgICB2aWV3OiBWaWV3LFxyXG4gICAgb25JdGVtQ2xpY2s6IEZ1bmN0aW9uLFxyXG4gICAgb25JdGVtU2VsZWN0PzogRnVuY3Rpb24sXHJcbiAgICBjYW5QcmV2aWV3OiBib29sZWFuID0gZmFsc2UsXHJcbiAgICBzaG93RGV0YWlsczogYm9vbGVhbiA9IHRydWUsXHJcbiAgICBpc1RvdWNoOiBib29sZWFuID0gZmFsc2VcclxuKSA9PiAoeyByb3dEYXRhIH06IHsgcm93RGF0YTogQm94SXRlbSB9KSA9PlxyXG4gICAgPGRpdiBjbGFzc05hbWU9J2J1aWstaXRlbS1uYW1lJz5cclxuICAgICAgICA8SXRlbU5hbWVcclxuICAgICAgICAgICAgaXNUb3VjaD17aXNUb3VjaH1cclxuICAgICAgICAgICAgaXRlbT17cm93RGF0YX1cclxuICAgICAgICAgICAgY2FuUHJldmlldz17Y2FuUHJldmlld31cclxuICAgICAgICAgICAgb25DbGljaz17b25JdGVtQ2xpY2t9XHJcbiAgICAgICAgICAgIG9uRm9jdXM9e29uSXRlbVNlbGVjdH1cclxuICAgICAgICAvPlxyXG4gICAgICAgIHt2aWV3ID09PSBWSUVXX1NFQVJDSCB8fCBzaG93RGV0YWlsc1xyXG4gICAgICAgICAgICA/IDxJdGVtRGV0YWlsc1xyXG4gICAgICAgICAgICAgICAgaXRlbT17cm93RGF0YX1cclxuICAgICAgICAgICAgICAgIHZpZXc9e3ZpZXd9XHJcbiAgICAgICAgICAgICAgICByb290SWQ9e3Jvb3RJZH1cclxuICAgICAgICAgICAgICAgIG9uSXRlbUNsaWNrPXtvbkl0ZW1DbGlja31cclxuICAgICAgICAgICAgICAgIGdldExvY2FsaXplZE1lc3NhZ2U9e2dldExvY2FsaXplZE1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgOiBudWxsfVxyXG4gICAgPC9kaXY+O1xyXG4iXX0=