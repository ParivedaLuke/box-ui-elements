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