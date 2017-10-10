/**
 * 
 * @file Transcript component
 * @author Box
 */

import React from 'react';
import { Table, Column } from 'react-virtualized/dist/es/Table';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized/dist/es/CellMeasurer';

import { formatTime } from '../../util/datetime';


var cache = new CellMeasurerCache({
    minHeight: 10,
    fixedWidth: true
});

var isValidStartTime = function isValidStartTime(cellData) {
    return Array.isArray(cellData) && !!cellData[0] && typeof cellData[0].start === 'number';
};

var Transcript = function Transcript(_ref) {
    var entries = _ref.skill.entries,
        getPreviewer = _ref.getPreviewer;
    return entries.length === 1 && !isValidStartTime(entries[0].appears) ? React.createElement(
        'span',
        { className: 'buik-transcript' },
        entries[0].text
    ) : React.createElement(
        AutoSizer,
        { disableHeight: true },
        function (_ref2) {
            var width = _ref2.width;
            return React.createElement(
                Table,
                {
                    width: width,
                    height: 300,
                    disableHeader: true,
                    headerHeight: 0,
                    rowHeight: cache.rowHeight,
                    rowCount: entries.length,
                    rowGetter: function rowGetter(_ref3) {
                        var index = _ref3.index;
                        return entries[index];
                    },
                    className: 'buik-transcript',
                    deferredMeasurementCache: cache,
                    onRowClick: function onRowClick(_ref4) {
                        var rowData = _ref4.rowData;

                        var viewer = getPreviewer ? getPreviewer() : null;
                        var cellData = rowData.appears;
                        if (isValidStartTime(cellData) && viewer && viewer.isLoaded() && !viewer.isDestroyed() && typeof viewer.play === 'function') {
                            // $FlowFixMe Already checked above
                            var start = cellData[0].start;

                            viewer.play(start);
                        }
                    }
                },
                React.createElement(Column, {
                    dataKey: 'appears',
                    width: 60,
                    flexShrink: 0,
                    className: 'buik-transcript-time-column',
                    cellRenderer: function cellRenderer(_ref5) {
                        var cellData = _ref5.cellData;
                        return isValidStartTime(cellData) ? formatTime(cellData[0].start) : '--';
                    }
                }),
                React.createElement(Column, {
                    dataKey: 'text',
                    width: 230,
                    flexGrow: 1,
                    cellRenderer: function cellRenderer(_ref6) {
                        var dataKey = _ref6.dataKey,
                            parent = _ref6.parent,
                            rowIndex = _ref6.rowIndex,
                            cellData = _ref6.cellData;
                        return React.createElement(
                            CellMeasurer,
                            {
                                cache: cache,
                                columnIndex: 0,
                                key: dataKey,
                                parent: parent,
                                rowIndex: rowIndex
                            },
                            React.createElement(
                                'div',
                                {
                                    className: 'buik-transcript-column',
                                    style: {
                                        whiteSpace: 'normal'
                                    }
                                },
                                (cellData || '').replace(/\r?\n|\r/g, '')
                            )
                        );
                    }
                })
            );
        }
    );
};

export default Transcript;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRyYW5zY3JpcHQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJUYWJsZSIsIkNvbHVtbiIsIkF1dG9TaXplciIsIkNlbGxNZWFzdXJlciIsIkNlbGxNZWFzdXJlckNhY2hlIiwiZm9ybWF0VGltZSIsImNhY2hlIiwibWluSGVpZ2h0IiwiZml4ZWRXaWR0aCIsImlzVmFsaWRTdGFydFRpbWUiLCJjZWxsRGF0YSIsIkFycmF5IiwiaXNBcnJheSIsInN0YXJ0IiwiVHJhbnNjcmlwdCIsImVudHJpZXMiLCJza2lsbCIsImdldFByZXZpZXdlciIsImxlbmd0aCIsImFwcGVhcnMiLCJ0ZXh0Iiwid2lkdGgiLCJyb3dIZWlnaHQiLCJpbmRleCIsInJvd0RhdGEiLCJ2aWV3ZXIiLCJpc0xvYWRlZCIsImlzRGVzdHJveWVkIiwicGxheSIsImRhdGFLZXkiLCJwYXJlbnQiLCJyb3dJbmRleCIsIndoaXRlU3BhY2UiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLFNBQVNDLEtBQVQsRUFBZ0JDLE1BQWhCLFFBQThCLGlDQUE5QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IscUNBQXRCO0FBQ0EsU0FBU0MsWUFBVCxFQUF1QkMsaUJBQXZCLFFBQWdELHdDQUFoRDs7QUFFQSxTQUFTQyxVQUFULFFBQTJCLHFCQUEzQjs7O0FBU0EsSUFBTUMsUUFBUSxJQUFJRixpQkFBSixDQUFzQjtBQUNoQ0csZUFBVyxFQURxQjtBQUVoQ0MsZ0JBQVk7QUFGb0IsQ0FBdEIsQ0FBZDs7QUFLQSxJQUFNQyxtQkFBbUIsU0FBbkJBLGdCQUFtQixDQUFDQyxRQUFEO0FBQUEsV0FDckJDLE1BQU1DLE9BQU4sQ0FBY0YsUUFBZCxLQUEyQixDQUFDLENBQUNBLFNBQVMsQ0FBVCxDQUE3QixJQUE0QyxPQUFPQSxTQUFTLENBQVQsRUFBWUcsS0FBbkIsS0FBNkIsUUFEcEQ7QUFBQSxDQUF6Qjs7QUFHQSxJQUFNQyxhQUFhLFNBQWJBLFVBQWE7QUFBQSxRQUFZQyxPQUFaLFFBQUdDLEtBQUgsQ0FBWUQsT0FBWjtBQUFBLFFBQXVCRSxZQUF2QixRQUF1QkEsWUFBdkI7QUFBQSxXQUNmRixRQUFRRyxNQUFSLEtBQW1CLENBQW5CLElBQXdCLENBQUNULGlCQUFpQk0sUUFBUSxDQUFSLEVBQVdJLE9BQTVCLENBQXpCLEdBQ007QUFBQTtBQUFBLFVBQU0sV0FBVSxpQkFBaEI7QUFDR0osZ0JBQVEsQ0FBUixFQUFXSztBQURkLEtBRE4sR0FJTTtBQUFDLGlCQUFEO0FBQUEsVUFBVyxtQkFBWDtBQUNHO0FBQUEsZ0JBQUdDLEtBQUgsU0FBR0EsS0FBSDtBQUFBLG1CQUNHO0FBQUMscUJBQUQ7QUFBQTtBQUNJLDJCQUFPQSxLQURYO0FBRUksNEJBQVEsR0FGWjtBQUdJLHVDQUhKO0FBSUksa0NBQWMsQ0FKbEI7QUFLSSwrQkFBV2YsTUFBTWdCLFNBTHJCO0FBTUksOEJBQVVQLFFBQVFHLE1BTnRCO0FBT0ksK0JBQVc7QUFBQSw0QkFBR0ssS0FBSCxTQUFHQSxLQUFIO0FBQUEsK0JBQWVSLFFBQVFRLEtBQVIsQ0FBZjtBQUFBLHFCQVBmO0FBUUksK0JBQVUsaUJBUmQ7QUFTSSw4Q0FBMEJqQixLQVQ5QjtBQVVJLGdDQUFZLDJCQUFvRDtBQUFBLDRCQUFqRGtCLE9BQWlELFNBQWpEQSxPQUFpRDs7QUFDNUQsNEJBQU1DLFNBQVNSLGVBQWVBLGNBQWYsR0FBZ0MsSUFBL0M7QUFDQSw0QkFBTVAsV0FBV2MsUUFBUUwsT0FBekI7QUFDQSw0QkFDTVYsaUJBQWlCQyxRQUFqQixLQUNBZSxNQURBLElBRUFBLE9BQU9DLFFBQVAsRUFGQSxJQUdBLENBQUNELE9BQU9FLFdBQVAsRUFIRCxJQUlBLE9BQU9GLE9BQU9HLElBQWQsS0FBdUIsVUFMN0IsRUFNSTtBQUNFO0FBREYsZ0NBRVFmLEtBRlIsR0FFa0JILFNBQVMsQ0FBVCxDQUZsQixDQUVRRyxLQUZSOztBQUdBWSxtQ0FBT0csSUFBUCxDQUFZZixLQUFaO0FBQ0g7QUFDSjtBQXhCTDtBQTBCSSxvQ0FBQyxNQUFEO0FBQ0ksNkJBQVEsU0FEWjtBQUVJLDJCQUFPLEVBRlg7QUFHSSxnQ0FBWSxDQUhoQjtBQUlJLCtCQUFVLDZCQUpkO0FBS0ksa0NBQWM7QUFBQSw0QkFBR0gsUUFBSCxTQUFHQSxRQUFIO0FBQUEsK0JBQ1JELGlCQUFpQkMsUUFBakIsSUFBNkJMLFdBQVdLLFNBQVMsQ0FBVCxFQUFZRyxLQUF2QixDQUE3QixHQUE2RCxJQURyRDtBQUFBO0FBTGxCLGtCQTFCSjtBQWtDSSxvQ0FBQyxNQUFEO0FBQ0ksNkJBQVEsTUFEWjtBQUVJLDJCQUFPLEdBRlg7QUFHSSw4QkFBVSxDQUhkO0FBSUksa0NBQWM7QUFBQSw0QkFBR2dCLE9BQUgsU0FBR0EsT0FBSDtBQUFBLDRCQUFZQyxNQUFaLFNBQVlBLE1BQVo7QUFBQSw0QkFBb0JDLFFBQXBCLFNBQW9CQSxRQUFwQjtBQUFBLDRCQUE4QnJCLFFBQTlCLFNBQThCQSxRQUE5QjtBQUFBLCtCQUNWO0FBQUMsd0NBQUQ7QUFBQTtBQUNJLHVDQUFPSixLQURYO0FBRUksNkNBQWEsQ0FGakI7QUFHSSxxQ0FBS3VCLE9BSFQ7QUFJSSx3Q0FBUUMsTUFKWjtBQUtJLDBDQUFVQztBQUxkO0FBT0k7QUFBQTtBQUFBO0FBQ0ksK0NBQVUsd0JBRGQ7QUFFSSwyQ0FBTztBQUNIQyxvREFBWTtBQURUO0FBRlg7QUFNSyxpQ0FBQ3RCLFlBQVksRUFBYixFQUFpQnVCLE9BQWpCLENBQXlCLFdBQXpCLEVBQXNDLEVBQXRDO0FBTkw7QUFQSix5QkFEVTtBQUFBO0FBSmxCO0FBbENKLGFBREg7QUFBQTtBQURILEtBTFM7QUFBQSxDQUFuQjs7QUFrRUEsZUFBZW5CLFVBQWYiLCJmaWxlIjoiVHJhbnNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBUcmFuc2NyaXB0IGNvbXBvbmVudFxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFRhYmxlLCBDb2x1bW4gfSBmcm9tICdyZWFjdC12aXJ0dWFsaXplZC9kaXN0L2VzL1RhYmxlJztcclxuaW1wb3J0IEF1dG9TaXplciBmcm9tICdyZWFjdC12aXJ0dWFsaXplZC9kaXN0L2VzL0F1dG9TaXplcic7XHJcbmltcG9ydCB7IENlbGxNZWFzdXJlciwgQ2VsbE1lYXN1cmVyQ2FjaGUgfSBmcm9tICdyZWFjdC12aXJ0dWFsaXplZC9kaXN0L2VzL0NlbGxNZWFzdXJlcic7XHJcbmltcG9ydCAncmVhY3QtdmlydHVhbGl6ZWQvc3R5bGVzLmNzcyc7XHJcbmltcG9ydCB7IGZvcm1hdFRpbWUgfSBmcm9tICcuLi8uLi91dGlsL2RhdGV0aW1lJztcclxuaW1wb3J0IHR5cGUgeyBTa2lsbERhdGEsIFRpbWVTbGljZSwgU2tpbGxEYXRhRW50cnkgfSBmcm9tICcuLi8uLi9mbG93VHlwZXMnO1xyXG5pbXBvcnQgJy4vVHJhbnNjcmlwdC5zY3NzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBza2lsbDogU2tpbGxEYXRhLFxyXG4gICAgZ2V0UHJldmlld2VyPzogRnVuY3Rpb25cclxufTtcclxuXHJcbmNvbnN0IGNhY2hlID0gbmV3IENlbGxNZWFzdXJlckNhY2hlKHtcclxuICAgIG1pbkhlaWdodDogMTAsXHJcbiAgICBmaXhlZFdpZHRoOiB0cnVlXHJcbn0pO1xyXG5cclxuY29uc3QgaXNWYWxpZFN0YXJ0VGltZSA9IChjZWxsRGF0YT86IFRpbWVTbGljZVtdKTogYm9vbGVhbiA9PlxyXG4gICAgQXJyYXkuaXNBcnJheShjZWxsRGF0YSkgJiYgISFjZWxsRGF0YVswXSAmJiB0eXBlb2YgY2VsbERhdGFbMF0uc3RhcnQgPT09ICdudW1iZXInO1xyXG5cclxuY29uc3QgVHJhbnNjcmlwdCA9ICh7IHNraWxsOiB7IGVudHJpZXMgfSwgZ2V0UHJldmlld2VyIH06IFByb3BzKSA9PlxyXG4gICAgZW50cmllcy5sZW5ndGggPT09IDEgJiYgIWlzVmFsaWRTdGFydFRpbWUoZW50cmllc1swXS5hcHBlYXJzKVxyXG4gICAgICAgID8gPHNwYW4gY2xhc3NOYW1lPSdidWlrLXRyYW5zY3JpcHQnPlxyXG4gICAgICAgICAgICB7ZW50cmllc1swXS50ZXh0fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA6IDxBdXRvU2l6ZXIgZGlzYWJsZUhlaWdodD5cclxuICAgICAgICAgICAgeyh7IHdpZHRoIH0pID0+XHJcbiAgICAgICAgICAgICAgICA8VGFibGVcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aD17d2lkdGh9XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXszMDB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUhlYWRlclxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckhlaWdodD17MH1cclxuICAgICAgICAgICAgICAgICAgICByb3dIZWlnaHQ9e2NhY2hlLnJvd0hlaWdodH1cclxuICAgICAgICAgICAgICAgICAgICByb3dDb3VudD17ZW50cmllcy5sZW5ndGh9XHJcbiAgICAgICAgICAgICAgICAgICAgcm93R2V0dGVyPXsoeyBpbmRleCB9KSA9PiBlbnRyaWVzW2luZGV4XX1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2J1aWstdHJhbnNjcmlwdCdcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZE1lYXN1cmVtZW50Q2FjaGU9e2NhY2hlfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uUm93Q2xpY2s9eyh7IHJvd0RhdGEgfTogeyByb3dEYXRhOiBTa2lsbERhdGFFbnRyeSB9KTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZpZXdlciA9IGdldFByZXZpZXdlciA/IGdldFByZXZpZXdlcigpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbERhdGEgPSByb3dEYXRhLmFwcGVhcnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZFN0YXJ0VGltZShjZWxsRGF0YSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld2VyICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdlci5pc0xvYWRlZCgpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICF2aWV3ZXIuaXNEZXN0cm95ZWQoKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygdmlld2VyLnBsYXkgPT09ICdmdW5jdGlvbidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gJEZsb3dGaXhNZSBBbHJlYWR5IGNoZWNrZWQgYWJvdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnQgfSA9IGNlbGxEYXRhWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld2VyLnBsYXkoc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2x1bW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUtleT0nYXBwZWFycydcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezYwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4U2hyaW5rPXswfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2J1aWstdHJhbnNjcmlwdC10aW1lLWNvbHVtbidcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFJlbmRlcmVyPXsoeyBjZWxsRGF0YSB9KTogc3RyaW5nID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWRTdGFydFRpbWUoY2VsbERhdGEpID8gZm9ybWF0VGltZShjZWxsRGF0YVswXS5zdGFydCkgOiAnLS0nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sdW1uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFLZXk9J3RleHQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXsyMzB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhHcm93PXsxfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsUmVuZGVyZXI9eyh7IGRhdGFLZXksIHBhcmVudCwgcm93SW5kZXgsIGNlbGxEYXRhIH0pID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2VsbE1lYXN1cmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGU9e2NhY2hlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkluZGV4PXswfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZGF0YUtleX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ9e3BhcmVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dJbmRleD17cm93SW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nYnVpay10cmFuc2NyaXB0LWNvbHVtbidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3JtYWwnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoY2VsbERhdGEgfHwgJycpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csICcnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ2VsbE1lYXN1cmVyPn1cclxuICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L1RhYmxlPn1cclxuICAgICAgICA8L0F1dG9TaXplcj47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUcmFuc2NyaXB0O1xyXG4iXX0=