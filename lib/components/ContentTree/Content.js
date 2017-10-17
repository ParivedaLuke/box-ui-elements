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