/**
 * 
 * @file File picker header and list component
 * @author Box
 */

import React from 'react';
import ItemList from './ItemList';
import EmptyState from '../EmptyState';
import ProgressBar from '../ProgressBar';
import { VIEW_ERROR, VIEW_SELECTED } from '../../constants';


/**
 * Determines if we should show the empty state
 *
 * @param {string} view the current view
 * @param {Object} currentCollection the current collection
 * @return {boolean} empty or not
 */
function isEmpty(view, currentCollection) {
    var _currentCollection$it = currentCollection.items,
        items = _currentCollection$it === undefined ? [] : _currentCollection$it;

    return view === VIEW_ERROR || items.length === 0;
}

var Content = function Content(_ref) {
    var view = _ref.view,
        isSmall = _ref.isSmall,
        isTouch = _ref.isTouch,
        rootId = _ref.rootId,
        rootElement = _ref.rootElement,
        currentCollection = _ref.currentCollection,
        tableRef = _ref.tableRef,
        focusedRow = _ref.focusedRow,
        canDownload = _ref.canDownload,
        canDelete = _ref.canDelete,
        canRename = _ref.canRename,
        canShare = _ref.canShare,
        canPreview = _ref.canPreview,
        onItemClick = _ref.onItemClick,
        onItemSelect = _ref.onItemSelect,
        onItemDelete = _ref.onItemDelete,
        onItemDownload = _ref.onItemDownload,
        onItemRename = _ref.onItemRename,
        onItemShare = _ref.onItemShare,
        onItemPreview = _ref.onItemPreview,
        onSortChange = _ref.onSortChange,
        getLocalizedMessage = _ref.getLocalizedMessage;
    return React.createElement(
        'div',
        { className: 'bce-content' },
        view === VIEW_ERROR || view === VIEW_SELECTED ? null : React.createElement(ProgressBar, { percent: currentCollection.percentLoaded }),
        isEmpty(view, currentCollection) ? React.createElement(EmptyState, {
            view: view,
            getLocalizedMessage: getLocalizedMessage,
            isLoading: currentCollection.percentLoaded !== 100
        }) : React.createElement(ItemList, {
            view: view,
            isSmall: isSmall,
            isTouch: isTouch,
            rootId: rootId,
            rootElement: rootElement,
            focusedRow: focusedRow,
            currentCollection: currentCollection,
            tableRef: tableRef,
            canShare: canShare,
            canPreview: canPreview,
            canDelete: canDelete,
            canRename: canRename,
            canDownload: canDownload,
            onItemClick: onItemClick,
            onItemSelect: onItemSelect,
            onItemDelete: onItemDelete,
            onItemDownload: onItemDownload,
            onItemRename: onItemRename,
            onItemShare: onItemShare,
            onItemPreview: onItemPreview,
            onSortChange: onSortChange,
            getLocalizedMessage: getLocalizedMessage
        })
    );
};

export default Content;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRlbnQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJJdGVtTGlzdCIsIkVtcHR5U3RhdGUiLCJQcm9ncmVzc0JhciIsIlZJRVdfRVJST1IiLCJWSUVXX1NFTEVDVEVEIiwiaXNFbXB0eSIsInZpZXciLCJjdXJyZW50Q29sbGVjdGlvbiIsIml0ZW1zIiwibGVuZ3RoIiwiQ29udGVudCIsImlzU21hbGwiLCJpc1RvdWNoIiwicm9vdElkIiwicm9vdEVsZW1lbnQiLCJ0YWJsZVJlZiIsImZvY3VzZWRSb3ciLCJjYW5Eb3dubG9hZCIsImNhbkRlbGV0ZSIsImNhblJlbmFtZSIsImNhblNoYXJlIiwiY2FuUHJldmlldyIsIm9uSXRlbUNsaWNrIiwib25JdGVtU2VsZWN0Iiwib25JdGVtRGVsZXRlIiwib25JdGVtRG93bmxvYWQiLCJvbkl0ZW1SZW5hbWUiLCJvbkl0ZW1TaGFyZSIsIm9uSXRlbVByZXZpZXciLCJvblNvcnRDaGFuZ2UiLCJnZXRMb2NhbGl6ZWRNZXNzYWdlIiwicGVyY2VudExvYWRlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLFlBQXJCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixlQUF2QjtBQUNBLE9BQU9DLFdBQVAsTUFBd0IsZ0JBQXhCO0FBQ0EsU0FBU0MsVUFBVCxFQUFxQkMsYUFBckIsUUFBMEMsaUJBQTFDOzs7QUFJQTs7Ozs7OztBQU9BLFNBQVNDLE9BQVQsQ0FBaUJDLElBQWpCLEVBQTZCQyxpQkFBN0IsRUFBcUU7QUFBQSxnQ0FDOUJBLGlCQUQ4QixDQUN6REMsS0FEeUQ7QUFBQSxRQUN6REEsS0FEeUQseUNBQ2pELEVBRGlEOztBQUVqRSxXQUFPRixTQUFTSCxVQUFULElBQXVCSyxNQUFNQyxNQUFOLEtBQWlCLENBQS9DO0FBQ0g7O0FBMkJELElBQU1DLFVBQVUsU0FBVkEsT0FBVTtBQUFBLFFBQ1pKLElBRFksUUFDWkEsSUFEWTtBQUFBLFFBRVpLLE9BRlksUUFFWkEsT0FGWTtBQUFBLFFBR1pDLE9BSFksUUFHWkEsT0FIWTtBQUFBLFFBSVpDLE1BSlksUUFJWkEsTUFKWTtBQUFBLFFBS1pDLFdBTFksUUFLWkEsV0FMWTtBQUFBLFFBTVpQLGlCQU5ZLFFBTVpBLGlCQU5ZO0FBQUEsUUFPWlEsUUFQWSxRQU9aQSxRQVBZO0FBQUEsUUFRWkMsVUFSWSxRQVFaQSxVQVJZO0FBQUEsUUFTWkMsV0FUWSxRQVNaQSxXQVRZO0FBQUEsUUFVWkMsU0FWWSxRQVVaQSxTQVZZO0FBQUEsUUFXWkMsU0FYWSxRQVdaQSxTQVhZO0FBQUEsUUFZWkMsUUFaWSxRQVlaQSxRQVpZO0FBQUEsUUFhWkMsVUFiWSxRQWFaQSxVQWJZO0FBQUEsUUFjWkMsV0FkWSxRQWNaQSxXQWRZO0FBQUEsUUFlWkMsWUFmWSxRQWVaQSxZQWZZO0FBQUEsUUFnQlpDLFlBaEJZLFFBZ0JaQSxZQWhCWTtBQUFBLFFBaUJaQyxjQWpCWSxRQWlCWkEsY0FqQlk7QUFBQSxRQWtCWkMsWUFsQlksUUFrQlpBLFlBbEJZO0FBQUEsUUFtQlpDLFdBbkJZLFFBbUJaQSxXQW5CWTtBQUFBLFFBb0JaQyxhQXBCWSxRQW9CWkEsYUFwQlk7QUFBQSxRQXFCWkMsWUFyQlksUUFxQlpBLFlBckJZO0FBQUEsUUFzQlpDLG1CQXRCWSxRQXNCWkEsbUJBdEJZO0FBQUEsV0F3Qlo7QUFBQTtBQUFBLFVBQUssV0FBVSxhQUFmO0FBQ0t4QixpQkFBU0gsVUFBVCxJQUF1QkcsU0FBU0YsYUFBaEMsR0FDSyxJQURMLEdBRUssb0JBQUMsV0FBRCxJQUFhLFNBQVNHLGtCQUFrQndCLGFBQXhDLEdBSFY7QUFJSzFCLGdCQUFRQyxJQUFSLEVBQWNDLGlCQUFkLElBQ0ssb0JBQUMsVUFBRDtBQUNFLGtCQUFNRCxJQURSO0FBRUUsaUNBQXFCd0IsbUJBRnZCO0FBR0UsdUJBQVd2QixrQkFBa0J3QixhQUFsQixLQUFvQztBQUhqRCxVQURMLEdBTUssb0JBQUMsUUFBRDtBQUNFLGtCQUFNekIsSUFEUjtBQUVFLHFCQUFTSyxPQUZYO0FBR0UscUJBQVNDLE9BSFg7QUFJRSxvQkFBUUMsTUFKVjtBQUtFLHlCQUFhQyxXQUxmO0FBTUUsd0JBQVlFLFVBTmQ7QUFPRSwrQkFBbUJULGlCQVByQjtBQVFFLHNCQUFVUSxRQVJaO0FBU0Usc0JBQVVLLFFBVFo7QUFVRSx3QkFBWUMsVUFWZDtBQVdFLHVCQUFXSCxTQVhiO0FBWUUsdUJBQVdDLFNBWmI7QUFhRSx5QkFBYUYsV0FiZjtBQWNFLHlCQUFhSyxXQWRmO0FBZUUsMEJBQWNDLFlBZmhCO0FBZ0JFLDBCQUFjQyxZQWhCaEI7QUFpQkUsNEJBQWdCQyxjQWpCbEI7QUFrQkUsMEJBQWNDLFlBbEJoQjtBQW1CRSx5QkFBYUMsV0FuQmY7QUFvQkUsMkJBQWVDLGFBcEJqQjtBQXFCRSwwQkFBY0MsWUFyQmhCO0FBc0JFLGlDQUFxQkM7QUF0QnZCO0FBVlYsS0F4Qlk7QUFBQSxDQUFoQjs7QUE0REEsZUFBZXBCLE9BQWYiLCJmaWxlIjoiQ29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBGaWxlIHBpY2tlciBoZWFkZXIgYW5kIGxpc3QgY29tcG9uZW50XHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1MaXN0IGZyb20gJy4vSXRlbUxpc3QnO1xyXG5pbXBvcnQgRW1wdHlTdGF0ZSBmcm9tICcuLi9FbXB0eVN0YXRlJztcclxuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJy4uL1Byb2dyZXNzQmFyJztcclxuaW1wb3J0IHsgVklFV19FUlJPUiwgVklFV19TRUxFQ1RFRCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB0eXBlIHsgQ29sbGVjdGlvbiwgVmlldyB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcbmltcG9ydCAnLi9Db250ZW50LnNjc3MnO1xyXG5cclxuLyoqXHJcbiAqIERldGVybWluZXMgaWYgd2Ugc2hvdWxkIHNob3cgdGhlIGVtcHR5IHN0YXRlXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB2aWV3IHRoZSBjdXJyZW50IHZpZXdcclxuICogQHBhcmFtIHtPYmplY3R9IGN1cnJlbnRDb2xsZWN0aW9uIHRoZSBjdXJyZW50IGNvbGxlY3Rpb25cclxuICogQHJldHVybiB7Ym9vbGVhbn0gZW1wdHkgb3Igbm90XHJcbiAqL1xyXG5mdW5jdGlvbiBpc0VtcHR5KHZpZXc6IFZpZXcsIGN1cnJlbnRDb2xsZWN0aW9uOiBDb2xsZWN0aW9uKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCB7IGl0ZW1zID0gW10gfTogQ29sbGVjdGlvbiA9IGN1cnJlbnRDb2xsZWN0aW9uO1xyXG4gICAgcmV0dXJuIHZpZXcgPT09IFZJRVdfRVJST1IgfHwgaXRlbXMubGVuZ3RoID09PSAwO1xyXG59XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgdmlldzogVmlldyxcclxuICAgIHJvb3RJZDogc3RyaW5nLFxyXG4gICAgdGFibGVSZWY6IEZ1bmN0aW9uLFxyXG4gICAgcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxyXG4gICAgY2FuU2hhcmU6IGJvb2xlYW4sXHJcbiAgICBjYW5Eb3dubG9hZDogYm9vbGVhbixcclxuICAgIGNhbkRlbGV0ZTogYm9vbGVhbixcclxuICAgIGNhblJlbmFtZTogYm9vbGVhbixcclxuICAgIGNhblByZXZpZXc6IGJvb2xlYW4sXHJcbiAgICBvbkl0ZW1DbGljazogRnVuY3Rpb24sXHJcbiAgICBvbkl0ZW1Eb3dubG9hZDogRnVuY3Rpb24sXHJcbiAgICBvbkl0ZW1TZWxlY3Q6IEZ1bmN0aW9uLFxyXG4gICAgb25JdGVtRGVsZXRlOiBGdW5jdGlvbixcclxuICAgIG9uSXRlbVJlbmFtZTogRnVuY3Rpb24sXHJcbiAgICBvbkl0ZW1TaGFyZTogRnVuY3Rpb24sXHJcbiAgICBvbkl0ZW1QcmV2aWV3OiBGdW5jdGlvbixcclxuICAgIG9uU29ydENoYW5nZTogRnVuY3Rpb24sXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlOiBGdW5jdGlvbixcclxuICAgIGlzU21hbGw6IGJvb2xlYW4sXHJcbiAgICBpc1RvdWNoOiBib29sZWFuLFxyXG4gICAgZm9jdXNlZFJvdzogbnVtYmVyLFxyXG4gICAgY3VycmVudENvbGxlY3Rpb246IENvbGxlY3Rpb25cclxufTtcclxuXHJcbmNvbnN0IENvbnRlbnQgPSAoe1xyXG4gICAgdmlldyxcclxuICAgIGlzU21hbGwsXHJcbiAgICBpc1RvdWNoLFxyXG4gICAgcm9vdElkLFxyXG4gICAgcm9vdEVsZW1lbnQsXHJcbiAgICBjdXJyZW50Q29sbGVjdGlvbixcclxuICAgIHRhYmxlUmVmLFxyXG4gICAgZm9jdXNlZFJvdyxcclxuICAgIGNhbkRvd25sb2FkLFxyXG4gICAgY2FuRGVsZXRlLFxyXG4gICAgY2FuUmVuYW1lLFxyXG4gICAgY2FuU2hhcmUsXHJcbiAgICBjYW5QcmV2aWV3LFxyXG4gICAgb25JdGVtQ2xpY2ssXHJcbiAgICBvbkl0ZW1TZWxlY3QsXHJcbiAgICBvbkl0ZW1EZWxldGUsXHJcbiAgICBvbkl0ZW1Eb3dubG9hZCxcclxuICAgIG9uSXRlbVJlbmFtZSxcclxuICAgIG9uSXRlbVNoYXJlLFxyXG4gICAgb25JdGVtUHJldmlldyxcclxuICAgIG9uU29ydENoYW5nZSxcclxuICAgIGdldExvY2FsaXplZE1lc3NhZ2VcclxufTogUHJvcHMpID0+XHJcbiAgICA8ZGl2IGNsYXNzTmFtZT0nYmNlLWNvbnRlbnQnPlxyXG4gICAgICAgIHt2aWV3ID09PSBWSUVXX0VSUk9SIHx8IHZpZXcgPT09IFZJRVdfU0VMRUNURURcclxuICAgICAgICAgICAgPyBudWxsXHJcbiAgICAgICAgICAgIDogPFByb2dyZXNzQmFyIHBlcmNlbnQ9e2N1cnJlbnRDb2xsZWN0aW9uLnBlcmNlbnRMb2FkZWR9IC8+fVxyXG4gICAgICAgIHtpc0VtcHR5KHZpZXcsIGN1cnJlbnRDb2xsZWN0aW9uKVxyXG4gICAgICAgICAgICA/IDxFbXB0eVN0YXRlXHJcbiAgICAgICAgICAgICAgICB2aWV3PXt2aWV3fVxyXG4gICAgICAgICAgICAgICAgZ2V0TG9jYWxpemVkTWVzc2FnZT17Z2V0TG9jYWxpemVkTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgIGlzTG9hZGluZz17Y3VycmVudENvbGxlY3Rpb24ucGVyY2VudExvYWRlZCAhPT0gMTAwfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDogPEl0ZW1MaXN0XHJcbiAgICAgICAgICAgICAgICB2aWV3PXt2aWV3fVxyXG4gICAgICAgICAgICAgICAgaXNTbWFsbD17aXNTbWFsbH1cclxuICAgICAgICAgICAgICAgIGlzVG91Y2g9e2lzVG91Y2h9XHJcbiAgICAgICAgICAgICAgICByb290SWQ9e3Jvb3RJZH1cclxuICAgICAgICAgICAgICAgIHJvb3RFbGVtZW50PXtyb290RWxlbWVudH1cclxuICAgICAgICAgICAgICAgIGZvY3VzZWRSb3c9e2ZvY3VzZWRSb3d9XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29sbGVjdGlvbj17Y3VycmVudENvbGxlY3Rpb259XHJcbiAgICAgICAgICAgICAgICB0YWJsZVJlZj17dGFibGVSZWZ9XHJcbiAgICAgICAgICAgICAgICBjYW5TaGFyZT17Y2FuU2hhcmV9XHJcbiAgICAgICAgICAgICAgICBjYW5QcmV2aWV3PXtjYW5QcmV2aWV3fVxyXG4gICAgICAgICAgICAgICAgY2FuRGVsZXRlPXtjYW5EZWxldGV9XHJcbiAgICAgICAgICAgICAgICBjYW5SZW5hbWU9e2NhblJlbmFtZX1cclxuICAgICAgICAgICAgICAgIGNhbkRvd25sb2FkPXtjYW5Eb3dubG9hZH1cclxuICAgICAgICAgICAgICAgIG9uSXRlbUNsaWNrPXtvbkl0ZW1DbGlja31cclxuICAgICAgICAgICAgICAgIG9uSXRlbVNlbGVjdD17b25JdGVtU2VsZWN0fVxyXG4gICAgICAgICAgICAgICAgb25JdGVtRGVsZXRlPXtvbkl0ZW1EZWxldGV9XHJcbiAgICAgICAgICAgICAgICBvbkl0ZW1Eb3dubG9hZD17b25JdGVtRG93bmxvYWR9XHJcbiAgICAgICAgICAgICAgICBvbkl0ZW1SZW5hbWU9e29uSXRlbVJlbmFtZX1cclxuICAgICAgICAgICAgICAgIG9uSXRlbVNoYXJlPXtvbkl0ZW1TaGFyZX1cclxuICAgICAgICAgICAgICAgIG9uSXRlbVByZXZpZXc9e29uSXRlbVByZXZpZXd9XHJcbiAgICAgICAgICAgICAgICBvblNvcnRDaGFuZ2U9e29uU29ydENoYW5nZX1cclxuICAgICAgICAgICAgICAgIGdldExvY2FsaXplZE1lc3NhZ2U9e2dldExvY2FsaXplZE1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgLz59XHJcbiAgICA8L2Rpdj47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250ZW50O1xyXG4iXX0=