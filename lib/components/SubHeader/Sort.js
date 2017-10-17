/**
 * 
 * @file Content sub header component
 * @author Box
 */

import React from 'react';
import { SORT_ASC, SORT_DESC, SORT_NAME, SORT_DATE, SORT_SIZE, FIELD_NAME, FIELD_MODIFIED_AT, FIELD_INTERACTED_AT, FIELD_SIZE } from '../../constants';
import DropdownMenu from '../DropdownMenu';
import { Menu, MenuItem } from '../Menu';
import { Button } from '../Button';
import IconSort from '../icons/IconSort';
import IconCheck from '../icons/IconCheck';


function getMenuItem(sort, by, direction, sortBy, sortDirection, onSortChange, getLocalizedMessage) {
    var isSame = by === sortBy && direction === sortDirection;
    return React.createElement(
        MenuItem,
        { onClick: function onClick() {
                return onSortChange(by, direction);
            } },
        React.createElement(
            'div',
            { className: 'buik-sort-selected' },
            isSame ? React.createElement(IconCheck, { width: 12, height: 10 }) : null
        ),
        getLocalizedMessage('buik.sort.option.' + sort + '.' + direction.toLowerCase())
    );
}

var Sort = function Sort(_ref) {
    var isRecents = _ref.isRecents,
        isLoaded = _ref.isLoaded,
        sortBy = _ref.sortBy,
        sortDirection = _ref.sortDirection,
        onSortChange = _ref.onSortChange,
        getLocalizedMessage = _ref.getLocalizedMessage;
    return React.createElement(
        DropdownMenu,
        { isRightAligned: true, constrainToScrollParent: true },
        React.createElement(
            Button,
            { isDisabled: !isLoaded, className: 'buik-sort-btn' },
            React.createElement(IconSort, null)
        ),
        React.createElement(
            Menu,
            { className: 'buik-sort' },
            getMenuItem(SORT_NAME, FIELD_NAME, SORT_ASC, sortBy, sortDirection, onSortChange, getLocalizedMessage),
            getMenuItem(SORT_NAME, FIELD_NAME, SORT_DESC, sortBy, sortDirection, onSortChange, getLocalizedMessage),
            getMenuItem(SORT_DATE, isRecents ? FIELD_INTERACTED_AT : FIELD_MODIFIED_AT, SORT_ASC, sortBy, sortDirection, onSortChange, getLocalizedMessage),
            getMenuItem(SORT_DATE, isRecents ? FIELD_INTERACTED_AT : FIELD_MODIFIED_AT, SORT_DESC, sortBy, sortDirection, onSortChange, getLocalizedMessage),
            getMenuItem(SORT_SIZE, FIELD_SIZE, SORT_ASC, sortBy, sortDirection, onSortChange, getLocalizedMessage),
            getMenuItem(SORT_SIZE, FIELD_SIZE, SORT_DESC, sortBy, sortDirection, onSortChange, getLocalizedMessage)
        )
    );
};

export default Sort;