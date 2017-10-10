/**
 * 
 * @file Function to render the table cell
 * @author Box
 */

import React from 'react';
import { Button } from '../Button';
import iconCellRenderer from '../Item/iconCellRenderer';
import ItemName from '../Item/ItemName';
import ItemSubDetails from '../Item/ItemSubDetails';
import { TYPE_FOLDER, VIEW_FOLDER } from '../../constants';


export default (function (getLocalizedMessage, onExpanderClick, onItemClick) {
    var isSmall = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var isLoading = arguments[4];
    return function (_ref) {
        var rowData = _ref.rowData;
        var path_collection = rowData.path_collection,
            selected = rowData.selected;

        if (!path_collection) {
            throw new Error('Bad Item!');
        }

        var paddingLeft = (path_collection.total_count - 1) * (isSmall ? 22 : 34) + 'px';
        var onClick = function onClick() {
            return onExpanderClick(rowData);
        };

        return React.createElement(
            'div',
            { className: 'bft-cell-node', style: { paddingLeft: paddingLeft } },
            rowData.type === TYPE_FOLDER ? React.createElement(
                Button,
                { onClick: onClick, className: 'bft-cell-node-btn', isDisabled: isLoading },
                selected ? '-' : '+'
            ) : React.createElement('div', { className: 'bft-cell-node-btn' }),
            iconCellRenderer(isSmall ? 24 : 32)({ rowData: rowData }),
            React.createElement(
                'div',
                { className: 'buik-item-name' },
                React.createElement(ItemName, { isTouch: false, item: rowData, canPreview: true, onClick: onItemClick }),
                isSmall ? null : React.createElement(
                    'div',
                    { className: 'buik-item-details' },
                    React.createElement(ItemSubDetails, { view: VIEW_FOLDER, item: rowData, getLocalizedMessage: getLocalizedMessage })
                )
            )
        );
    };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlbGxSZW5kZXJlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkJ1dHRvbiIsImljb25DZWxsUmVuZGVyZXIiLCJJdGVtTmFtZSIsIkl0ZW1TdWJEZXRhaWxzIiwiVFlQRV9GT0xERVIiLCJWSUVXX0ZPTERFUiIsImdldExvY2FsaXplZE1lc3NhZ2UiLCJvbkV4cGFuZGVyQ2xpY2siLCJvbkl0ZW1DbGljayIsImlzU21hbGwiLCJpc0xvYWRpbmciLCJyb3dEYXRhIiwicGF0aF9jb2xsZWN0aW9uIiwic2VsZWN0ZWQiLCJFcnJvciIsInBhZGRpbmdMZWZ0IiwidG90YWxfY291bnQiLCJvbkNsaWNrIiwidHlwZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxNQUFULFFBQXVCLFdBQXZCO0FBQ0EsT0FBT0MsZ0JBQVAsTUFBNkIsMEJBQTdCO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixrQkFBckI7QUFDQSxPQUFPQyxjQUFQLE1BQTJCLHdCQUEzQjtBQUNBLFNBQVNDLFdBQVQsRUFBc0JDLFdBQXRCLFFBQXlDLGlCQUF6Qzs7O0FBSUEsZ0JBQWUsVUFDWEMsbUJBRFcsRUFFWEMsZUFGVyxFQUdYQyxXQUhXO0FBQUEsUUFJWEMsT0FKVyx1RUFJUSxLQUpSO0FBQUEsUUFLWEMsU0FMVztBQUFBLFdBTVYsZ0JBQXVDO0FBQUEsWUFBcENDLE9BQW9DLFFBQXBDQSxPQUFvQztBQUFBLFlBQ2hDQyxlQURnQyxHQUNPRCxPQURQLENBQ2hDQyxlQURnQztBQUFBLFlBQ2ZDLFFBRGUsR0FDT0YsT0FEUCxDQUNmRSxRQURlOztBQUV4QyxZQUFJLENBQUNELGVBQUwsRUFBc0I7QUFDbEIsa0JBQU0sSUFBSUUsS0FBSixDQUFVLFdBQVYsQ0FBTjtBQUNIOztBQUVELFlBQU1DLGNBQWlCLENBQUNILGdCQUFnQkksV0FBaEIsR0FBOEIsQ0FBL0IsS0FBcUNQLFVBQVUsRUFBVixHQUFlLEVBQXBELENBQWpCLE9BQU47QUFDQSxZQUFNUSxVQUFvQixTQUFwQkEsT0FBb0I7QUFBQSxtQkFBWVYsZ0JBQWdCSSxPQUFoQixDQUFaO0FBQUEsU0FBMUI7O0FBRUEsZUFDSTtBQUFBO0FBQUEsY0FBSyxXQUFVLGVBQWYsRUFBK0IsT0FBTyxFQUFFSSx3QkFBRixFQUF0QztBQUNLSixvQkFBUU8sSUFBUixLQUFpQmQsV0FBakIsR0FDSztBQUFDLHNCQUFEO0FBQUEsa0JBQVEsU0FBU2EsT0FBakIsRUFBMEIsV0FBVSxtQkFBcEMsRUFBd0QsWUFBWVAsU0FBcEU7QUFDR0csMkJBQVcsR0FBWCxHQUFpQjtBQURwQixhQURMLEdBSUssNkJBQUssV0FBVSxtQkFBZixHQUxWO0FBTUtaLDZCQUFpQlEsVUFBVSxFQUFWLEdBQWUsRUFBaEMsRUFBb0MsRUFBRUUsZ0JBQUYsRUFBcEMsQ0FOTDtBQU9JO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGdCQUFmO0FBQ0ksb0NBQUMsUUFBRCxJQUFVLFNBQVMsS0FBbkIsRUFBMEIsTUFBTUEsT0FBaEMsRUFBeUMsZ0JBQXpDLEVBQW9ELFNBQVNILFdBQTdELEdBREo7QUFFS0MsMEJBQ0ssSUFETCxHQUVLO0FBQUE7QUFBQSxzQkFBSyxXQUFVLG1CQUFmO0FBQ0Usd0NBQUMsY0FBRCxJQUFnQixNQUFNSixXQUF0QixFQUFtQyxNQUFNTSxPQUF6QyxFQUFrRCxxQkFBcUJMLG1CQUF2RTtBQURGO0FBSlY7QUFQSixTQURKO0FBa0JILEtBakNjO0FBQUEsQ0FBZiIsImZpbGUiOiJjZWxsUmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgRnVuY3Rpb24gdG8gcmVuZGVyIHRoZSB0YWJsZSBjZWxsXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vQnV0dG9uJztcclxuaW1wb3J0IGljb25DZWxsUmVuZGVyZXIgZnJvbSAnLi4vSXRlbS9pY29uQ2VsbFJlbmRlcmVyJztcclxuaW1wb3J0IEl0ZW1OYW1lIGZyb20gJy4uL0l0ZW0vSXRlbU5hbWUnO1xyXG5pbXBvcnQgSXRlbVN1YkRldGFpbHMgZnJvbSAnLi4vSXRlbS9JdGVtU3ViRGV0YWlscyc7XHJcbmltcG9ydCB7IFRZUEVfRk9MREVSLCBWSUVXX0ZPTERFUiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB0eXBlIHsgQm94SXRlbSB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcbmltcG9ydCAnLi9DZWxsLnNjc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKFxyXG4gICAgZ2V0TG9jYWxpemVkTWVzc2FnZTogRnVuY3Rpb24sXHJcbiAgICBvbkV4cGFuZGVyQ2xpY2s6IEZ1bmN0aW9uLFxyXG4gICAgb25JdGVtQ2xpY2s6IEZ1bmN0aW9uLFxyXG4gICAgaXNTbWFsbDogYm9vbGVhbiA9IGZhbHNlLFxyXG4gICAgaXNMb2FkaW5nOiBib29sZWFuXHJcbikgPT4gKHsgcm93RGF0YSB9OiB7IHJvd0RhdGE6IEJveEl0ZW0gfSkgPT4ge1xyXG4gICAgY29uc3QgeyBwYXRoX2NvbGxlY3Rpb24sIHNlbGVjdGVkIH06IEJveEl0ZW0gPSByb3dEYXRhO1xyXG4gICAgaWYgKCFwYXRoX2NvbGxlY3Rpb24pIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhZCBJdGVtIScpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhZGRpbmdMZWZ0ID0gYCR7KHBhdGhfY29sbGVjdGlvbi50b3RhbF9jb3VudCAtIDEpICogKGlzU21hbGwgPyAyMiA6IDM0KX1weGA7XHJcbiAgICBjb25zdCBvbkNsaWNrOiBGdW5jdGlvbiA9ICgpOiB2b2lkID0+IG9uRXhwYW5kZXJDbGljayhyb3dEYXRhKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiZnQtY2VsbC1ub2RlJyBzdHlsZT17eyBwYWRkaW5nTGVmdCB9fT5cclxuICAgICAgICAgICAge3Jvd0RhdGEudHlwZSA9PT0gVFlQRV9GT0xERVJcclxuICAgICAgICAgICAgICAgID8gPEJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrfSBjbGFzc05hbWU9J2JmdC1jZWxsLW5vZGUtYnRuJyBpc0Rpc2FibGVkPXtpc0xvYWRpbmd9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZCA/ICctJyA6ICcrJ31cclxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgOiA8ZGl2IGNsYXNzTmFtZT0nYmZ0LWNlbGwtbm9kZS1idG4nIC8+fVxyXG4gICAgICAgICAgICB7aWNvbkNlbGxSZW5kZXJlcihpc1NtYWxsID8gMjQgOiAzMikoeyByb3dEYXRhIH0pfVxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYnVpay1pdGVtLW5hbWUnPlxyXG4gICAgICAgICAgICAgICAgPEl0ZW1OYW1lIGlzVG91Y2g9e2ZhbHNlfSBpdGVtPXtyb3dEYXRhfSBjYW5QcmV2aWV3IG9uQ2xpY2s9e29uSXRlbUNsaWNrfSAvPlxyXG4gICAgICAgICAgICAgICAge2lzU21hbGxcclxuICAgICAgICAgICAgICAgICAgICA/IG51bGxcclxuICAgICAgICAgICAgICAgICAgICA6IDxkaXYgY2xhc3NOYW1lPSdidWlrLWl0ZW0tZGV0YWlscyc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJdGVtU3ViRGV0YWlscyB2aWV3PXtWSUVXX0ZPTERFUn0gaXRlbT17cm93RGF0YX0gZ2V0TG9jYWxpemVkTWVzc2FnZT17Z2V0TG9jYWxpemVkTWVzc2FnZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufTtcclxuIl19