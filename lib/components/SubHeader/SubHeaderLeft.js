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