/**
 * 
 * @file Function to render the date table cell
 * @author Box
 */

import React from 'react';
import DropdownMenu from '../DropdownMenu';
import { Menu, MenuItem } from '../Menu';
import { Button } from '../Button';
import { isMobile } from '../../util/browser';
import { PERMISSION_CAN_DOWNLOAD, PERMISSION_CAN_RENAME, PERMISSION_CAN_DELETE, PERMISSION_CAN_SHARE, PERMISSION_CAN_PREVIEW, TYPE_FILE, TYPE_WEBLINK } from '../../constants';


export default (function (getLocalizedMessage, canPreview, canShare, canDownload, canDelete, canRename, onItemSelect, onItemDelete, onItemDownload, onItemRename, onItemShare, onItemPreview, isSmall) {
    return function (_ref) {
        var rowData = _ref.rowData;

        var onFocus = function onFocus() {
            return onItemSelect(rowData);
        };
        var onDelete = function onDelete() {
            return onItemDelete(rowData);
        };
        var onDownload = function onDownload() {
            return onItemDownload(rowData);
        };
        var onRename = function onRename() {
            return onItemRename(rowData);
        };
        var onShare = function onShare() {
            return onItemShare(rowData);
        };
        var onPreview = function onPreview() {
            return onItemPreview(rowData);
        };

        var permissions = rowData.permissions,
            type = rowData.type;


        if (!permissions) {
            return React.createElement('span', null);
        }

        var allowPreview = type === TYPE_FILE && canPreview && permissions[PERMISSION_CAN_PREVIEW];
        var allowOpen = type === TYPE_WEBLINK;
        var allowDelete = canDelete && permissions[PERMISSION_CAN_DELETE];
        var allowShare = canShare && permissions[PERMISSION_CAN_SHARE];
        var allowRename = canRename && permissions[PERMISSION_CAN_RENAME];
        var allowDownload = canDownload && permissions[PERMISSION_CAN_DOWNLOAD] && type === TYPE_FILE && !isMobile();
        var allowed = allowDelete || allowRename || allowDownload || allowPreview || allowShare || allowOpen;

        if (!allowed) {
            return React.createElement('span', null);
        }

        return React.createElement(
            'div',
            { className: 'bce-more-options' },
            React.createElement(
                DropdownMenu,
                { isRightAligned: true, constrainToScrollParent: true },
                React.createElement(
                    Button,
                    { onFocus: onFocus, className: 'bce-btn-more-options' },
                    '\xB7\xB7\xB7'
                ),
                React.createElement(
                    Menu,
                    null,
                    allowPreview ? React.createElement(
                        MenuItem,
                        { onClick: onPreview },
                        getLocalizedMessage('buik.more.options.preview')
                    ) : null,
                    allowOpen ? React.createElement(
                        MenuItem,
                        { onClick: onPreview },
                        getLocalizedMessage('buik.more.options.open')
                    ) : null,
                    allowDelete ? React.createElement(
                        MenuItem,
                        { onClick: onDelete },
                        getLocalizedMessage('buik.more.options.delete')
                    ) : null,
                    allowDownload ? React.createElement(
                        MenuItem,
                        { onClick: onDownload },
                        getLocalizedMessage('buik.more.options.download')
                    ) : null,
                    allowRename ? React.createElement(
                        MenuItem,
                        { onClick: onRename },
                        getLocalizedMessage('buik.more.options.rename')
                    ) : null,
                    allowShare ? React.createElement(
                        MenuItem,
                        { onClick: onShare },
                        getLocalizedMessage('buik.item.button.share')
                    ) : null
                )
            ),
            allowShare && !isSmall ? React.createElement(
                Button,
                { onFocus: onFocus, onClick: onShare },
                getLocalizedMessage('buik.item.button.share')
            ) : null
        );
    };
});