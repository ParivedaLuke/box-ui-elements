/**
 * 
 * @file Upload state component
 */

import classNames from 'classnames';
import React from 'react';
import IconErrorEmptyState from '../icons/states/IconErrorEmptyState';
import IconUploadStartState from '../icons/states/IconUploadStartState';
import IconUploadSuccessState from '../icons/states/IconUploadSuccessState';
import UploadStateContent from './UploadStateContent';
import { VIEW_ERROR, VIEW_UPLOAD_EMPTY, VIEW_UPLOAD_IN_PROGRESS, VIEW_UPLOAD_SUCCESS } from '../../constants';


var UploadState = function UploadState(_ref) {
    var canDrop = _ref.canDrop,
        getLocalizedMessage = _ref.getLocalizedMessage,
        hasItems = _ref.hasItems,
        isOver = _ref.isOver,
        isTouch = _ref.isTouch,
        view = _ref.view,
        onSelect = _ref.onSelect;

    var icon = void 0;
    var content = void 0;
    /* eslint-disable jsx-a11y/label-has-for */
    switch (view) {
        case VIEW_ERROR:
            icon = React.createElement(IconErrorEmptyState, null);
            content = React.createElement(UploadStateContent, { message: getLocalizedMessage('buik.upload.state.error') });
            break;
        case VIEW_UPLOAD_EMPTY:
            icon = React.createElement(IconUploadStartState, null);
            /* eslint-disable no-nested-ternary */
            content = canDrop && hasItems ? React.createElement(UploadStateContent, { message: getLocalizedMessage('buik.upload.state.inprogress') }) : isTouch ? React.createElement(UploadStateContent, {
                inputLabel: getLocalizedMessage('buik.upload.state.empty.input.nodragdrop'),
                useButton: true,
                onChange: onSelect
            }) : React.createElement(UploadStateContent, {
                inputLabel: getLocalizedMessage('buik.upload.state.empty.input'),
                message: getLocalizedMessage('buik.upload.state.empty'),
                onChange: onSelect
            });
            /* eslint-enable no-nested-ternary */
            break;
        case VIEW_UPLOAD_IN_PROGRESS:
            icon = React.createElement(IconUploadStartState, null);
            content = React.createElement(UploadStateContent, { message: getLocalizedMessage('buik.upload.state.inprogress') });
            break;
        case VIEW_UPLOAD_SUCCESS:
            icon = React.createElement(IconUploadSuccessState, null);
            content = React.createElement(UploadStateContent, {
                inputLabel: getLocalizedMessage('buik.upload.state.success.input'),
                message: getLocalizedMessage('buik.upload.state.success'),
                useButton: isTouch,
                onChange: onSelect
            });
            break;
        default:
            break;
        /* eslint-enable jsx-a11y/label-has-for */
    }

    var className = classNames('bcu-upload-state', {
        'bcu-is-droppable': isOver && canDrop,
        'bcu-is-not-droppable': isOver && !canDrop,
        'bcu-has-items': hasItems
    });

    return React.createElement(
        'div',
        { className: className },
        React.createElement(
            'div',
            null,
            icon,
            content
        ),
        React.createElement('div', { className: 'bcu-drag-drop-overlay' })
    );
};

export default UploadState;