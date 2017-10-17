/**
 * 
 * @file Content Explorer Rename Dialog
 * @author Box
 */

import React from 'react';
import Modal from 'react-modal';

import { Button, PrimaryButton } from '../Button';
import { CLASS_MODAL_CONTENT, CLASS_MODAL_OVERLAY, CLASS_MODAL, ERROR_CODE_ITEM_NAME_TOO_LONG, ERROR_CODE_ITEM_NAME_IN_USE } from '../../constants';

/* eslint-disable jsx-a11y/label-has-for */
var RenameDialog = function RenameDialog(_ref) {
    var isOpen = _ref.isOpen,
        onRename = _ref.onRename,
        onCancel = _ref.onCancel,
        item = _ref.item,
        getLocalizedMessage = _ref.getLocalizedMessage,
        isLoading = _ref.isLoading,
        errorCode = _ref.errorCode,
        parentElement = _ref.parentElement;

    var textInput = null;
    var error = '';

    var _item$name = item.name,
        name = _item$name === undefined ? '' : _item$name,
        extension = item.extension;

    var ext = extension ? '.' + extension : '';
    var nameWithoutExt = extension ? name.replace(ext, '') : name;

    /**
     * Appends the extension and calls rename function
     */
    var rename = function rename() {
        if (textInput && textInput.value) {
            if (textInput.value === nameWithoutExt) {
                onCancel();
            } else {
                onRename(textInput.value, ext);
            }
        }
    };

    /**
     * Grabs reference to the input element
     */
    var ref = function ref(input) {
        textInput = input;
        if (textInput instanceof HTMLInputElement) {
            textInput.focus();
            textInput.select();
        }
    };

    /**
     * Handles enter key down
     */
    var onKeyDown = function onKeyDown(_ref2) {
        var key = _ref2.key;

        switch (key) {
            case 'Enter':
                rename();
                break;
            default:
                break;
        }
    };

    switch (errorCode) {
        case ERROR_CODE_ITEM_NAME_IN_USE:
            error = getLocalizedMessage('buik.modal.rename.dialog.error.inuse');
            break;
        case ERROR_CODE_ITEM_NAME_TOO_LONG:
            error = getLocalizedMessage('buik.modal.rename.dialog.error.toolong');
            break;
        default:
            error = errorCode ? getLocalizedMessage('buik.modal.rename.dialog.error.invalid') : '';
            break;
    }

    return React.createElement(
        Modal,
        {
            isOpen: isOpen,
            parentSelector: function parentSelector() {
                return parentElement;
            },
            portalClassName: CLASS_MODAL + ' buik-modal-rename',
            className: CLASS_MODAL_CONTENT,
            overlayClassName: CLASS_MODAL_OVERLAY,
            onRequestClose: onCancel,
            contentLabel: getLocalizedMessage('buik.modal.rename.dialog.label')
        },
        React.createElement(
            'label',
            null,
            error ? React.createElement(
                'div',
                { className: 'buik-modal-error' },
                error
            ) : null,
            React.createElement(
                'div',
                null,
                getLocalizedMessage('buik.modal.rename.dialog.text', {
                    name: nameWithoutExt
                })
            ),
            React.createElement('input', { type: 'text', required: true, ref: ref, defaultValue: nameWithoutExt, onKeyDown: onKeyDown })
        ),
        React.createElement(
            'div',
            { className: 'buik-modal-btns' },
            React.createElement(
                PrimaryButton,
                { onClick: rename, isLoading: isLoading },
                getLocalizedMessage('buik.more.options.rename')
            ),
            React.createElement(
                Button,
                { onClick: onCancel, isDisabled: isLoading },
                getLocalizedMessage('buik.footer.button.cancel')
            )
        )
    );
};

export default RenameDialog;