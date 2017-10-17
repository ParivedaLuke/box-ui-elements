/**
 * 
 * @file Function to render the name table cell
 * @author Box
 */

import React from 'react';
import ItemName from './ItemName';
import ItemDetails from './ItemDetails';
import { VIEW_SEARCH } from '../../constants';


export default (function (rootId, getLocalizedMessage, view, onItemClick, onItemSelect) {
    var canPreview = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var showDetails = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
    var isTouch = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
    return function (_ref) {
        var rowData = _ref.rowData;
        return React.createElement(
            'div',
            { className: 'buik-item-name' },
            React.createElement(ItemName, {
                isTouch: isTouch,
                item: rowData,
                canPreview: canPreview,
                onClick: onItemClick,
                onFocus: onItemSelect
            }),
            view === VIEW_SEARCH || showDetails ? React.createElement(ItemDetails, {
                item: rowData,
                view: view,
                rootId: rootId,
                onItemClick: onItemClick,
                getLocalizedMessage: getLocalizedMessage
            }) : null
        );
    };
});