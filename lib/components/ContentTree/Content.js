/**
 * 
 * @file File picker header and list component
 * @author Box
 */

import React from 'react';
import ItemList from './ItemList';
import EmptyState from '../EmptyState';
import ProgressBar from '../ProgressBar';
import { VIEW_ERROR } from '../../constants';


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
        currentCollection = _ref.currentCollection,
        tableRef = _ref.tableRef,
        onItemClick = _ref.onItemClick,
        onExpanderClick = _ref.onExpanderClick,
        getLocalizedMessage = _ref.getLocalizedMessage;
    return React.createElement(
        'div',
        { className: 'bct-content' },
        isEmpty(view, currentCollection) ? React.createElement(
            'div',
            { className: 'buik-empty' },
            React.createElement(EmptyState, {
                view: view,
                getLocalizedMessage: getLocalizedMessage,
                isLoading: currentCollection.percentLoaded !== 100
            }),
            React.createElement(ProgressBar, { percent: currentCollection.percentLoaded })
        ) : React.createElement(
            'div',
            { className: 'bct-item-list' },
            React.createElement(ItemList, {
                isSmall: isSmall,
                items: currentCollection.items,
                tableRef: tableRef,
                onItemClick: onItemClick,
                onExpanderClick: onExpanderClick,
                getLocalizedMessage: getLocalizedMessage,
                isLoading: currentCollection.percentLoaded !== 100
            }),
            React.createElement(ProgressBar, { percent: currentCollection.percentLoaded })
        )
    );
};

export default Content;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRlbnQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJJdGVtTGlzdCIsIkVtcHR5U3RhdGUiLCJQcm9ncmVzc0JhciIsIlZJRVdfRVJST1IiLCJpc0VtcHR5IiwidmlldyIsImN1cnJlbnRDb2xsZWN0aW9uIiwiaXRlbXMiLCJsZW5ndGgiLCJDb250ZW50IiwiaXNTbWFsbCIsInRhYmxlUmVmIiwib25JdGVtQ2xpY2siLCJvbkV4cGFuZGVyQ2xpY2siLCJnZXRMb2NhbGl6ZWRNZXNzYWdlIiwicGVyY2VudExvYWRlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLFlBQXJCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixlQUF2QjtBQUNBLE9BQU9DLFdBQVAsTUFBd0IsZ0JBQXhCO0FBQ0EsU0FBU0MsVUFBVCxRQUEyQixpQkFBM0I7OztBQWNBOzs7Ozs7O0FBT0EsU0FBU0MsT0FBVCxDQUFpQkMsSUFBakIsRUFBNkJDLGlCQUE3QixFQUFxRTtBQUFBLGdDQUMxQ0EsaUJBRDBDLENBQ3pEQyxLQUR5RDtBQUFBLFFBQ3pEQSxLQUR5RCx5Q0FDakQsRUFEaUQ7O0FBRWpFLFdBQU9GLFNBQVNGLFVBQVQsSUFBdUJJLE1BQU1DLE1BQU4sS0FBaUIsQ0FBL0M7QUFDSDs7QUFFRCxJQUFNQyxVQUFVLFNBQVZBLE9BQVU7QUFBQSxRQUNaSixJQURZLFFBQ1pBLElBRFk7QUFBQSxRQUVaSyxPQUZZLFFBRVpBLE9BRlk7QUFBQSxRQUdaSixpQkFIWSxRQUdaQSxpQkFIWTtBQUFBLFFBSVpLLFFBSlksUUFJWkEsUUFKWTtBQUFBLFFBS1pDLFdBTFksUUFLWkEsV0FMWTtBQUFBLFFBTVpDLGVBTlksUUFNWkEsZUFOWTtBQUFBLFFBT1pDLG1CQVBZLFFBT1pBLG1CQVBZO0FBQUEsV0FTWjtBQUFBO0FBQUEsVUFBSyxXQUFVLGFBQWY7QUFDS1YsZ0JBQVFDLElBQVIsRUFBY0MsaUJBQWQsSUFDSztBQUFBO0FBQUEsY0FBSyxXQUFVLFlBQWY7QUFDRSxnQ0FBQyxVQUFEO0FBQ0ksc0JBQU1ELElBRFY7QUFFSSxxQ0FBcUJTLG1CQUZ6QjtBQUdJLDJCQUFXUixrQkFBa0JTLGFBQWxCLEtBQW9DO0FBSG5ELGNBREY7QUFNRSxnQ0FBQyxXQUFELElBQWEsU0FBU1Qsa0JBQWtCUyxhQUF4QztBQU5GLFNBREwsR0FTSztBQUFBO0FBQUEsY0FBSyxXQUFVLGVBQWY7QUFDRSxnQ0FBQyxRQUFEO0FBQ0kseUJBQVNMLE9BRGI7QUFFSSx1QkFBT0osa0JBQWtCQyxLQUY3QjtBQUdJLDBCQUFVSSxRQUhkO0FBSUksNkJBQWFDLFdBSmpCO0FBS0ksaUNBQWlCQyxlQUxyQjtBQU1JLHFDQUFxQkMsbUJBTnpCO0FBT0ksMkJBQVdSLGtCQUFrQlMsYUFBbEIsS0FBb0M7QUFQbkQsY0FERjtBQVVFLGdDQUFDLFdBQUQsSUFBYSxTQUFTVCxrQkFBa0JTLGFBQXhDO0FBVkY7QUFWVixLQVRZO0FBQUEsQ0FBaEI7O0FBaUNBLGVBQWVOLE9BQWYiLCJmaWxlIjoiQ29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBGaWxlIHBpY2tlciBoZWFkZXIgYW5kIGxpc3QgY29tcG9uZW50XHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEl0ZW1MaXN0IGZyb20gJy4vSXRlbUxpc3QnO1xyXG5pbXBvcnQgRW1wdHlTdGF0ZSBmcm9tICcuLi9FbXB0eVN0YXRlJztcclxuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJy4uL1Byb2dyZXNzQmFyJztcclxuaW1wb3J0IHsgVklFV19FUlJPUiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB0eXBlIHsgVmlldywgQ29sbGVjdGlvbiB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcbmltcG9ydCAnLi9Db250ZW50LnNjc3MnO1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICAgIHZpZXc6IFZpZXcsXHJcbiAgICBpc1NtYWxsOiBib29sZWFuLFxyXG4gICAgdGFibGVSZWY6IEZ1bmN0aW9uLFxyXG4gICAgb25JdGVtQ2xpY2s6IEZ1bmN0aW9uLFxyXG4gICAgb25FeHBhbmRlckNsaWNrOiBGdW5jdGlvbixcclxuICAgIGdldExvY2FsaXplZE1lc3NhZ2U6IEZ1bmN0aW9uLFxyXG4gICAgY3VycmVudENvbGxlY3Rpb246IENvbGxlY3Rpb25cclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZXRlcm1pbmVzIGlmIHdlIHNob3VsZCBzaG93IHRoZSBlbXB0eSBzdGF0ZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdmlldyB0aGUgY3VycmVudCB2aWV3XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjdXJyZW50Q29sbGVjdGlvbiB0aGUgY3VycmVudCBjb2xsZWN0aW9uXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IGVtcHR5IG9yIG5vdFxyXG4gKi9cclxuZnVuY3Rpb24gaXNFbXB0eSh2aWV3OiBWaWV3LCBjdXJyZW50Q29sbGVjdGlvbjogQ29sbGVjdGlvbik6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgeyBpdGVtcyA9IFtdIH0gPSBjdXJyZW50Q29sbGVjdGlvbjtcclxuICAgIHJldHVybiB2aWV3ID09PSBWSUVXX0VSUk9SIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMDtcclxufVxyXG5cclxuY29uc3QgQ29udGVudCA9ICh7XHJcbiAgICB2aWV3LFxyXG4gICAgaXNTbWFsbCxcclxuICAgIGN1cnJlbnRDb2xsZWN0aW9uLFxyXG4gICAgdGFibGVSZWYsXHJcbiAgICBvbkl0ZW1DbGljayxcclxuICAgIG9uRXhwYW5kZXJDbGljayxcclxuICAgIGdldExvY2FsaXplZE1lc3NhZ2VcclxufTogUHJvcHMpID0+XHJcbiAgICA8ZGl2IGNsYXNzTmFtZT0nYmN0LWNvbnRlbnQnPlxyXG4gICAgICAgIHtpc0VtcHR5KHZpZXcsIGN1cnJlbnRDb2xsZWN0aW9uKVxyXG4gICAgICAgICAgICA/IDxkaXYgY2xhc3NOYW1lPSdidWlrLWVtcHR5Jz5cclxuICAgICAgICAgICAgICAgIDxFbXB0eVN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgdmlldz17dmlld31cclxuICAgICAgICAgICAgICAgICAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlPXtnZXRMb2NhbGl6ZWRNZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZz17Y3VycmVudENvbGxlY3Rpb24ucGVyY2VudExvYWRlZCAhPT0gMTAwfVxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPFByb2dyZXNzQmFyIHBlcmNlbnQ9e2N1cnJlbnRDb2xsZWN0aW9uLnBlcmNlbnRMb2FkZWR9IC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA6IDxkaXYgY2xhc3NOYW1lPSdiY3QtaXRlbS1saXN0Jz5cclxuICAgICAgICAgICAgICAgIDxJdGVtTGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIGlzU21hbGw9e2lzU21hbGx9XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2N1cnJlbnRDb2xsZWN0aW9uLml0ZW1zfVxyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlUmVmPXt0YWJsZVJlZn1cclxuICAgICAgICAgICAgICAgICAgICBvbkl0ZW1DbGljaz17b25JdGVtQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgb25FeHBhbmRlckNsaWNrPXtvbkV4cGFuZGVyQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0TG9jYWxpemVkTWVzc2FnZT17Z2V0TG9jYWxpemVkTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmc9e2N1cnJlbnRDb2xsZWN0aW9uLnBlcmNlbnRMb2FkZWQgIT09IDEwMH1cclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxQcm9ncmVzc0JhciBwZXJjZW50PXtjdXJyZW50Q29sbGVjdGlvbi5wZXJjZW50TG9hZGVkfSAvPlxyXG4gICAgICAgICAgICA8L2Rpdj59XHJcbiAgICA8L2Rpdj47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250ZW50O1xyXG4iXX0=