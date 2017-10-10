/**
 * 
 * @file Header bar
 * @author Box
 */

import React from 'react';
import Logo from './Logo';
import { VIEW_FOLDER, VIEW_SEARCH } from '../../constants';


var Header = function Header(_ref) {
    var view = _ref.view,
        isSmall = _ref.isSmall,
        searchQuery = _ref.searchQuery,
        onSearch = _ref.onSearch,
        logoUrl = _ref.logoUrl,
        getLocalizedMessage = _ref.getLocalizedMessage;

    var search = function search(_ref2) {
        var currentTarget = _ref2.currentTarget;
        return onSearch(currentTarget.value);
    };
    var isFolder = view === VIEW_FOLDER;
    var isSearch = view === VIEW_SEARCH;
    return React.createElement(
        'div',
        { className: 'buik-header' },
        React.createElement(Logo, { url: logoUrl, isSmall: isSmall }),
        React.createElement(
            'div',
            { className: 'buik-search' },
            React.createElement('input', {
                type: 'search',
                disabled: !isFolder && !isSearch,
                placeholder: getLocalizedMessage('buik.header.search.placeholder'),
                value: searchQuery,
                onChange: search
            })
        )
    );
};

export default Header;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhlYWRlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkxvZ28iLCJWSUVXX0ZPTERFUiIsIlZJRVdfU0VBUkNIIiwiSGVhZGVyIiwidmlldyIsImlzU21hbGwiLCJzZWFyY2hRdWVyeSIsIm9uU2VhcmNoIiwibG9nb1VybCIsImdldExvY2FsaXplZE1lc3NhZ2UiLCJzZWFyY2giLCJjdXJyZW50VGFyZ2V0IiwidmFsdWUiLCJpc0ZvbGRlciIsImlzU2VhcmNoIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLElBQVAsTUFBaUIsUUFBakI7QUFDQSxTQUFTQyxXQUFULEVBQXNCQyxXQUF0QixRQUF5QyxpQkFBekM7OztBQWFBLElBQU1DLFNBQVMsU0FBVEEsTUFBUyxPQUFtRjtBQUFBLFFBQWhGQyxJQUFnRixRQUFoRkEsSUFBZ0Y7QUFBQSxRQUExRUMsT0FBMEUsUUFBMUVBLE9BQTBFO0FBQUEsUUFBakVDLFdBQWlFLFFBQWpFQSxXQUFpRTtBQUFBLFFBQXBEQyxRQUFvRCxRQUFwREEsUUFBb0Q7QUFBQSxRQUExQ0MsT0FBMEMsUUFBMUNBLE9BQTBDO0FBQUEsUUFBakNDLG1CQUFpQyxRQUFqQ0EsbUJBQWlDOztBQUM5RixRQUFNQyxTQUFTLFNBQVRBLE1BQVM7QUFBQSxZQUFHQyxhQUFILFNBQUdBLGFBQUg7QUFBQSxlQUE0REosU0FBU0ksY0FBY0MsS0FBdkIsQ0FBNUQ7QUFBQSxLQUFmO0FBQ0EsUUFBTUMsV0FBV1QsU0FBU0gsV0FBMUI7QUFDQSxRQUFNYSxXQUFXVixTQUFTRixXQUExQjtBQUNBLFdBQ0k7QUFBQTtBQUFBLFVBQUssV0FBVSxhQUFmO0FBQ0ksNEJBQUMsSUFBRCxJQUFNLEtBQUtNLE9BQVgsRUFBb0IsU0FBU0gsT0FBN0IsR0FESjtBQUVJO0FBQUE7QUFBQSxjQUFLLFdBQVUsYUFBZjtBQUNJO0FBQ0ksc0JBQUssUUFEVDtBQUVJLDBCQUFVLENBQUNRLFFBQUQsSUFBYSxDQUFDQyxRQUY1QjtBQUdJLDZCQUFhTCxvQkFBb0IsZ0NBQXBCLENBSGpCO0FBSUksdUJBQU9ILFdBSlg7QUFLSSwwQkFBVUk7QUFMZDtBQURKO0FBRkosS0FESjtBQWNILENBbEJEOztBQW9CQSxlQUFlUCxNQUFmIiwiZmlsZSI6IkhlYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBIZWFkZXIgYmFyXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IExvZ28gZnJvbSAnLi9Mb2dvJztcclxuaW1wb3J0IHsgVklFV19GT0xERVIsIFZJRVdfU0VBUkNIIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHR5cGUgeyBWaWV3IH0gZnJvbSAnLi4vLi4vZmxvd1R5cGVzJztcclxuaW1wb3J0ICcuL0hlYWRlci5zY3NzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBzZWFyY2hRdWVyeTogc3RyaW5nLFxyXG4gICAgb25TZWFyY2g6IEZ1bmN0aW9uLFxyXG4gICAgbG9nb1VybD86IHN0cmluZyxcclxuICAgIGlzU21hbGw6IGJvb2xlYW4sXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlOiBGdW5jdGlvbixcclxuICAgIHZpZXc6IFZpZXdcclxufTtcclxuXHJcbmNvbnN0IEhlYWRlciA9ICh7IHZpZXcsIGlzU21hbGwsIHNlYXJjaFF1ZXJ5LCBvblNlYXJjaCwgbG9nb1VybCwgZ2V0TG9jYWxpemVkTWVzc2FnZSB9OiBQcm9wcykgPT4ge1xyXG4gICAgY29uc3Qgc2VhcmNoID0gKHsgY3VycmVudFRhcmdldCB9OiB7IGN1cnJlbnRUYXJnZXQ6IEhUTUxJbnB1dEVsZW1lbnQgfSkgPT4gb25TZWFyY2goY3VycmVudFRhcmdldC52YWx1ZSk7XHJcbiAgICBjb25zdCBpc0ZvbGRlciA9IHZpZXcgPT09IFZJRVdfRk9MREVSO1xyXG4gICAgY29uc3QgaXNTZWFyY2ggPSB2aWV3ID09PSBWSUVXX1NFQVJDSDtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2J1aWstaGVhZGVyJz5cclxuICAgICAgICAgICAgPExvZ28gdXJsPXtsb2dvVXJsfSBpc1NtYWxsPXtpc1NtYWxsfSAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYnVpay1zZWFyY2gnPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT0nc2VhcmNoJ1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaXNGb2xkZXIgJiYgIWlzU2VhcmNofVxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLmhlYWRlci5zZWFyY2gucGxhY2Vob2xkZXInKX1cclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNoUXVlcnl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3NlYXJjaH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjtcclxuIl19