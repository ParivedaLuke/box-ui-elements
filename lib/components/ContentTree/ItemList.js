/**
 * 
 * @file Item list component
 * @author Box
 */

import React from 'react';
import { Table, Column } from 'react-virtualized/dist/es/Table';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';

import cellRenderer from './cellRenderer';
import { FIELD_NAME } from '../../constants';


var ItemList = function ItemList(_ref) {
    var isSmall = _ref.isSmall,
        isLoading = _ref.isLoading,
        onItemClick = _ref.onItemClick,
        onExpanderClick = _ref.onExpanderClick,
        _ref$items = _ref.items,
        items = _ref$items === undefined ? [] : _ref$items,
        tableRef = _ref.tableRef,
        getLocalizedMessage = _ref.getLocalizedMessage;
    return React.createElement(
        AutoSizer,
        null,
        function (_ref2) {
            var width = _ref2.width,
                height = _ref2.height;
            return React.createElement(
                Table,
                {
                    width: width,
                    height: height,
                    disableHeader: true,
                    headerHeight: 0,
                    rowHeight: isSmall ? 30 : 50,
                    rowCount: items.length,
                    rowGetter: function rowGetter(_ref3) {
                        var index = _ref3.index;
                        return items[index];
                    },
                    ref: tableRef
                },
                React.createElement(Column, {
                    dataKey: FIELD_NAME,
                    cellRenderer: cellRenderer(getLocalizedMessage, onExpanderClick, onItemClick, isSmall, isLoading),
                    width: 300,
                    flexGrow: 1
                })
            );
        }
    );
};

export default ItemList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkl0ZW1MaXN0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiVGFibGUiLCJDb2x1bW4iLCJBdXRvU2l6ZXIiLCJjZWxsUmVuZGVyZXIiLCJGSUVMRF9OQU1FIiwiSXRlbUxpc3QiLCJpc1NtYWxsIiwiaXNMb2FkaW5nIiwib25JdGVtQ2xpY2siLCJvbkV4cGFuZGVyQ2xpY2siLCJpdGVtcyIsInRhYmxlUmVmIiwiZ2V0TG9jYWxpemVkTWVzc2FnZSIsIndpZHRoIiwiaGVpZ2h0IiwibGVuZ3RoIiwiaW5kZXgiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFNQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsS0FBVCxFQUFnQkMsTUFBaEIsUUFBOEIsaUNBQTlCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixxQ0FBdEI7O0FBRUEsT0FBT0MsWUFBUCxNQUF5QixnQkFBekI7QUFDQSxTQUFTQyxVQUFULFFBQTJCLGlCQUEzQjs7O0FBYUEsSUFBTUMsV0FBVyxTQUFYQSxRQUFXO0FBQUEsUUFDYkMsT0FEYSxRQUNiQSxPQURhO0FBQUEsUUFFYkMsU0FGYSxRQUViQSxTQUZhO0FBQUEsUUFHYkMsV0FIYSxRQUdiQSxXQUhhO0FBQUEsUUFJYkMsZUFKYSxRQUliQSxlQUphO0FBQUEsMEJBS2JDLEtBTGE7QUFBQSxRQUtiQSxLQUxhLDhCQUtMLEVBTEs7QUFBQSxRQU1iQyxRQU5hLFFBTWJBLFFBTmE7QUFBQSxRQU9iQyxtQkFQYSxRQU9iQSxtQkFQYTtBQUFBLFdBU2I7QUFBQyxpQkFBRDtBQUFBO0FBQ0s7QUFBQSxnQkFBR0MsS0FBSCxTQUFHQSxLQUFIO0FBQUEsZ0JBQVVDLE1BQVYsU0FBVUEsTUFBVjtBQUFBLG1CQUNHO0FBQUMscUJBQUQ7QUFBQTtBQUNJLDJCQUFPRCxLQURYO0FBRUksNEJBQVFDLE1BRlo7QUFHSSx1Q0FISjtBQUlJLGtDQUFjLENBSmxCO0FBS0ksK0JBQVdSLFVBQVUsRUFBVixHQUFlLEVBTDlCO0FBTUksOEJBQVVJLE1BQU1LLE1BTnBCO0FBT0ksK0JBQVc7QUFBQSw0QkFBR0MsS0FBSCxTQUFHQSxLQUFIO0FBQUEsK0JBQWVOLE1BQU1NLEtBQU4sQ0FBZjtBQUFBLHFCQVBmO0FBUUkseUJBQUtMO0FBUlQ7QUFVSSxvQ0FBQyxNQUFEO0FBQ0ksNkJBQVNQLFVBRGI7QUFFSSxrQ0FBY0QsYUFBYVMsbUJBQWIsRUFBa0NILGVBQWxDLEVBQW1ERCxXQUFuRCxFQUFnRUYsT0FBaEUsRUFBeUVDLFNBQXpFLENBRmxCO0FBR0ksMkJBQU8sR0FIWDtBQUlJLDhCQUFVO0FBSmQ7QUFWSixhQURIO0FBQUE7QUFETCxLQVRhO0FBQUEsQ0FBakI7O0FBOEJBLGVBQWVGLFFBQWYiLCJmaWxlIjoiSXRlbUxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZsb3dcclxuICogQGZpbGUgSXRlbSBsaXN0IGNvbXBvbmVudFxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFRhYmxlLCBDb2x1bW4gfSBmcm9tICdyZWFjdC12aXJ0dWFsaXplZC9kaXN0L2VzL1RhYmxlJztcclxuaW1wb3J0IEF1dG9TaXplciBmcm9tICdyZWFjdC12aXJ0dWFsaXplZC9kaXN0L2VzL0F1dG9TaXplcic7XHJcbmltcG9ydCAncmVhY3QtdmlydHVhbGl6ZWQvc3R5bGVzLmNzcyc7XHJcbmltcG9ydCBjZWxsUmVuZGVyZXIgZnJvbSAnLi9jZWxsUmVuZGVyZXInO1xyXG5pbXBvcnQgeyBGSUVMRF9OQU1FIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHR5cGUgeyBCb3hJdGVtIH0gZnJvbSAnLi4vLi4vZmxvd1R5cGVzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBvbkl0ZW1DbGljazogRnVuY3Rpb24sXHJcbiAgICBvbkV4cGFuZGVyQ2xpY2s6IEZ1bmN0aW9uLFxyXG4gICAgdGFibGVSZWY6IEZ1bmN0aW9uLFxyXG4gICAgZ2V0TG9jYWxpemVkTWVzc2FnZTogRnVuY3Rpb24sXHJcbiAgICBpdGVtcz86IEJveEl0ZW1bXSxcclxuICAgIGlzU21hbGw6IGJvb2xlYW4sXHJcbiAgICBpc0xvYWRpbmc6IGJvb2xlYW5cclxufTtcclxuXHJcbmNvbnN0IEl0ZW1MaXN0ID0gKHtcclxuICAgIGlzU21hbGwsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBvbkl0ZW1DbGljayxcclxuICAgIG9uRXhwYW5kZXJDbGljayxcclxuICAgIGl0ZW1zID0gW10sXHJcbiAgICB0YWJsZVJlZixcclxuICAgIGdldExvY2FsaXplZE1lc3NhZ2VcclxufTogUHJvcHMpID0+XHJcbiAgICA8QXV0b1NpemVyPlxyXG4gICAgICAgIHsoeyB3aWR0aCwgaGVpZ2h0IH0pID0+XHJcbiAgICAgICAgICAgIDxUYWJsZVxyXG4gICAgICAgICAgICAgICAgd2lkdGg9e3dpZHRofVxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlSGVhZGVyXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJIZWlnaHQ9ezB9XHJcbiAgICAgICAgICAgICAgICByb3dIZWlnaHQ9e2lzU21hbGwgPyAzMCA6IDUwfVxyXG4gICAgICAgICAgICAgICAgcm93Q291bnQ9e2l0ZW1zLmxlbmd0aH1cclxuICAgICAgICAgICAgICAgIHJvd0dldHRlcj17KHsgaW5kZXggfSkgPT4gaXRlbXNbaW5kZXhdfVxyXG4gICAgICAgICAgICAgICAgcmVmPXt0YWJsZVJlZn1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPENvbHVtblxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFLZXk9e0ZJRUxEX05BTUV9XHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFJlbmRlcmVyPXtjZWxsUmVuZGVyZXIoZ2V0TG9jYWxpemVkTWVzc2FnZSwgb25FeHBhbmRlckNsaWNrLCBvbkl0ZW1DbGljaywgaXNTbWFsbCwgaXNMb2FkaW5nKX1cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aD17MzAwfVxyXG4gICAgICAgICAgICAgICAgICAgIGZsZXhHcm93PXsxfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9UYWJsZT59XHJcbiAgICA8L0F1dG9TaXplcj47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJdGVtTGlzdDtcclxuIl19