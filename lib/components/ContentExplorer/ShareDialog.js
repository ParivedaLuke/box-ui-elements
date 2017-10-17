/**
 * 
 * @file Content Explorer Delete Confirmation Dialog
 * @author Box
 */

import React from 'react';
import Modal from 'react-modal';
import noop from 'lodash.noop';
import ShareAccessSelect from '../ShareAccessSelect';
import { Button, PrimaryButton } from '../Button';
import { CLASS_MODAL_CONTENT, CLASS_MODAL_OVERLAY, CLASS_MODAL } from '../../constants';


var ShareDialog = function ShareDialog(_ref) {
    var isOpen = _ref.isOpen,
        canSetShareAccess = _ref.canSetShareAccess,
        onShareAccessChange = _ref.onShareAccessChange,
        onCancel = _ref.onCancel,
        item = _ref.item,
        getLocalizedMessage = _ref.getLocalizedMessage,
        isLoading = _ref.isLoading,
        parentElement = _ref.parentElement;

    var textInput = null;

    var copy = function copy() {
        if (textInput instanceof HTMLInputElement) {
            textInput.select();
            document.execCommand('copy');
        }
    };

    /* const { shared_link: sharedLink }: BoxItem = item;
    const { url } = sharedLink || {
        url: getLocalizedMessage('buik.modal.share.dialog.text.none')
    }; */
    var boxItem = item;
    var currentClientId = document.getElementById('current-client-id').innerHTML;
    var sharedUrlBase = document.getElementById('box-shared-link-url-base').innerHTML;
    var url = sharedUrlBase + '?client=' + currentClientId + '&box=' + item.id;

    /* eslint-disable jsx-a11y/label-has-for */
    return React.createElement(
        Modal,
        {
            isOpen: isOpen,
            parentSelector: function parentSelector() {
                return parentElement;
            },
            portalClassName: CLASS_MODAL + ' buik-modal-share',
            className: CLASS_MODAL_CONTENT,
            overlayClassName: CLASS_MODAL_OVERLAY,
            onRequestClose: onCancel,
            contentLabel: getLocalizedMessage('buik.modal.share.dialog.label')
        },
        React.createElement(
            'div',
            { className: 'buik-modal-content' },
            React.createElement(
                'label',
                null,
                React.createElement(
                    'div',
                    null,
                    getLocalizedMessage('buik.modal.share.dialog.text')
                ),
                React.createElement(
                    'span',
                    null,
                    React.createElement('input', {
                        type: 'text',
                        onChange: noop,
                        ref: function ref(input) {
                            textInput = input;
                        },
                        value: url
                    }),
                    React.createElement(
                        PrimaryButton,
                        { className: 'buik-modal-button-copy', onClick: copy, autoFocus: true },
                        getLocalizedMessage('buik.modal.dialog.share.button.copy')
                    )
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'buik-modal-btns' },
            React.createElement(
                Button,
                { onClick: onCancel, isLoading: isLoading },
                getLocalizedMessage('buik.modal.dialog.share.button.close')
            )
        )
    );
};

export default ShareDialog;