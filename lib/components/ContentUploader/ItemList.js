/**
 * 
 * @file Item list component
 */

import React from 'react';
import { Table, Column } from 'react-virtualized/dist/es/Table';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';

import nameCellRenderer from './nameCellRenderer';
import progressCellRenderer from './progressCellRenderer';
import actionCellRenderer from './actionCellRenderer';


var ItemList = function ItemList(_ref) {
    var items = _ref.items,
        tableRef = _ref.tableRef,
        onClick = _ref.onClick,
        getLocalizedMessage = _ref.getLocalizedMessage;
    return React.createElement(
        AutoSizer,
        null,
        function (_ref2) {
            var width = _ref2.width,
                height = _ref2.height;

            var nameCell = nameCellRenderer();
            var progressCell = progressCellRenderer();
            var actionCell = actionCellRenderer(onClick, getLocalizedMessage);

            return React.createElement(
                Table,
                {
                    className: 'bcu-item-list',
                    disableHeader: true,
                    headerHeight: 0,
                    height: height,
                    ref: tableRef,
                    rowClassName: 'bcu-item-row',
                    rowCount: items.length,
                    rowGetter: function rowGetter(_ref3) {
                        var index = _ref3.index;
                        return items[index];
                    },
                    rowHeight: 50,
                    width: width
                },
                React.createElement(Column, { cellRenderer: nameCell, dataKey: 'name', flexGrow: 1, flexShrink: 1, width: 300 }),
                React.createElement(Column, { cellRenderer: progressCell, dataKey: 'progress', flexGrow: 1, flexShrink: 1, width: 300 }),
                React.createElement(Column, { cellRenderer: actionCell, dataKey: 'status', flexShrink: 0, width: 25 })
            );
        }
    );
};

export default ItemList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkl0ZW1MaXN0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiVGFibGUiLCJDb2x1bW4iLCJBdXRvU2l6ZXIiLCJuYW1lQ2VsbFJlbmRlcmVyIiwicHJvZ3Jlc3NDZWxsUmVuZGVyZXIiLCJhY3Rpb25DZWxsUmVuZGVyZXIiLCJJdGVtTGlzdCIsIml0ZW1zIiwidGFibGVSZWYiLCJvbkNsaWNrIiwiZ2V0TG9jYWxpemVkTWVzc2FnZSIsIndpZHRoIiwiaGVpZ2h0IiwibmFtZUNlbGwiLCJwcm9ncmVzc0NlbGwiLCJhY3Rpb25DZWxsIiwibGVuZ3RoIiwiaW5kZXgiXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQUtBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxLQUFULEVBQWdCQyxNQUFoQixRQUE4QixpQ0FBOUI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLHFDQUF0Qjs7QUFFQSxPQUFPQyxnQkFBUCxNQUE2QixvQkFBN0I7QUFDQSxPQUFPQyxvQkFBUCxNQUFpQyx3QkFBakM7QUFDQSxPQUFPQyxrQkFBUCxNQUErQixzQkFBL0I7OztBQVdBLElBQU1DLFdBQVcsU0FBWEEsUUFBVztBQUFBLFFBQUdDLEtBQUgsUUFBR0EsS0FBSDtBQUFBLFFBQVVDLFFBQVYsUUFBVUEsUUFBVjtBQUFBLFFBQW9CQyxPQUFwQixRQUFvQkEsT0FBcEI7QUFBQSxRQUE2QkMsbUJBQTdCLFFBQTZCQSxtQkFBN0I7QUFBQSxXQUNiO0FBQUMsaUJBQUQ7QUFBQTtBQUNLLHlCQUF1QjtBQUFBLGdCQUFwQkMsS0FBb0IsU0FBcEJBLEtBQW9CO0FBQUEsZ0JBQWJDLE1BQWEsU0FBYkEsTUFBYTs7QUFDcEIsZ0JBQU1DLFdBQVdWLGtCQUFqQjtBQUNBLGdCQUFNVyxlQUFlVixzQkFBckI7QUFDQSxnQkFBTVcsYUFBYVYsbUJBQW1CSSxPQUFuQixFQUE0QkMsbUJBQTVCLENBQW5COztBQUVBLG1CQUNJO0FBQUMscUJBQUQ7QUFBQTtBQUNJLCtCQUFVLGVBRGQ7QUFFSSx1Q0FGSjtBQUdJLGtDQUFjLENBSGxCO0FBSUksNEJBQVFFLE1BSlo7QUFLSSx5QkFBS0osUUFMVDtBQU1JLGtDQUFhLGNBTmpCO0FBT0ksOEJBQVVELE1BQU1TLE1BUHBCO0FBUUksK0JBQVc7QUFBQSw0QkFBR0MsS0FBSCxTQUFHQSxLQUFIO0FBQUEsK0JBQWVWLE1BQU1VLEtBQU4sQ0FBZjtBQUFBLHFCQVJmO0FBU0ksK0JBQVcsRUFUZjtBQVVJLDJCQUFPTjtBQVZYO0FBWUksb0NBQUMsTUFBRCxJQUFRLGNBQWNFLFFBQXRCLEVBQWdDLFNBQVEsTUFBeEMsRUFBK0MsVUFBVSxDQUF6RCxFQUE0RCxZQUFZLENBQXhFLEVBQTJFLE9BQU8sR0FBbEYsR0FaSjtBQWFJLG9DQUFDLE1BQUQsSUFBUSxjQUFjQyxZQUF0QixFQUFvQyxTQUFRLFVBQTVDLEVBQXVELFVBQVUsQ0FBakUsRUFBb0UsWUFBWSxDQUFoRixFQUFtRixPQUFPLEdBQTFGLEdBYko7QUFjSSxvQ0FBQyxNQUFELElBQVEsY0FBY0MsVUFBdEIsRUFBa0MsU0FBUSxRQUExQyxFQUFtRCxZQUFZLENBQS9ELEVBQWtFLE9BQU8sRUFBekU7QUFkSixhQURKO0FBa0JIO0FBeEJMLEtBRGE7QUFBQSxDQUFqQjs7QUE0QkEsZUFBZVQsUUFBZiIsImZpbGUiOiJJdGVtTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBJdGVtIGxpc3QgY29tcG9uZW50XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgVGFibGUsIENvbHVtbiB9IGZyb20gJ3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvZXMvVGFibGUnO1xyXG5pbXBvcnQgQXV0b1NpemVyIGZyb20gJ3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvZXMvQXV0b1NpemVyJztcclxuaW1wb3J0ICdyZWFjdC12aXJ0dWFsaXplZC9zdHlsZXMuY3NzJztcclxuaW1wb3J0IG5hbWVDZWxsUmVuZGVyZXIgZnJvbSAnLi9uYW1lQ2VsbFJlbmRlcmVyJztcclxuaW1wb3J0IHByb2dyZXNzQ2VsbFJlbmRlcmVyIGZyb20gJy4vcHJvZ3Jlc3NDZWxsUmVuZGVyZXInO1xyXG5pbXBvcnQgYWN0aW9uQ2VsbFJlbmRlcmVyIGZyb20gJy4vYWN0aW9uQ2VsbFJlbmRlcmVyJztcclxuaW1wb3J0IHR5cGUgeyBVcGxvYWRJdGVtIH0gZnJvbSAnLi4vLi4vZmxvd1R5cGVzJztcclxuaW1wb3J0ICcuL0l0ZW1MaXN0LnNjc3MnO1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICAgIGl0ZW1zOiBVcGxvYWRJdGVtW10sXHJcbiAgICB0YWJsZVJlZjogRnVuY3Rpb24sXHJcbiAgICBvbkNsaWNrOiBGdW5jdGlvbixcclxuICAgIGdldExvY2FsaXplZE1lc3NhZ2U6IEZ1bmN0aW9uXHJcbn07XHJcblxyXG5jb25zdCBJdGVtTGlzdCA9ICh7IGl0ZW1zLCB0YWJsZVJlZiwgb25DbGljaywgZ2V0TG9jYWxpemVkTWVzc2FnZSB9OiBQcm9wcykgPT5cclxuICAgIDxBdXRvU2l6ZXI+XHJcbiAgICAgICAgeyh7IHdpZHRoLCBoZWlnaHQgfSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lQ2VsbCA9IG5hbWVDZWxsUmVuZGVyZXIoKTtcclxuICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NDZWxsID0gcHJvZ3Jlc3NDZWxsUmVuZGVyZXIoKTtcclxuICAgICAgICAgICAgY29uc3QgYWN0aW9uQ2VsbCA9IGFjdGlvbkNlbGxSZW5kZXJlcihvbkNsaWNrLCBnZXRMb2NhbGl6ZWRNZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8VGFibGVcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2JjdS1pdGVtLWxpc3QnXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUhlYWRlclxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckhlaWdodD17MH1cclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9e2hlaWdodH1cclxuICAgICAgICAgICAgICAgICAgICByZWY9e3RhYmxlUmVmfVxyXG4gICAgICAgICAgICAgICAgICAgIHJvd0NsYXNzTmFtZT0nYmN1LWl0ZW0tcm93J1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd0NvdW50PXtpdGVtcy5sZW5ndGh9XHJcbiAgICAgICAgICAgICAgICAgICAgcm93R2V0dGVyPXsoeyBpbmRleCB9KSA9PiBpdGVtc1tpbmRleF19XHJcbiAgICAgICAgICAgICAgICAgICAgcm93SGVpZ2h0PXs1MH1cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aD17d2lkdGh9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbHVtbiBjZWxsUmVuZGVyZXI9e25hbWVDZWxsfSBkYXRhS2V5PSduYW1lJyBmbGV4R3Jvdz17MX0gZmxleFNocmluaz17MX0gd2lkdGg9ezMwMH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sdW1uIGNlbGxSZW5kZXJlcj17cHJvZ3Jlc3NDZWxsfSBkYXRhS2V5PSdwcm9ncmVzcycgZmxleEdyb3c9ezF9IGZsZXhTaHJpbms9ezF9IHdpZHRoPXszMDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbHVtbiBjZWxsUmVuZGVyZXI9e2FjdGlvbkNlbGx9IGRhdGFLZXk9J3N0YXR1cycgZmxleFNocmluaz17MH0gd2lkdGg9ezI1fSAvPlxyXG4gICAgICAgICAgICAgICAgPC9UYWJsZT5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9fVxyXG4gICAgPC9BdXRvU2l6ZXI+O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSXRlbUxpc3Q7XHJcbiJdfQ==