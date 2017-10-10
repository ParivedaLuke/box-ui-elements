/**
 * 
 * @file Content sub header component
 * @author Box
 */

import React from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import { VIEW_SEARCH, VIEW_FOLDER, VIEW_RECENTS, DELIMITER_CARET } from '../../constants';


var SubHeaderLeft = function SubHeaderLeft(_ref) {
    var view = _ref.view,
        isSmall = _ref.isSmall,
        rootId = _ref.rootId,
        rootName = _ref.rootName,
        currentCollection = _ref.currentCollection,
        onItemClick = _ref.onItemClick,
        getLocalizedMessage = _ref.getLocalizedMessage;

    var crumbs = void 0;

    if (view === VIEW_FOLDER || view === VIEW_SEARCH) {
        var id = currentCollection.id,
            _currentCollection$na = currentCollection.name,
            name = _currentCollection$na === undefined ? '' : _currentCollection$na,
            _currentCollection$br = currentCollection.breadcrumbs,
            breadcrumbs = _currentCollection$br === undefined ? [] : _currentCollection$br;

        crumbs = breadcrumbs.concat({ id: id, name: name });

        // Search results are specific to the current folder
        // hence the breadcrumb is added to the end of the list
        if (view === VIEW_SEARCH) {
            crumbs = crumbs.concat({
                id: undefined,
                name: getLocalizedMessage('buik.folder.name.search')
            });
        }
    } else {
        crumbs = [{
            id: undefined,
            name: getLocalizedMessage('buik.folder.name.' + view)
        }];

        if (view !== VIEW_RECENTS) {
            crumbs.unshift({
                id: rootId,
                name: rootName || getLocalizedMessage('buik.folder.name.root')
            });
        }
    }

    return React.createElement(Breadcrumbs, {
        isSmall: isSmall,
        rootId: rootId,
        crumbs: crumbs,
        onCrumbClick: onItemClick,
        delimiter: DELIMITER_CARET
    });
};

export default SubHeaderLeft;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN1YkhlYWRlckxlZnQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJCcmVhZGNydW1icyIsIlZJRVdfU0VBUkNIIiwiVklFV19GT0xERVIiLCJWSUVXX1JFQ0VOVFMiLCJERUxJTUlURVJfQ0FSRVQiLCJTdWJIZWFkZXJMZWZ0IiwidmlldyIsImlzU21hbGwiLCJyb290SWQiLCJyb290TmFtZSIsImN1cnJlbnRDb2xsZWN0aW9uIiwib25JdGVtQ2xpY2siLCJnZXRMb2NhbGl6ZWRNZXNzYWdlIiwiY3J1bWJzIiwiaWQiLCJuYW1lIiwiYnJlYWRjcnVtYnMiLCJjb25jYXQiLCJ1bmRlZmluZWQiLCJ1bnNoaWZ0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLFNBQVNDLFdBQVQsUUFBNEIsZ0JBQTVCO0FBQ0EsU0FBU0MsV0FBVCxFQUFzQkMsV0FBdEIsRUFBbUNDLFlBQW5DLEVBQWlEQyxlQUFqRCxRQUF3RSxpQkFBeEU7OztBQWFBLElBQU1DLGdCQUFnQixTQUFoQkEsYUFBZ0IsT0FRVDtBQUFBLFFBUFRDLElBT1MsUUFQVEEsSUFPUztBQUFBLFFBTlRDLE9BTVMsUUFOVEEsT0FNUztBQUFBLFFBTFRDLE1BS1MsUUFMVEEsTUFLUztBQUFBLFFBSlRDLFFBSVMsUUFKVEEsUUFJUztBQUFBLFFBSFRDLGlCQUdTLFFBSFRBLGlCQUdTO0FBQUEsUUFGVEMsV0FFUyxRQUZUQSxXQUVTO0FBQUEsUUFEVEMsbUJBQ1MsUUFEVEEsbUJBQ1M7O0FBQ1QsUUFBSUMsZUFBSjs7QUFFQSxRQUFJUCxTQUFTSixXQUFULElBQXdCSSxTQUFTTCxXQUFyQyxFQUFrRDtBQUFBLFlBQ3RDYSxFQURzQyxHQUNGSixpQkFERSxDQUN0Q0ksRUFEc0M7QUFBQSxvQ0FDRkosaUJBREUsQ0FDbENLLElBRGtDO0FBQUEsWUFDbENBLElBRGtDLHlDQUMzQixFQUQyQjtBQUFBLG9DQUNGTCxpQkFERSxDQUN2Qk0sV0FEdUI7QUFBQSxZQUN2QkEsV0FEdUIseUNBQ1QsRUFEUzs7QUFFOUNILGlCQUFTRyxZQUFZQyxNQUFaLENBQW1CLEVBQUVILE1BQUYsRUFBTUMsVUFBTixFQUFuQixDQUFUOztBQUVBO0FBQ0E7QUFDQSxZQUFJVCxTQUFTTCxXQUFiLEVBQTBCO0FBQ3RCWSxxQkFBU0EsT0FBT0ksTUFBUCxDQUFjO0FBQ25CSCxvQkFBSUksU0FEZTtBQUVuQkgsc0JBQU1ILG9CQUFvQix5QkFBcEI7QUFGYSxhQUFkLENBQVQ7QUFJSDtBQUNKLEtBWkQsTUFZTztBQUNIQyxpQkFBUyxDQUNMO0FBQ0lDLGdCQUFJSSxTQURSO0FBRUlILGtCQUFNSCwwQ0FBd0NOLElBQXhDO0FBRlYsU0FESyxDQUFUOztBQU9BLFlBQUlBLFNBQVNILFlBQWIsRUFBMkI7QUFDdkJVLG1CQUFPTSxPQUFQLENBQWU7QUFDWEwsb0JBQUlOLE1BRE87QUFFWE8sc0JBQU1OLFlBQVlHLG9CQUFvQix1QkFBcEI7QUFGUCxhQUFmO0FBSUg7QUFDSjs7QUFFRCxXQUNJLG9CQUFDLFdBQUQ7QUFDSSxpQkFBU0wsT0FEYjtBQUVJLGdCQUFRQyxNQUZaO0FBR0ksZ0JBQVFLLE1BSFo7QUFJSSxzQkFBY0YsV0FKbEI7QUFLSSxtQkFBV1A7QUFMZixNQURKO0FBU0gsQ0FoREQ7O0FBa0RBLGVBQWVDLGFBQWYiLCJmaWxlIjoiU3ViSGVhZGVyTGVmdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBDb250ZW50IHN1YiBoZWFkZXIgY29tcG9uZW50XHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQnJlYWRjcnVtYnMgfSBmcm9tICcuLi9CcmVhZGNydW1icyc7XHJcbmltcG9ydCB7IFZJRVdfU0VBUkNILCBWSUVXX0ZPTERFUiwgVklFV19SRUNFTlRTLCBERUxJTUlURVJfQ0FSRVQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgdHlwZSB7IFZpZXcsIENvbGxlY3Rpb24gfSBmcm9tICcuLi8uLi9mbG93VHlwZXMnO1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICAgIHJvb3RJZDogc3RyaW5nLFxyXG4gICAgcm9vdE5hbWU/OiBzdHJpbmcsXHJcbiAgICBvbkl0ZW1DbGljazogRnVuY3Rpb24sXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlOiBGdW5jdGlvbixcclxuICAgIGN1cnJlbnRDb2xsZWN0aW9uOiBDb2xsZWN0aW9uLFxyXG4gICAgdmlldzogVmlldyxcclxuICAgIGlzU21hbGw6IGJvb2xlYW5cclxufTtcclxuXHJcbmNvbnN0IFN1YkhlYWRlckxlZnQgPSAoe1xyXG4gICAgdmlldyxcclxuICAgIGlzU21hbGwsXHJcbiAgICByb290SWQsXHJcbiAgICByb290TmFtZSxcclxuICAgIGN1cnJlbnRDb2xsZWN0aW9uLFxyXG4gICAgb25JdGVtQ2xpY2ssXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlXHJcbn06IFByb3BzKSA9PiB7XHJcbiAgICBsZXQgY3J1bWJzO1xyXG5cclxuICAgIGlmICh2aWV3ID09PSBWSUVXX0ZPTERFUiB8fCB2aWV3ID09PSBWSUVXX1NFQVJDSCkge1xyXG4gICAgICAgIGNvbnN0IHsgaWQsIG5hbWUgPSAnJywgYnJlYWRjcnVtYnMgPSBbXSB9ID0gY3VycmVudENvbGxlY3Rpb247XHJcbiAgICAgICAgY3J1bWJzID0gYnJlYWRjcnVtYnMuY29uY2F0KHsgaWQsIG5hbWUgfSk7XHJcblxyXG4gICAgICAgIC8vIFNlYXJjaCByZXN1bHRzIGFyZSBzcGVjaWZpYyB0byB0aGUgY3VycmVudCBmb2xkZXJcclxuICAgICAgICAvLyBoZW5jZSB0aGUgYnJlYWRjcnVtYiBpcyBhZGRlZCB0byB0aGUgZW5kIG9mIHRoZSBsaXN0XHJcbiAgICAgICAgaWYgKHZpZXcgPT09IFZJRVdfU0VBUkNIKSB7XHJcbiAgICAgICAgICAgIGNydW1icyA9IGNydW1icy5jb25jYXQoe1xyXG4gICAgICAgICAgICAgICAgaWQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIG5hbWU6IGdldExvY2FsaXplZE1lc3NhZ2UoJ2J1aWsuZm9sZGVyLm5hbWUuc2VhcmNoJylcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjcnVtYnMgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBnZXRMb2NhbGl6ZWRNZXNzYWdlKGBidWlrLmZvbGRlci5uYW1lLiR7dmlld31gKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgaWYgKHZpZXcgIT09IFZJRVdfUkVDRU5UUykge1xyXG4gICAgICAgICAgICBjcnVtYnMudW5zaGlmdCh7XHJcbiAgICAgICAgICAgICAgICBpZDogcm9vdElkLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogcm9vdE5hbWUgfHwgZ2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5mb2xkZXIubmFtZS5yb290JylcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJyZWFkY3J1bWJzXHJcbiAgICAgICAgICAgIGlzU21hbGw9e2lzU21hbGx9XHJcbiAgICAgICAgICAgIHJvb3RJZD17cm9vdElkfVxyXG4gICAgICAgICAgICBjcnVtYnM9e2NydW1ic31cclxuICAgICAgICAgICAgb25DcnVtYkNsaWNrPXtvbkl0ZW1DbGlja31cclxuICAgICAgICAgICAgZGVsaW1pdGVyPXtERUxJTUlURVJfQ0FSRVR9XHJcbiAgICAgICAgLz5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdWJIZWFkZXJMZWZ0O1xyXG4iXX0=