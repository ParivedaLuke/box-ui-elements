/**
 * 
 * @file Item list component
 * @author Box
 */

import React from 'react';
import classNames from 'classnames';
import { Table, Column } from 'react-virtualized/dist/es/Table';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';

import KeyBinder from '../KeyBinder';
import shareAccessCellRenderer from './shareAccessCellRenderer';
import checkboxCellRenderer from './checkboxCellRenderer';
import nameCellRenderer from '../Item/nameCellRenderer';
import iconCellRenderer from '../Item/iconCellRenderer';
import isRowSelectable from './cellRendererHelper';
import { isFocusableElement, focus } from '../../util/dom';
import { VIEW_SELECTED, FIELD_NAME, FIELD_ID, FIELD_SHARED_LINK, TYPE_FOLDER } from '../../constants';


var ItemList = function ItemList(_ref) {
    var view = _ref.view,
        rootId = _ref.rootId,
        isSmall = _ref.isSmall,
        rootElement = _ref.rootElement,
        focusedRow = _ref.focusedRow,
        selectableType = _ref.selectableType,
        canSetShareAccess = _ref.canSetShareAccess,
        hasHitSelectionLimit = _ref.hasHitSelectionLimit,
        extensionsWhitelist = _ref.extensionsWhitelist,
        onItemSelect = _ref.onItemSelect,
        onItemClick = _ref.onItemClick,
        onShareAccessChange = _ref.onShareAccessChange,
        onFocusChange = _ref.onFocusChange,
        currentCollection = _ref.currentCollection,
        tableRef = _ref.tableRef,
        getLocalizedMessage = _ref.getLocalizedMessage;

    var iconCell = iconCellRenderer();
    var nameCell = nameCellRenderer(rootId, getLocalizedMessage, view, onItemClick);
    var checkboxCell = checkboxCellRenderer(onItemSelect, selectableType, extensionsWhitelist, hasHitSelectionLimit);
    var shareAccessCell = shareAccessCellRenderer(onShareAccessChange, canSetShareAccess, selectableType, extensionsWhitelist, hasHitSelectionLimit, getLocalizedMessage);
    var id = currentCollection.id,
        _currentCollection$it = currentCollection.items,
        items = _currentCollection$it === undefined ? [] : _currentCollection$it;

    var rowCount = items.length;

    var rowClassName = function rowClassName(_ref2) {
        var index = _ref2.index;

        if (index === -1) {
            return '';
        }
        var _items$index = items[index],
            selected = _items$index.selected,
            type = _items$index.type;

        var isSelectable = isRowSelectable(selectableType, extensionsWhitelist, hasHitSelectionLimit, items[index]);
        return classNames('bcp-item-row bcp-item-row-' + index, {
            'bcp-item-row-selected': selected && view !== VIEW_SELECTED,
            'bcp-item-row-unselectable': type !== TYPE_FOLDER && !isSelectable // folder row should never dim
        });
    };

    var onRowClick = function onRowClick(_ref3) {
        var event = _ref3.event,
            rowData = _ref3.rowData,
            index = _ref3.index;

        // If the click is happening on a clickable element on the item row, ignore row selection
        if (isRowSelectable(selectableType, extensionsWhitelist, hasHitSelectionLimit, rowData) && !isFocusableElement(event.target)) {
            onItemSelect(rowData);
        } else {
            onFocusChange(index);
        }
    };

    return React.createElement(
        KeyBinder,
        {
            columnCount: 1,
            rowCount: rowCount,
            className: 'bcp-item-grid',
            id: id,
            items: items,
            onSelect: onItemSelect,
            onOpen: onItemClick,
            scrollToRow: focusedRow,
            onScrollToChange: function onScrollToChange(_ref4) {
                var scrollToRow = _ref4.scrollToRow;
                return focus(rootElement, '.bcp-item-row-' + scrollToRow);
            }
        },
        function (_ref5) {
            var onSectionRendered = _ref5.onSectionRendered,
                scrollToRow = _ref5.scrollToRow,
                focusOnRender = _ref5.focusOnRender;
            return React.createElement(
                AutoSizer,
                null,
                function (_ref6) {
                    var width = _ref6.width,
                        height = _ref6.height;
                    return React.createElement(
                        Table,
                        {
                            width: width,
                            height: height,
                            disableHeader: true,
                            headerHeight: 0,
                            rowHeight: 50,
                            rowCount: rowCount,
                            rowGetter: function rowGetter(_ref7) {
                                var index = _ref7.index;
                                return items[index];
                            },
                            ref: tableRef,
                            rowClassName: rowClassName,
                            onRowClick: onRowClick,
                            scrollToIndex: scrollToRow,
                            onRowsRendered: function onRowsRendered(_ref8) {
                                var startIndex = _ref8.startIndex,
                                    stopIndex = _ref8.stopIndex;

                                onSectionRendered({ rowStartIndex: startIndex, rowStopIndex: stopIndex });
                                if (focusOnRender) {
                                    focus(rootElement, '.bcp-item-row-' + scrollToRow);
                                }
                            }
                        },
                        React.createElement(Column, {
                            dataKey: FIELD_ID,
                            cellRenderer: iconCell,
                            width: isSmall ? 30 : 50,
                            flexShrink: 0
                        }),
                        React.createElement(Column, { dataKey: FIELD_NAME, cellRenderer: nameCell, width: 300, flexGrow: 1 }),
                        isSmall ? null : React.createElement(Column, {
                            dataKey: FIELD_SHARED_LINK,
                            cellRenderer: shareAccessCell,
                            width: 220,
                            flexShrink: 0
                        }),
                        React.createElement(Column, {
                            dataKey: FIELD_ID,
                            cellRenderer: checkboxCell,
                            width: isSmall ? 20 : 30,
                            flexShrink: 0
                        })
                    );
                }
            );
        }
    );
};

export default ItemList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkl0ZW1MaXN0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiY2xhc3NOYW1lcyIsIlRhYmxlIiwiQ29sdW1uIiwiQXV0b1NpemVyIiwiS2V5QmluZGVyIiwic2hhcmVBY2Nlc3NDZWxsUmVuZGVyZXIiLCJjaGVja2JveENlbGxSZW5kZXJlciIsIm5hbWVDZWxsUmVuZGVyZXIiLCJpY29uQ2VsbFJlbmRlcmVyIiwiaXNSb3dTZWxlY3RhYmxlIiwiaXNGb2N1c2FibGVFbGVtZW50IiwiZm9jdXMiLCJWSUVXX1NFTEVDVEVEIiwiRklFTERfTkFNRSIsIkZJRUxEX0lEIiwiRklFTERfU0hBUkVEX0xJTksiLCJUWVBFX0ZPTERFUiIsIkl0ZW1MaXN0IiwidmlldyIsInJvb3RJZCIsImlzU21hbGwiLCJyb290RWxlbWVudCIsImZvY3VzZWRSb3ciLCJzZWxlY3RhYmxlVHlwZSIsImNhblNldFNoYXJlQWNjZXNzIiwiaGFzSGl0U2VsZWN0aW9uTGltaXQiLCJleHRlbnNpb25zV2hpdGVsaXN0Iiwib25JdGVtU2VsZWN0Iiwib25JdGVtQ2xpY2siLCJvblNoYXJlQWNjZXNzQ2hhbmdlIiwib25Gb2N1c0NoYW5nZSIsImN1cnJlbnRDb2xsZWN0aW9uIiwidGFibGVSZWYiLCJnZXRMb2NhbGl6ZWRNZXNzYWdlIiwiaWNvbkNlbGwiLCJuYW1lQ2VsbCIsImNoZWNrYm94Q2VsbCIsInNoYXJlQWNjZXNzQ2VsbCIsImlkIiwiaXRlbXMiLCJyb3dDb3VudCIsImxlbmd0aCIsInJvd0NsYXNzTmFtZSIsImluZGV4Iiwic2VsZWN0ZWQiLCJ0eXBlIiwiaXNTZWxlY3RhYmxlIiwib25Sb3dDbGljayIsImV2ZW50Iiwicm93RGF0YSIsInRhcmdldCIsInNjcm9sbFRvUm93Iiwib25TZWN0aW9uUmVuZGVyZWQiLCJmb2N1c09uUmVuZGVyIiwid2lkdGgiLCJoZWlnaHQiLCJzdGFydEluZGV4Iiwic3RvcEluZGV4Iiwicm93U3RhcnRJbmRleCIsInJvd1N0b3BJbmRleCJdLCJtYXBwaW5n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SDtBQUFBLHVDQUFlSixNQUFNSSxLQUFOLENBQWY7QUFBQSw2QkFQZjtBQVFJLGlDQUFLWCxRQVJUO0FBU0ksMENBQWNVLFlBVGxCO0FBVUksd0NBQVlLLFVBVmhCO0FBV0ksMkNBQWVJLFdBWG5CO0FBWUksNENBQWdCLCtCQUErQjtBQUFBLG9DQUE1QkssVUFBNEIsU0FBNUJBLFVBQTRCO0FBQUEsb0NBQWhCQyxTQUFnQixTQUFoQkEsU0FBZ0I7O0FBQzNDTCxrREFBa0IsRUFBRU0sZUFBZUYsVUFBakIsRUFBNkJHLGNBQWNGLFNBQTNDLEVBQWxCO0FBQ0Esb0NBQUlKLGFBQUosRUFBbUI7QUFDZjFDLDBDQUFNVSxXQUFOLHFCQUFvQzhCLFdBQXBDO0FBQ0g7QUFDSjtBQWpCTDtBQW1CSSw0Q0FBQyxNQUFEO0FBQ0kscUNBQVNyQyxRQURiO0FBRUksMENBQWNvQixRQUZsQjtBQUdJLG1DQUFPZCxVQUFVLEVBQVYsR0FBZSxFQUgxQjtBQUlJLHdDQUFZO0FBSmhCLDBCQW5CSjtBQXlCSSw0Q0FBQyxNQUFELElBQVEsU0FBU1AsVUFBakIsRUFBNkIsY0FBY3NCLFFBQTNDLEVBQXFELE9BQU8sR0FBNUQsRUFBaUUsVUFBVSxDQUEzRSxHQXpCSjtBQTBCS2Ysa0NBQ0ssSUFETCxHQUVLLG9CQUFDLE1BQUQ7QUFDRSxxQ0FBU0wsaUJBRFg7QUFFRSwwQ0FBY3NCLGVBRmhCO0FBR0UsbUNBQU8sR0FIVDtBQUlFLHdDQUFZO0FBSmQsMEJBNUJWO0FBa0NJLDRDQUFDLE1BQUQ7QUFDSSxxQ0FBU3ZCLFFBRGI7QUFFSSwwQ0FBY3NCLFlBRmxCO0FBR0ksbUNBQU9oQixVQUFVLEVBQVYsR0FBZSxFQUgxQjtBQUlJLHdDQUFZO0FBSmhCO0FBbENKLHFCQURIO0FBQUE7QUFETCxhQURIO0FBQUE7QUFYTCxLQURKO0FBMkRILENBM0hEOztBQTZIQSxlQUFlSCxRQUFmIiwiZmlsZSI6Ikl0ZW1MaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEl0ZW0gbGlzdCBjb21wb25lbnRcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IHsgVGFibGUsIENvbHVtbiB9IGZyb20gJ3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvZXMvVGFibGUnO1xyXG5pbXBvcnQgQXV0b1NpemVyIGZyb20gJ3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvZXMvQXV0b1NpemVyJztcclxuaW1wb3J0ICdyZWFjdC12aXJ0dWFsaXplZC9zdHlsZXMuY3NzJztcclxuaW1wb3J0IEtleUJpbmRlciBmcm9tICcuLi9LZXlCaW5kZXInO1xyXG5pbXBvcnQgc2hhcmVBY2Nlc3NDZWxsUmVuZGVyZXIgZnJvbSAnLi9zaGFyZUFjY2Vzc0NlbGxSZW5kZXJlcic7XHJcbmltcG9ydCBjaGVja2JveENlbGxSZW5kZXJlciBmcm9tICcuL2NoZWNrYm94Q2VsbFJlbmRlcmVyJztcclxuaW1wb3J0IG5hbWVDZWxsUmVuZGVyZXIgZnJvbSAnLi4vSXRlbS9uYW1lQ2VsbFJlbmRlcmVyJztcclxuaW1wb3J0IGljb25DZWxsUmVuZGVyZXIgZnJvbSAnLi4vSXRlbS9pY29uQ2VsbFJlbmRlcmVyJztcclxuaW1wb3J0IGlzUm93U2VsZWN0YWJsZSBmcm9tICcuL2NlbGxSZW5kZXJlckhlbHBlcic7XHJcbmltcG9ydCB7IGlzRm9jdXNhYmxlRWxlbWVudCwgZm9jdXMgfSBmcm9tICcuLi8uLi91dGlsL2RvbSc7XHJcbmltcG9ydCB7IFZJRVdfU0VMRUNURUQsIEZJRUxEX05BTUUsIEZJRUxEX0lELCBGSUVMRF9TSEFSRURfTElOSywgVFlQRV9GT0xERVIgfSBmcm9tICcuLi8uLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgdHlwZSB7IFZpZXcsIEJveEl0ZW0sIENvbGxlY3Rpb24gfSBmcm9tICcuLi8uLi9mbG93VHlwZXMnO1xyXG5pbXBvcnQgJy4vSXRlbUxpc3Quc2Nzcyc7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgcm9vdElkOiBzdHJpbmcsXHJcbiAgICByb290RWxlbWVudDogSFRNTEVsZW1lbnQsXHJcbiAgICBmb2N1c2VkUm93OiBudW1iZXIsXHJcbiAgICBvbkl0ZW1TZWxlY3Q6IEZ1bmN0aW9uLFxyXG4gICAgb25JdGVtQ2xpY2s6IEZ1bmN0aW9uLFxyXG4gICAgY2FuU2V0U2hhcmVBY2Nlc3M6IGJvb2xlYW4sXHJcbiAgICB0YWJsZVJlZjogRnVuY3Rpb24sXHJcbiAgICBzZWxlY3RhYmxlVHlwZTogc3RyaW5nLFxyXG4gICAgaGFzSGl0U2VsZWN0aW9uTGltaXQ6IGJvb2xlYW4sXHJcbiAgICBvblNoYXJlQWNjZXNzQ2hhbmdlOiBGdW5jdGlvbixcclxuICAgIG9uRm9jdXNDaGFuZ2U6IEZ1bmN0aW9uLFxyXG4gICAgZXh0ZW5zaW9uc1doaXRlbGlzdDogc3RyaW5nW10sXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlOiBGdW5jdGlvbixcclxuICAgIGN1cnJlbnRDb2xsZWN0aW9uOiBDb2xsZWN0aW9uLFxyXG4gICAgaXNTbWFsbDogYm9vbGVhbixcclxuICAgIHZpZXc6IFZpZXdcclxufTtcclxuXHJcbmNvbnN0IEl0ZW1MaXN0ID0gKHtcclxuICAgIHZpZXcsXHJcbiAgICByb290SWQsXHJcbiAgICBpc1NtYWxsLFxyXG4gICAgcm9vdEVsZW1lbnQsXHJcbiAgICBmb2N1c2VkUm93LFxyXG4gICAgc2VsZWN0YWJsZVR5cGUsXHJcbiAgICBjYW5TZXRTaGFyZUFjY2VzcyxcclxuICAgIGhhc0hpdFNlbGVjdGlvbkxpbWl0LFxyXG4gICAgZXh0ZW5zaW9uc1doaXRlbGlzdCxcclxuICAgIG9uSXRlbVNlbGVjdCxcclxuICAgIG9uSXRlbUNsaWNrLFxyXG4gICAgb25TaGFyZUFjY2Vzc0NoYW5nZSxcclxuICAgIG9uRm9jdXNDaGFuZ2UsXHJcbiAgICBjdXJyZW50Q29sbGVjdGlvbixcclxuICAgIHRhYmxlUmVmLFxyXG4gICAgZ2V0TG9jYWxpemVkTWVzc2FnZVxyXG59OiBQcm9wcykgPT4ge1xyXG4gICAgY29uc3QgaWNvbkNlbGwgPSBpY29uQ2VsbFJlbmRlcmVyKCk7XHJcbiAgICBjb25zdCBuYW1lQ2VsbCA9IG5hbWVDZWxsUmVuZGVyZXIocm9vdElkLCBnZXRMb2NhbGl6ZWRNZXNzYWdlLCB2aWV3LCBvbkl0ZW1DbGljayk7XHJcbiAgICBjb25zdCBjaGVja2JveENlbGwgPSBjaGVja2JveENlbGxSZW5kZXJlcihvbkl0ZW1TZWxlY3QsIHNlbGVjdGFibGVUeXBlLCBleHRlbnNpb25zV2hpdGVsaXN0LCBoYXNIaXRTZWxlY3Rpb25MaW1pdCk7XHJcbiAgICBjb25zdCBzaGFyZUFjY2Vzc0NlbGwgPSBzaGFyZUFjY2Vzc0NlbGxSZW5kZXJlcihcclxuICAgICAgICBvblNoYXJlQWNjZXNzQ2hhbmdlLFxyXG4gICAgICAgIGNhblNldFNoYXJlQWNjZXNzLFxyXG4gICAgICAgIHNlbGVjdGFibGVUeXBlLFxyXG4gICAgICAgIGV4dGVuc2lvbnNXaGl0ZWxpc3QsXHJcbiAgICAgICAgaGFzSGl0U2VsZWN0aW9uTGltaXQsXHJcbiAgICAgICAgZ2V0TG9jYWxpemVkTWVzc2FnZVxyXG4gICAgKTtcclxuICAgIGNvbnN0IHsgaWQsIGl0ZW1zID0gW10gfTogQ29sbGVjdGlvbiA9IGN1cnJlbnRDb2xsZWN0aW9uO1xyXG4gICAgY29uc3Qgcm93Q291bnQ6IG51bWJlciA9IGl0ZW1zLmxlbmd0aDtcclxuXHJcbiAgICBjb25zdCByb3dDbGFzc05hbWUgPSAoeyBpbmRleCB9KSA9PiB7XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHsgc2VsZWN0ZWQsIHR5cGUgfSA9IGl0ZW1zW2luZGV4XTtcclxuICAgICAgICBjb25zdCBpc1NlbGVjdGFibGUgPSBpc1Jvd1NlbGVjdGFibGUoc2VsZWN0YWJsZVR5cGUsIGV4dGVuc2lvbnNXaGl0ZWxpc3QsIGhhc0hpdFNlbGVjdGlvbkxpbWl0LCBpdGVtc1tpbmRleF0pO1xyXG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzKGBiY3AtaXRlbS1yb3cgYmNwLWl0ZW0tcm93LSR7aW5kZXh9YCwge1xyXG4gICAgICAgICAgICAnYmNwLWl0ZW0tcm93LXNlbGVjdGVkJzogc2VsZWN0ZWQgJiYgdmlldyAhPT0gVklFV19TRUxFQ1RFRCxcclxuICAgICAgICAgICAgJ2JjcC1pdGVtLXJvdy11bnNlbGVjdGFibGUnOiB0eXBlICE9PSBUWVBFX0ZPTERFUiAmJiAhaXNTZWxlY3RhYmxlIC8vIGZvbGRlciByb3cgc2hvdWxkIG5ldmVyIGRpbVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvblJvd0NsaWNrID0gKHtcclxuICAgICAgICBldmVudCxcclxuICAgICAgICByb3dEYXRhLFxyXG4gICAgICAgIGluZGV4XHJcbiAgICB9OiB7XHJcbiAgICAgICAgZXZlbnQ6IEV2ZW50ICYgeyB0YXJnZXQ6IEhUTUxFbGVtZW50IH0sXHJcbiAgICAgICAgcm93RGF0YTogQm94SXRlbSxcclxuICAgICAgICBpbmRleDogbnVtYmVyXHJcbiAgICB9KSA9PiB7XHJcbiAgICAgICAgLy8gSWYgdGhlIGNsaWNrIGlzIGhhcHBlbmluZyBvbiBhIGNsaWNrYWJsZSBlbGVtZW50IG9uIHRoZSBpdGVtIHJvdywgaWdub3JlIHJvdyBzZWxlY3Rpb25cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGlzUm93U2VsZWN0YWJsZShzZWxlY3RhYmxlVHlwZSwgZXh0ZW5zaW9uc1doaXRlbGlzdCwgaGFzSGl0U2VsZWN0aW9uTGltaXQsIHJvd0RhdGEpICYmXHJcbiAgICAgICAgICAgICFpc0ZvY3VzYWJsZUVsZW1lbnQoZXZlbnQudGFyZ2V0KVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBvbkl0ZW1TZWxlY3Qocm93RGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb25Gb2N1c0NoYW5nZShpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxLZXlCaW5kZXJcclxuICAgICAgICAgICAgY29sdW1uQ291bnQ9ezF9XHJcbiAgICAgICAgICAgIHJvd0NvdW50PXtyb3dDb3VudH1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPSdiY3AtaXRlbS1ncmlkJ1xyXG4gICAgICAgICAgICBpZD17aWR9XHJcbiAgICAgICAgICAgIGl0ZW1zPXtpdGVtc31cclxuICAgICAgICAgICAgb25TZWxlY3Q9e29uSXRlbVNlbGVjdH1cclxuICAgICAgICAgICAgb25PcGVuPXtvbkl0ZW1DbGlja31cclxuICAgICAgICAgICAgc2Nyb2xsVG9Sb3c9e2ZvY3VzZWRSb3d9XHJcbiAgICAgICAgICAgIG9uU2Nyb2xsVG9DaGFuZ2U9eyh7IHNjcm9sbFRvUm93IH0pID0+IGZvY3VzKHJvb3RFbGVtZW50LCBgLmJjcC1pdGVtLXJvdy0ke3Njcm9sbFRvUm93fWApfVxyXG4gICAgICAgID5cclxuICAgICAgICAgICAgeyh7IG9uU2VjdGlvblJlbmRlcmVkLCBzY3JvbGxUb1JvdywgZm9jdXNPblJlbmRlciB9KSA9PlxyXG4gICAgICAgICAgICAgICAgPEF1dG9TaXplcj5cclxuICAgICAgICAgICAgICAgICAgICB7KHsgd2lkdGgsIGhlaWdodCB9KSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VGFibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXt3aWR0aH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUhlYWRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVySGVpZ2h0PXswfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93SGVpZ2h0PXs1MH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0NvdW50PXtyb3dDb3VudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0dldHRlcj17KHsgaW5kZXggfSkgPT4gaXRlbXNbaW5kZXhdfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXt0YWJsZVJlZn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0NsYXNzTmFtZT17cm93Q2xhc3NOYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Sb3dDbGljaz17b25Sb3dDbGlja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvSW5kZXg9e3Njcm9sbFRvUm93fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Sb3dzUmVuZGVyZWQ9eyh7IHN0YXJ0SW5kZXgsIHN0b3BJbmRleCB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWN0aW9uUmVuZGVyZWQoeyByb3dTdGFydEluZGV4OiBzdGFydEluZGV4LCByb3dTdG9wSW5kZXg6IHN0b3BJbmRleCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNPblJlbmRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1cyhyb290RWxlbWVudCwgYC5iY3AtaXRlbS1yb3ctJHtzY3JvbGxUb1Jvd31gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29sdW1uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUtleT17RklFTERfSUR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFJlbmRlcmVyPXtpY29uQ2VsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17aXNTbWFsbCA/IDMwIDogNTB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleFNocmluaz17MH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29sdW1uIGRhdGFLZXk9e0ZJRUxEX05BTUV9IGNlbGxSZW5kZXJlcj17bmFtZUNlbGx9IHdpZHRoPXszMDB9IGZsZXhHcm93PXsxfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzU21hbGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDxDb2x1bW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUtleT17RklFTERfU0hBUkVEX0xJTkt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxSZW5kZXJlcj17c2hhcmVBY2Nlc3NDZWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17MjIwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4U2hyaW5rPXswfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29sdW1uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUtleT17RklFTERfSUR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFJlbmRlcmVyPXtjaGVja2JveENlbGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9e2lzU21hbGwgPyAyMCA6IDMwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhTaHJpbms9ezB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1RhYmxlPn1cclxuICAgICAgICAgICAgICAgIDwvQXV0b1NpemVyPn1cclxuICAgICAgICA8L0tleUJpbmRlcj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJdGVtTGlzdDtcclxuIl19