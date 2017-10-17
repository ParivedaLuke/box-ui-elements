/**
 * 
 * @file Content sub header component
 * @author Box
 */

import React from 'react';
import Sort from './Sort';
import Add from './Add';
import { VIEW_SEARCH, VIEW_FOLDER, VIEW_RECENTS } from '../../constants';


var SubHeaderRight = function SubHeaderRight(_ref) {
    var view = _ref.view,
        onUpload = _ref.onUpload,
        onCreate = _ref.onCreate,
        canUpload = _ref.canUpload,
        currentCollection = _ref.currentCollection,
        onSortChange = _ref.onSortChange,
        getLocalizedMessage = _ref.getLocalizedMessage;
    var sortBy = currentCollection.sortBy,
        sortDirection = currentCollection.sortDirection,
        percentLoaded = currentCollection.percentLoaded,
        _currentCollection$it = currentCollection.items,
        items = _currentCollection$it === undefined ? [] : _currentCollection$it;

    var isRecents = view === VIEW_RECENTS;
    var isFolder = view === VIEW_FOLDER;
    var isSearch = view === VIEW_SEARCH;
    var showSort = (isRecents || isFolder || isSearch) && items.length > 0;
    var showAdd = !!canUpload && isFolder;
    var isLoaded = percentLoaded === 100;

    return React.createElement(
        'div',
        { className: 'buik-sub-header-right' },
        showSort && !!sortBy && !!sortDirection && React.createElement(Sort, {
            isRecents: isRecents,
            isLoaded: isLoaded,
            sortBy: sortBy,
            sortDirection: sortDirection,
            onSortChange: onSortChange,
            getLocalizedMessage: getLocalizedMessage
        }),
        showAdd && React.createElement(Add, {
            onUpload: onUpload,
            onCreate: onCreate,
            isDisabled: !isFolder,
            isLoaded: isLoaded,
            getLocalizedMessage: getLocalizedMessage
        })
    );
};

export default SubHeaderRight;