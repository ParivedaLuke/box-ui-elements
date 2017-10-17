/**
 * 
 * @file Component for the details for the item name
 * @author Box
 */

import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import { DELIMITER_SLASH } from '../../constants';


var InlineBreadcrumbs = function InlineBreadcrumbs(_ref) {
    var rootId = _ref.rootId,
        item = _ref.item,
        onItemClick = _ref.onItemClick,
        getLocalizedMessage = _ref.getLocalizedMessage;
    var path_collection = item.path_collection;

    var _ref2 = path_collection || {},
        _ref2$entries = _ref2.entries,
        breadcrumbs = _ref2$entries === undefined ? [] : _ref2$entries;

    return React.createElement(
        'span',
        { className: 'buik-inline-breadcrumbs' },
        getLocalizedMessage('buik.folder.path.prefix'),
        '\xA0',
        React.createElement(Breadcrumbs, { rootId: rootId, crumbs: breadcrumbs, onCrumbClick: onItemClick, delimiter: DELIMITER_SLASH })
    );
};

export default InlineBreadcrumbs;