/**
 * 
 * @file Preview header component
 * @author Box
 */

import React from 'react';
import { PlainButton } from '../Button';
import IconCross from '../icons/IconCross';
import { getIcon } from '../Item/iconCellRenderer';


var Header = function Header(_ref) {
    var file = _ref.file,
        onClose = _ref.onClose,
        getLocalizedMessage = _ref.getLocalizedMessage;

    var name = file ? file.name : '';
    var close = getLocalizedMessage('buik.modal.dialog.share.button.close');
    return React.createElement(
        'div',
        { className: 'bcpr-header' },
        React.createElement(
            'div',
            { className: 'bcpr-name' },
            file ? getIcon(24, file) : null,
            React.createElement(
                'span',
                null,
                name
            )
        ),
        React.createElement(
            'div',
            { className: 'bcpr-btns' },
            onClose && React.createElement(
                PlainButton,
                { className: 'bcpr-btn', onClick: onClose, title: close, 'aria-label': close },
                React.createElement(IconCross, { color: '#777', width: 14, height: 14 })
            )
        )
    );
};

export default Header;