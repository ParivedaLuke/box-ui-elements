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
import headerCellRenderer from './headerCellRenderer';
import sizeCellRenderer from './sizeCellRenderer';
import dateCellRenderer from './dateCellRenderer';
import nameCellRenderer from '../Item/nameCellRenderer';
import iconCellRenderer from '../Item/iconCellRenderer';
import moreOptionsCellRenderer from './moreOptionsCellRenderer';
import { focus } from '../../util/dom';
import { FIELD_NAME, FIELD_ID, FIELD_MODIFIED_AT, FIELD_INTERACTED_AT, FIELD_SIZE, VIEW_RECENTS } from '../../constants';


var ItemList = function ItemList(_ref) {
    var view = _ref.view,
        isSmall = _ref.isSmall,
        isTouch = _ref.isTouch,
        rootId = _ref.rootId,
        rootElement = _ref.rootElement,
        canShare = _ref.canShare,
        canDownload = _ref.canDownload,
        canDelete = _ref.canDelete,
        canPreview = _ref.canPreview,
        canRename = _ref.canRename,
        onItemClick = _ref.onItemClick,
        onItemSelect = _ref.onItemSelect,
        onItemDelete = _ref.onItemDelete,
        onItemDownload = _ref.onItemDownload,
        onItemRename = _ref.onItemRename,
        onItemShare = _ref.onItemShare,
        onItemPreview = _ref.onItemPreview,
        onSortChange = _ref.onSortChange,
        currentCollection = _ref.currentCollection,
        tableRef = _ref.tableRef,
        focusedRow = _ref.focusedRow,
        getLocalizedMessage = _ref.getLocalizedMessage;

    var nameCell = nameCellRenderer(rootId, getLocalizedMessage, view, onItemClick, onItemSelect, canPreview, isSmall, // shows details if false
    isTouch);
    var iconCell = iconCellRenderer();
    var dateCell = dateCellRenderer(getLocalizedMessage);
    var sizeAccessCell = sizeCellRenderer();
    var moreOptionsCell = moreOptionsCellRenderer(getLocalizedMessage, canPreview, canShare, canDownload, canDelete, canRename, onItemSelect, onItemDelete, onItemDownload, onItemRename, onItemShare, onItemPreview, isSmall);
    var isRecents = view === VIEW_RECENTS;
    var id = currentCollection.id,
        _currentCollection$it = currentCollection.items,
        items = _currentCollection$it === undefined ? [] : _currentCollection$it,
        sortBy = currentCollection.sortBy,
        sortDirection = currentCollection.sortDirection;

    var rowCount = items.length;
    var rowClassName = function rowClassName(_ref2) {
        var index = _ref2.index;

        if (index === -1) {
            return 'bce-item-header-row';
        }
        var selected = items[index].selected;

        return classNames('bce-item-row bce-item-row-' + index, {
            'bce-item-row-selected': selected
        });
    };
    var sort = function sort(_ref3) {
        var by = _ref3.sortBy,
            direction = _ref3.sortDirection;

        onSortChange(by, direction);
    };

    return React.createElement(
        KeyBinder,
        {
            id: id,
            items: items,
            columnCount: 1,
            rowCount: rowCount,
            className: 'bce-item-grid',
            onRename: onItemRename,
            onShare: onItemShare,
            onDownload: onItemDownload,
            onOpen: onItemClick,
            onSelect: onItemSelect,
            onDelete: onItemDelete,
            scrollToRow: focusedRow,
            onScrollToChange: function onScrollToChange(_ref4) {
                var scrollToRow = _ref4.scrollToRow;
                return focus(rootElement, '.bce-item-row-' + scrollToRow);
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
                            headerHeight: isSmall ? 0 : 40,
                            rowHeight: 50,
                            rowCount: rowCount,
                            rowGetter: function rowGetter(_ref7) {
                                var index = _ref7.index;
                                return items[index];
                            },
                            ref: tableRef,
                            sort: sort,
                            sortBy: sortBy,
                            sortDirection: sortDirection,
                            rowClassName: rowClassName,
                            onRowClick: function onRowClick(_ref8) {
                                var rowData = _ref8.rowData;
                                return onItemSelect(rowData);
                            },
                            scrollToIndex: scrollToRow,
                            onRowsRendered: function onRowsRendered(_ref9) {
                                var startIndex = _ref9.startIndex,
                                    stopIndex = _ref9.stopIndex;

                                onSectionRendered({ rowStartIndex: startIndex, rowStopIndex: stopIndex });
                                if (focusOnRender) {
                                    focus(rootElement, '.bce-item-row-' + scrollToRow);
                                }
                            }
                        },
                        React.createElement(Column, {
                            disableSort: true,
                            dataKey: FIELD_ID,
                            cellRenderer: iconCell,
                            width: isSmall ? 30 : 50,
                            flexShrink: 0
                        }),
                        React.createElement(Column, {
                            label: getLocalizedMessage('buik.item.name'),
                            dataKey: FIELD_NAME,
                            cellRenderer: nameCell,
                            headerRenderer: headerCellRenderer,
                            width: 300,
                            flexGrow: 1
                        }),
                        isSmall ? null : React.createElement(Column, {
                            className: 'bce-item-coloumn',
                            label: isRecents ? getLocalizedMessage('buik.item.interacted') : getLocalizedMessage('buik.item.modified'),
                            dataKey: isRecents ? FIELD_INTERACTED_AT : FIELD_MODIFIED_AT,
                            cellRenderer: dateCell,
                            headerRenderer: headerCellRenderer,
                            width: 120,
                            flexShrink: 0
                        }),
                        isSmall ? null : React.createElement(Column, {
                            className: 'bce-item-coloumn',
                            label: getLocalizedMessage('buik.item.size'),
                            dataKey: FIELD_SIZE,
                            cellRenderer: sizeAccessCell,
                            headerRenderer: headerCellRenderer,
                            width: 80,
                            flexShrink: 0
                        }),
                        React.createElement(Column, {
                            disableSort: true,
                            dataKey: FIELD_ID,
                            cellRenderer: moreOptionsCell,
                            width: isSmall || !canShare ? 58 : 140,
                            flexShrink: 0
                        })
                    );
                }
            );
        }
    );
};

export default ItemList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkl0ZW1MaXN0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiY2xhc3NOYW1lcyIsIlRhYmxlIiwiQ29sdW1uIiwiQXV0b1NpemVyIiwiS2V5QmluZGVyIiwiaGVhZGVyQ2VsbFJlbmRlcmVyIiwic2l6ZUNlbGxSZW5kZXJlciIsImRhdGVDZWxsUmVuZGVyZXIiLCJuYW1lQ2VsbFJlbmRlcmVyIiwiaWNvbkNlbGxSZW5kZXJlciIsIm1vcmVPcHRpb25zQ2VsbFJlbmRlcmVyIiwiZm9jdXMiLCJGSUVMRF9OQU1FIiwiRklFTERfSUQiLCJGSUVMRF9NT0RJRklFRF9BVCIsIkZJRUxEX0lOVEVSQUNURURfQVQiLCJGSUVMRF9TSVpFIiwiVklFV19SRUNFTlRTIiwiSXRlbUxpc3QiLCJ2aWV3IiwiaXNTbWFsbCIsImlzVG91Y2giLCJyb290SWQiLCJyb290RWxlbWVudCIsImNhblNoYXJlIiwiY2FuRG93bmxvYWQiLCJjYW5EZWxldGUiLCJjYW5QcmV2aWV3IiwiY2FuUmVuYW1lIiwib25JdGVtQ2xpY2siLCJvbkl0ZW1TZWxlY3QiLCJvbkl0ZW1EZWxldGUiLCJvbkl0ZW1Eb3dubG9hZCIsIm9uSXRlbVJlbmFtZSIsIm9uSXRlbVNoYXJlIiwib25JdGVtUHJldmlldyIsIm9uU29ydENoYW5nZSIsImN1cnJlbnRDb2xsZWN0aW9uIiwidGFibGVSZWYiLCJmb2N1c2VkUm93IiwiZ2V0TG9jYWxpemVkTWVzc2FnZSIsIm5hbWVDZWxsIiwiaWNvbkNlbGwiLCJkYXRlQ2VsbCIsInNpemVBY2Nlc3NDZWxsIiwibW9yZU9wdGlvbnNDZWxsIiwiaXNSZWNlbnRzIiwiaWQiLCJpdGVtcyIsInNvcnRCeSIsInNvcnREaXJlY3Rpb24iLCJyb3dDb3VudCIsImxlbmd0aCIsInJvd0NsYXNzTmFtZSIsImluZGV4Iiwic2VsZWN0ZWQiLCJzb3J0IiwiYnkiLCJkaXJlY3Rpb24iLCJzY3JvbGxUb1JvdyIsIm9uU2VjdGlvblJlbmRlcmVkIiwiZm9jdXNPblJlbmRlciIsIndpZHRoIiwiaGVpZ2h0Iiwicm93RGF0YSIsInN0YXJ0SW5kZXgiLCJzdG9wSW5kZXgiLCJyb3dTdGFydEluZGV4Iiwicm93U3RvcEluZGV4Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxTQUFTQyxLQUFULEVBQWdCQyxNQUFoQixRQUE4QixpQ0FBOUI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLHFDQUF0Qjs7QUFFQSxPQUFPQyxTQUFQLE1BQXNCLGNBQXRCO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0Isc0JBQS9CO0FBQ0EsT0FBT0MsZ0JBQVAsTUFBNkIsb0JBQTdCO0FBQ0EsT0FBT0MsZ0JBQVAsTUFBNkIsb0JBQTdCO0FBQ0EsT0FBT0MsZ0JBQVAsTUFBNkIsMEJBQTdCO0FBQ0EsT0FBT0MsZ0JBQVAsTUFBNkIsMEJBQTdCO0FBQ0EsT0FBT0MsdUJBQVAsTUFBb0MsMkJBQXBDO0FBQ0EsU0FBU0MsS0FBVCxRQUFzQixnQkFBdEI7QUFDQSxTQUNJQyxVQURKLEVBRUlDLFFBRkosRUFHSUMsaUJBSEosRUFJSUMsbUJBSkosRUFLSUMsVUFMSixFQU1JQyxZQU5KLFFBT08saUJBUFA7OztBQW9DQSxJQUFNQyxXQUFXLFNBQVhBLFFBQVcsT0F1Qko7QUFBQSxRQXRCVEMsSUFzQlMsUUF0QlRBLElBc0JTO0FBQUEsUUFyQlRDLE9BcUJTLFFBckJUQSxPQXFCUztBQUFBLFFBcEJUQyxPQW9CUyxRQXBCVEEsT0FvQlM7QUFBQSxRQW5CVEMsTUFtQlMsUUFuQlRBLE1BbUJTO0FBQUEsUUFsQlRDLFdBa0JTLFFBbEJUQSxXQWtCUztBQUFBLFFBakJUQyxRQWlCUyxRQWpCVEEsUUFpQlM7QUFBQSxRQWhCVEMsV0FnQlMsUUFoQlRBLFdBZ0JTO0FBQUEsUUFmVEMsU0FlUyxRQWZUQSxTQWVTO0FBQUEsUUFkVEMsVUFjUyxRQWRUQSxVQWNTO0FBQUEsUUFiVEMsU0FhUyxRQWJUQSxTQWFTO0FBQUEsUUFaVEMsV0FZUyxRQVpU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RmI7QUFHSSwwQ0FBYzZCLFFBSGxCO0FBSUksNENBQWdCcEMsa0JBSnBCO0FBS0ksbUNBQU8sR0FMWDtBQU1JLHNDQUFVO0FBTmQsMEJBNUJKO0FBb0NLZSxrQ0FDSyxJQURMLEdBRUssb0JBQUMsTUFBRDtBQUNFLHVDQUFVLGtCQURaO0FBRUUsbUNBQ00wQixZQUNNTixvQkFBb0Isc0JBQXBCLENBRE4sR0FFTUEsb0JBQW9CLG9CQUFwQixDQUxkO0FBT0UscUNBQVNNLFlBQVkvQixtQkFBWixHQUFrQ0QsaUJBUDdDO0FBUUUsMENBQWM2QixRQVJoQjtBQVNFLDRDQUFnQnRDLGtCQVRsQjtBQVVFLG1DQUFPLEdBVlQ7QUFXRSx3Q0FBWTtBQVhkLDBCQXRDVjtBQW1ES2Usa0NBQ0ssSUFETCxHQUVLLG9CQUFDLE1BQUQ7QUFDRSx1Q0FBVSxrQkFEWjtBQUVFLG1DQUFPb0Isb0JBQW9CLGdCQUFwQixDQUZUO0FBR0UscUNBQVN4QixVQUhYO0FBSUUsMENBQWM0QixjQUpoQjtBQUtFLDRDQUFnQnZDLGtCQUxsQjtBQU1FLG1DQUFPLEVBTlQ7QUFPRSx3Q0FBWTtBQVBkLDBCQXJEVjtBQThESSw0Q0FBQyxNQUFEO0FBQ0ksNkNBREo7QUFFSSxxQ0FBU1EsUUFGYjtBQUdJLDBDQUFjZ0MsZUFIbEI7QUFJSSxtQ0FBT3pCLFdBQVcsQ0FBQ0ksUUFBWixHQUF1QixFQUF2QixHQUE0QixHQUp2QztBQUtJLHdDQUFZO0FBTGhCO0FBOURKLHFCQURIO0FBQUE7QUFETCxhQURIO0FBQUE7QUFmTCxLQURKO0FBNEZILENBaEtEOztBQWtLQSxlQUFlTixRQUFmIiwiZmlsZSI6Ikl0ZW1MaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEl0ZW0gbGlzdCBjb21wb25lbnRcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IHsgVGFibGUsIENvbHVtbiB9IGZyb20gJ3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvZXMvVGFibGUnO1xyXG5pbXBvcnQgQXV0b1NpemVyIGZyb20gJ3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvZXMvQXV0b1NpemVyJztcclxuaW1wb3J0ICdyZWFjdC12aXJ0dWFsaXplZC9zdHlsZXMuY3NzJztcclxuaW1wb3J0IEtleUJpbmRlciBmcm9tICcuLi9LZXlCaW5kZXInO1xyXG5pbXBvcnQgaGVhZGVyQ2VsbFJlbmRlcmVyIGZyb20gJy4vaGVhZGVyQ2VsbFJlbmRlcmVyJztcclxuaW1wb3J0IHNpemVDZWxsUmVuZGVyZXIgZnJvbSAnLi9zaXplQ2VsbFJlbmRlcmVyJztcclxuaW1wb3J0IGRhdGVDZWxsUmVuZGVyZXIgZnJvbSAnLi9kYXRlQ2VsbFJlbmRlcmVyJztcclxuaW1wb3J0IG5hbWVDZWxsUmVuZGVyZXIgZnJvbSAnLi4vSXRlbS9uYW1lQ2VsbFJlbmRlcmVyJztcclxuaW1wb3J0IGljb25DZWxsUmVuZGVyZXIgZnJvbSAnLi4vSXRlbS9pY29uQ2VsbFJlbmRlcmVyJztcclxuaW1wb3J0IG1vcmVPcHRpb25zQ2VsbFJlbmRlcmVyIGZyb20gJy4vbW9yZU9wdGlvbnNDZWxsUmVuZGVyZXInO1xyXG5pbXBvcnQgeyBmb2N1cyB9IGZyb20gJy4uLy4uL3V0aWwvZG9tJztcclxuaW1wb3J0IHtcclxuICAgIEZJRUxEX05BTUUsXHJcbiAgICBGSUVMRF9JRCxcclxuICAgIEZJRUxEX01PRElGSUVEX0FULFxyXG4gICAgRklFTERfSU5URVJBQ1RFRF9BVCxcclxuICAgIEZJRUxEX1NJWkUsXHJcbiAgICBWSUVXX1JFQ0VOVFNcclxufSBmcm9tICcuLi8uLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgdHlwZSB7IFZpZXcsIENvbGxlY3Rpb24gfSBmcm9tICcuLi8uLi9mbG93VHlwZXMnO1xyXG5pbXBvcnQgJy4vSXRlbUxpc3Quc2Nzcyc7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgdmlldzogVmlldyxcclxuICAgIHJvb3RFbGVtZW50OiBIVE1MRWxlbWVudCxcclxuICAgIGlzU21hbGw6IGJvb2xlYW4sXHJcbiAgICBpc1RvdWNoOiBib29sZWFuLFxyXG4gICAgcm9vdElkOiBzdHJpbmcsXHJcbiAgICBmb2N1c2VkUm93OiBudW1iZXIsXHJcbiAgICBjYW5TaGFyZTogYm9vbGVhbixcclxuICAgIGNhbkRvd25sb2FkOiBib29sZWFuLFxyXG4gICAgY2FuRGVsZXRlOiBib29sZWFuLFxyXG4gICAgY2FuUHJldmlldzogYm9vbGVhbixcclxuICAgIGNhblJlbmFtZTogYm9vbGVhbixcclxuICAgIG9uSXRlbUNsaWNrOiBGdW5jdGlvbixcclxuICAgIG9uSXRlbURvd25sb2FkOiBGdW5jdGlvbixcclxuICAgIG9uSXRlbVNlbGVjdDogRnVuY3Rpb24sXHJcbiAgICBvbkl0ZW1EZWxldGU6IEZ1bmN0aW9uLFxyXG4gICAgb25JdGVtUmVuYW1lOiBGdW5jdGlvbixcclxuICAgIG9uSXRlbVNoYXJlOiBGdW5jdGlvbixcclxuICAgIG9uSXRlbVByZXZpZXc6IEZ1bmN0aW9uLFxyXG4gICAgb25Tb3J0Q2hhbmdlOiBGdW5jdGlvbixcclxuICAgIHRhYmxlUmVmOiBGdW5jdGlvbixcclxuICAgIGdldExvY2FsaXplZE1lc3NhZ2U6IEZ1bmN0aW9uLFxyXG4gICAgY3VycmVudENvbGxlY3Rpb246IENvbGxlY3Rpb25cclxufTtcclxuXHJcbmNvbnN0IEl0ZW1MaXN0ID0gKHtcclxuICAgIHZpZXcsXHJcbiAgICBpc1NtYWxsLFxyXG4gICAgaXNUb3VjaCxcclxuICAgIHJvb3RJZCxcclxuICAgIHJvb3RFbGVtZW50LFxyXG4gICAgY2FuU2hhcmUsXHJcbiAgICBjYW5Eb3dubG9hZCxcclxuICAgIGNhbkRlbGV0ZSxcclxuICAgIGNhblByZXZpZXcsXHJcbiAgICBjYW5SZW5hbWUsXHJcbiAgICBvbkl0ZW1DbGljayxcclxuICAgIG9uSXRlbVNlbGVjdCxcclxuICAgIG9uSXRlbURlbGV0ZSxcclxuICAgIG9uSXRlbURvd25sb2FkLFxyXG4gICAgb25JdGVtUmVuYW1lLFxyXG4gICAgb25JdGVtU2hhcmUsXHJcbiAgICBvbkl0ZW1QcmV2aWV3LFxyXG4gICAgb25Tb3J0Q2hhbmdlLFxyXG4gICAgY3VycmVudENvbGxlY3Rpb24sXHJcbiAgICB0YWJsZVJlZixcclxuICAgIGZvY3VzZWRSb3csXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlXHJcbn06IFByb3BzKSA9PiB7XHJcbiAgICBjb25zdCBuYW1lQ2VsbCA9IG5hbWVDZWxsUmVuZGVyZXIoXHJcbiAgICAgICAgcm9vdElkLFxyXG4gICAgICAgIGdldExvY2FsaXplZE1lc3NhZ2UsXHJcbiAgICAgICAgdmlldyxcclxuICAgICAgICBvbkl0ZW1DbGljayxcclxuICAgICAgICBvbkl0ZW1TZWxlY3QsXHJcbiAgICAgICAgY2FuUHJldmlldyxcclxuICAgICAgICBpc1NtYWxsLCAvLyBzaG93cyBkZXRhaWxzIGlmIGZhbHNlXHJcbiAgICAgICAgaXNUb3VjaFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGljb25DZWxsID0gaWNvbkNlbGxSZW5kZXJlcigpO1xyXG4gICAgY29uc3QgZGF0ZUNlbGwgPSBkYXRlQ2VsbFJlbmRlcmVyKGdldExvY2FsaXplZE1lc3NhZ2UpO1xyXG4gICAgY29uc3Qgc2l6ZUFjY2Vzc0NlbGwgPSBzaXplQ2VsbFJlbmRlcmVyKCk7XHJcbiAgICBjb25zdCBtb3JlT3B0aW9uc0NlbGwgPSBtb3JlT3B0aW9uc0NlbGxSZW5kZXJlcihcclxuICAgICAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlLFxyXG4gICAgICAgIGNhblByZXZpZXcsXHJcbiAgICAgICAgY2FuU2hhcmUsXHJcbiAgICAgICAgY2FuRG93bmxvYWQsXHJcbiAgICAgICAgY2FuRGVsZXRlLFxyXG4gICAgICAgIGNhblJlbmFtZSxcclxuICAgICAgICBvbkl0ZW1TZWxlY3QsXHJcbiAgICAgICAgb25JdGVtRGVsZXRlLFxyXG4gICAgICAgIG9uSXRlbURvd25sb2FkLFxyXG4gICAgICAgIG9uSXRlbVJlbmFtZSxcclxuICAgICAgICBvbkl0ZW1TaGFyZSxcclxuICAgICAgICBvbkl0ZW1QcmV2aWV3LFxyXG4gICAgICAgIGlzU21hbGxcclxuICAgICk7XHJcbiAgICBjb25zdCBpc1JlY2VudHM6IGJvb2xlYW4gPSB2aWV3ID09PSBWSUVXX1JFQ0VOVFM7XHJcbiAgICBjb25zdCB7IGlkLCBpdGVtcyA9IFtdLCBzb3J0QnksIHNvcnREaXJlY3Rpb24gfTogQ29sbGVjdGlvbiA9IGN1cnJlbnRDb2xsZWN0aW9uO1xyXG4gICAgY29uc3Qgcm93Q291bnQ6IG51bWJlciA9IGl0ZW1zLmxlbmd0aDtcclxuICAgIGNvbnN0IHJvd0NsYXNzTmFtZSA9ICh7IGluZGV4IH0pID0+IHtcclxuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnYmNlLWl0ZW0taGVhZGVyLXJvdyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHsgc2VsZWN0ZWQgfSA9IGl0ZW1zW2luZGV4XTtcclxuICAgICAgICByZXR1cm4gY2xhc3NOYW1lcyhgYmNlLWl0ZW0tcm93IGJjZS1pdGVtLXJvdy0ke2luZGV4fWAsIHtcclxuICAgICAgICAgICAgJ2JjZS1pdGVtLXJvdy1zZWxlY3RlZCc6IHNlbGVjdGVkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgc29ydCA9ICh7IHNvcnRCeTogYnksIHNvcnREaXJlY3Rpb246IGRpcmVjdGlvbiB9KSA9PiB7XHJcbiAgICAgICAgb25Tb3J0Q2hhbmdlKGJ5LCBkaXJlY3Rpb24pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxLZXlCaW5kZXJcclxuICAgICAgICAgICAgaWQ9e2lkfVxyXG4gICAgICAgICAgICBpdGVtcz17aXRlbXN9XHJcbiAgICAgICAgICAgIGNvbHVtbkNvdW50PXsxfVxyXG4gICAgICAgICAgICByb3dDb3VudD17cm93Q291bnR9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT0nYmNlLWl0ZW0tZ3JpZCdcclxuICAgICAgICAgICAgb25SZW5hbWU9e29uSXRlbVJlbmFtZX1cclxuICAgICAgICAgICAgb25TaGFyZT17b25JdGVtU2hhcmV9XHJcbiAgICAgICAgICAgIG9uRG93bmxvYWQ9e29uSXRlbURvd25sb2FkfVxyXG4gICAgICAgICAgICBvbk9wZW49e29uSXRlbUNsaWNrfVxyXG4gICAgICAgICAgICBvblNlbGVjdD17b25JdGVtU2VsZWN0fVxyXG4gICAgICAgICAgICBvbkRlbGV0ZT17b25JdGVtRGVsZXRlfVxyXG4gICAgICAgICAgICBzY3JvbGxUb1Jvdz17Zm9jdXNlZFJvd31cclxuICAgICAgICAgICAgb25TY3JvbGxUb0NoYW5nZT17KHsgc2Nyb2xsVG9Sb3cgfSkgPT4gZm9jdXMocm9vdEVsZW1lbnQsIGAuYmNlLWl0ZW0tcm93LSR7c2Nyb2xsVG9Sb3d9YCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgICB7KHsgb25TZWN0aW9uUmVuZGVyZWQsIHNjcm9sbFRvUm93LCBmb2N1c09uUmVuZGVyIH0pID0+XHJcbiAgICAgICAgICAgICAgICA8QXV0b1NpemVyPlxyXG4gICAgICAgICAgICAgICAgICAgIHsoeyB3aWR0aCwgaGVpZ2h0IH0pID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9e3dpZHRofVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJIZWlnaHQ9e2lzU21hbGwgPyAwIDogNDB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dIZWlnaHQ9ezUwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Q291bnQ9e3Jvd0NvdW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93R2V0dGVyPXsoeyBpbmRleCB9KSA9PiBpdGVtc1tpbmRleF19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e3RhYmxlUmVmfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydD17c29ydH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRCeT17c29ydEJ5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydERpcmVjdGlvbj17c29ydERpcmVjdGlvbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0NsYXNzTmFtZT17cm93Q2xhc3NOYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Sb3dDbGljaz17KHsgcm93RGF0YSB9KSA9PiBvbkl0ZW1TZWxlY3Qocm93RGF0YSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb0luZGV4PXtzY3JvbGxUb1Jvd31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUm93c1JlbmRlcmVkPXsoeyBzdGFydEluZGV4LCBzdG9wSW5kZXggfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VjdGlvblJlbmRlcmVkKHsgcm93U3RhcnRJbmRleDogc3RhcnRJbmRleCwgcm93U3RvcEluZGV4OiBzdG9wSW5kZXggfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzT25SZW5kZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXMocm9vdEVsZW1lbnQsIGAuYmNlLWl0ZW0tcm93LSR7c2Nyb2xsVG9Sb3d9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbHVtblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVTb3J0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUtleT17RklFTERfSUR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFJlbmRlcmVyPXtpY29uQ2VsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17aXNTbWFsbCA/IDMwIDogNTB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleFNocmluaz17MH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29sdW1uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9e2dldExvY2FsaXplZE1lc3NhZ2UoJ2J1aWsuaXRlbS5uYW1lJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUtleT17RklFTERfTkFNRX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsUmVuZGVyZXI9e25hbWVDZWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlclJlbmRlcmVyPXtoZWFkZXJDZWxsUmVuZGVyZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezMwMH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4R3Jvdz17MX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNTbWFsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogPENvbHVtblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2JjZS1pdGVtLWNvbG91bW4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSZWNlbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGdldExvY2FsaXplZE1lc3NhZ2UoJ2J1aWsuaXRlbS5pbnRlcmFjdGVkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZ2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5pdGVtLm1vZGlmaWVkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFLZXk9e2lzUmVjZW50cyA/IEZJRUxEX0lOVEVSQUNURURfQVQgOiBGSUVMRF9NT0RJRklFRF9BVH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFJlbmRlcmVyPXtkYXRlQ2VsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyUmVuZGVyZXI9e2hlYWRlckNlbGxSZW5kZXJlcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezEyMH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleFNocmluaz17MH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzU21hbGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDxDb2x1bW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdiY2UtaXRlbS1jb2xvdW1uJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5pdGVtLnNpemUnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUtleT17RklFTERfU0laRX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFJlbmRlcmVyPXtzaXplQWNjZXNzQ2VsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyUmVuZGVyZXI9e2hlYWRlckNlbGxSZW5kZXJlcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezgwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4U2hyaW5rPXswfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29sdW1uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZVNvcnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhS2V5PXtGSUVMRF9JRH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsUmVuZGVyZXI9e21vcmVPcHRpb25zQ2VsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17aXNTbWFsbCB8fCAhY2FuU2hhcmUgPyA1OCA6IDE0MH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4U2hyaW5rPXswfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9UYWJsZT59XHJcbiAgICAgICAgICAgICAgICA8L0F1dG9TaXplcj59XHJcbiAgICAgICAgPC9LZXlCaW5kZXI+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSXRlbUxpc3Q7XHJcbiJdfQ==