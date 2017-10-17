/**
 * 
 * @file Content sub header component
 * @author Box
 */

import React from 'react';
import DropdownMenu from '../DropdownMenu';
import { Menu, MenuItem } from '../Menu';
import { Button } from '../Button';
import IconPlus from '../icons/IconPlus';


var Add = function Add(_ref) {
    var onUpload = _ref.onUpload,
        onCreate = _ref.onCreate,
        isLoaded = _ref.isLoaded,
        getLocalizedMessage = _ref.getLocalizedMessage;
    return React.createElement(
        DropdownMenu,
        { isRightAligned: true, constrainToScrollParent: true },
        React.createElement(
            Button,
            { className: 'buik-btn-add', isDisabled: !isLoaded },
            React.createElement(IconPlus, null)
        ),
        React.createElement(
            Menu,
            { className: 'buik-sort' },
            React.createElement(
                MenuItem,
                { onClick: onUpload },
                getLocalizedMessage('buik.header.button.upload')
            ),
            React.createElement(
                MenuItem,
                { onClick: onCreate },
                getLocalizedMessage('buik.header.button.create')
            )
        )
    );
};

export default Add;