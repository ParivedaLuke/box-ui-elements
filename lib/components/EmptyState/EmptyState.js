/**
 * 
 * @file Empty state component
 * @author Box
 */

import React from 'react';
import IconErrorEmptyState from '../icons/states/IconErrorEmptyState';
import IconFolderEmptyState from '../icons/states/IconFolderEmptyState';
import IconSelectedItemsEmptyState from '../icons/states/IconSelectedItemsEmptyState';
import IconSearchEmptyState from '../icons/states/IconSearchEmptyState';
import { VIEW_ERROR, VIEW_FOLDER, VIEW_SEARCH, VIEW_SELECTED } from '../../constants';


var EmptyState = function EmptyState(_ref) {
    var view = _ref.view,
        isLoading = _ref.isLoading,
        getLocalizedMessage = _ref.getLocalizedMessage;

    var type = void 0;
    var message = isLoading && view === VIEW_FOLDER ? getLocalizedMessage('buik.empty.state.folder.loading') : getLocalizedMessage('buik.empty.state.' + view);

    switch (view) {
        case VIEW_ERROR:
            type = React.createElement(IconErrorEmptyState, null);
            break;
        case VIEW_SELECTED:
            type = React.createElement(IconSelectedItemsEmptyState, null);
            break;
        case VIEW_SEARCH:
            type = React.createElement(IconSearchEmptyState, null);
            break;
        default:
            type = React.createElement(IconFolderEmptyState, null);
            break;
    }
    return React.createElement(
        'div',
        { className: 'buik-empty' },
        type,
        React.createElement(
            'div',
            null,
            message
        )
    );
};

export default EmptyState;