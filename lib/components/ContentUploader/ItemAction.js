/**
 * 
 * @file Item action component
 */

import React from 'react';
import IconCross from '../icons/IconCross';
import IconCheck from '../icons/IconCheck';
import IconRetry from '../icons/IconRetry';
import { PlainButton } from '../Button';
import { STATUS_PENDING, STATUS_IN_PROGRESS, STATUS_COMPLETE, STATUS_ERROR } from '../../constants';


var ItemAction = function ItemAction(_ref) {
    var status = _ref.status,
        onClick = _ref.onClick,
        getLocalizedMessage = _ref.getLocalizedMessage;

    var icon = void 0;
    switch (status) {
        case STATUS_COMPLETE:
            icon = React.createElement(IconCheck, null);
            break;
        case STATUS_ERROR:
            icon = React.createElement(IconRetry, null);
            break;
        case STATUS_PENDING:
        case STATUS_IN_PROGRESS:
        default:
            icon = React.createElement(IconCross, null);
            break;
    }

    return React.createElement(
        'div',
        { className: 'bcu-item-action' },
        React.createElement(
            PlainButton,
            { onClick: onClick, title: getLocalizedMessage('buik.action.button.' + status) },
            icon
        )
    );
};

export default ItemAction;