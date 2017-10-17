/**
 * 
 * @file Component for the details for the item name
 * @author Box
 */

import React from 'react';
import { InlineBreadcrumbs } from '../Breadcrumbs';
import { VIEW_SEARCH, VIEW_SELECTED } from '../../constants';
import ItemSubDetails from './ItemSubDetails';


var ItemDetails = function ItemDetails(_ref) {
    var view = _ref.view,
        rootId = _ref.rootId,
        item = _ref.item,
        onItemClick = _ref.onItemClick,
        getLocalizedMessage = _ref.getLocalizedMessage;
    return React.createElement(
        'div',
        { className: 'buik-item-details' },
        view === VIEW_SELECTED || view === VIEW_SEARCH ? React.createElement(InlineBreadcrumbs, {
            rootId: rootId,
            item: item,
            onItemClick: onItemClick,
            getLocalizedMessage: getLocalizedMessage
        }) : React.createElement(ItemSubDetails, { view: view, item: item, getLocalizedMessage: getLocalizedMessage })
    );
};

export default ItemDetails;