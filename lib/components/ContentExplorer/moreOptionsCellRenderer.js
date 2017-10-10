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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vcmVPcHRpb25zQ2VsbFJlbmRlcmVyLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiRHJvcGRvd25NZW51IiwiTWVudSIsIk1lbnVJdGVtIiwiQnV0dG9uIiwiaXNNb2JpbGUiLCJQRVJNSVNTSU9OX0NBTl9ET1dOTE9BRCIsIlBFUk1JU1NJT05fQ0FOX1JFTkFNRSIsIlBFUk1JU1NJT05fQ0FOX0RFTEVURSIsIlBFUk1JU1NJT05fQ0FOX1NIQVJFIiwiUEVSTUlTU0lPTl9DQU5fUFJFVklFVyIsIlRZUEVfRklMRSIsIlRZUEVfV0VCTElOSyIsImdldExvY2FsaXplZE1lc3NhZ2UiLCJjYW5QcmV2aWV3IiwiY2FuU2hhcmUiLCJjYW5Eb3dubG9hZCIsImNhbkRlbGV0ZSIsImNhblJlbmFtZSIsIm9uSXRlbVNlbGVjdCIsIm9uSXRlbURlbGV0ZSIsIm9uSXRlbURvd25sb2FkIiwib25JdGVtUmVuYW1lIiwib25JdGVtU2hhcmUiLCJvbkl0ZW1QcmV2aWV3IiwiaXNTbWFsbCIsInJvd0RhdGEiLCJvbkZvY3VzIiwib25EZWxldGUiLCJvbkRvd25sb2FkIiwib25SZW5hbWUiLCJvblNoYXJlIiwib25QcmV2aWV3IiwicGVybWlzc2lvbnMiLCJ0eXBlIiwiYWxsb3dQcmV2aWV3IiwiYWxsb3dPcGVuIiwiYWxsb3dEZWxldGUiLCJhbGxvd1NoYXJlIiwiYWxsb3dSZW5hbWUiLCJhbGxvd0Rvd25sb2FkIiwiYWxsb3dlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxZQUFQLE1BQXlCLGlCQUF6QjtBQUNBLFNBQVNDLElBQVQsRUFBZUMsUUFBZixRQUErQixTQUEvQjtBQUNBLFNBQVNDLE1BQVQsUUFBdUIsV0FBdkI7QUFDQSxTQUFTQyxRQUFULFFBQXlCLG9CQUF6QjtBQUNBLFNBQ0lDLHVCQURKLEVBRUlDLHFCQUZKLEVBR0lDLHFCQUhKLEVBSUlDLG9CQUpKLEVBS0lDLHNCQUxKLEVBTUlDLFNB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R2pCLDRDQUFvQiwwQkFBcEI7QUFESCxxQkFETCxHQUlLLElBekJWO0FBMEJLeUIsaUNBQ0s7QUFBQyxnQ0FBRDtBQUFBLDBCQUFVLFNBQVNQLE9BQW5CO0FBQ0dsQiw0Q0FBb0Isd0JBQXBCO0FBREgscUJBREwsR0FJSztBQTlCVjtBQUpKLGFBREo7QUFzQ0t5QiwwQkFBYyxDQUFDYixPQUFmLEdBQ0s7QUFBQyxzQkFBRDtBQUFBLGtCQUFRLFNBQVNFLE9BQWpCLEVBQTBCLFNBQVNJLE9BQW5DO0FBQ0dsQixvQ0FBb0Isd0JBQXBCO0FBREgsYUFETCxHQUlLO0FBMUNWLFNBREo7QUE4Q0gsS0F0RmM7QUFBQSxDQUFmIiwiZmlsZSI6Im1vcmVPcHRpb25zQ2VsbFJlbmRlcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEZ1bmN0aW9uIHRvIHJlbmRlciB0aGUgZGF0ZSB0YWJsZSBjZWxsXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IERyb3Bkb3duTWVudSBmcm9tICcuLi9Ecm9wZG93bk1lbnUnO1xyXG5pbXBvcnQgeyBNZW51LCBNZW51SXRlbSB9IGZyb20gJy4uL01lbnUnO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi9CdXR0b24nO1xyXG5pbXBvcnQgeyBpc01vYmlsZSB9IGZyb20gJy4uLy4uL3V0aWwvYnJvd3Nlcic7XHJcbmltcG9ydCB7XHJcbiAgICBQRVJNSVNTSU9OX0NBTl9ET1dOTE9BRCxcclxuICAgIFBFUk1JU1NJT05fQ0FOX1JFTkFNRSxcclxuICAgIFBFUk1JU1NJT05fQ0FOX0RFTEVURSxcclxuICAgIFBFUk1JU1NJT05fQ0FOX1NIQVJFLFxyXG4gICAgUEVSTUlTU0lPTl9DQU5fUFJFVklFVyxcclxuICAgIFRZUEVfRklMRSxcclxuICAgIFRZUEVfV0VCTElOS1xyXG59IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB0eXBlIHsgQm94SXRlbSB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcbmltcG9ydCAnLi9Nb3JlT3B0aW9uc0NlbGwuc2Nzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlOiBGdW5jdGlvbixcclxuICAgIGNhblByZXZpZXc6IGJvb2xlYW4sXHJcbiAgICBjYW5TaGFyZTogYm9vbGVhbixcclxuICAgIGNhbkRvd25sb2FkOiBib29sZWFuLFxyXG4gICAgY2FuRGVsZXRlOiBib29sZWFuLFxyXG4gICAgY2FuUmVuYW1lOiBib29sZWFuLFxyXG4gICAgb25JdGVtU2VsZWN0OiBGdW5jdGlvbixcclxuICAgIG9uSXRlbURlbGV0ZTogRnVuY3Rpb24sXHJcbiAgICBvbkl0ZW1Eb3dubG9hZDogRnVuY3Rpb24sXHJcbiAgICBvbkl0ZW1SZW5hbWU6IEZ1bmN0aW9uLFxyXG4gICAgb25JdGVtU2hhcmU6IEZ1bmN0aW9uLFxyXG4gICAgb25JdGVtUHJldmlldzogRnVuY3Rpb24sXHJcbiAgICBpc1NtYWxsOiBib29sZWFuXHJcbikgPT4gKHsgcm93RGF0YSB9OiB7IHJvd0RhdGE6IEJveEl0ZW0gfSkgPT4ge1xyXG4gICAgY29uc3Qgb25Gb2N1cyA9ICgpID0+IG9uSXRlbVNlbGVjdChyb3dEYXRhKTtcclxuICAgIGNvbnN0IG9uRGVsZXRlID0gKCkgPT4gb25JdGVtRGVsZXRlKHJvd0RhdGEpO1xyXG4gICAgY29uc3Qgb25Eb3dubG9hZCA9ICgpID0+IG9uSXRlbURvd25sb2FkKHJvd0RhdGEpO1xyXG4gICAgY29uc3Qgb25SZW5hbWUgPSAoKSA9PiBvbkl0ZW1SZW5hbWUocm93RGF0YSk7XHJcbiAgICBjb25zdCBvblNoYXJlID0gKCkgPT4gb25JdGVtU2hhcmUocm93RGF0YSk7XHJcbiAgICBjb25zdCBvblByZXZpZXcgPSAoKSA9PiBvbkl0ZW1QcmV2aWV3KHJvd0RhdGEpO1xyXG5cclxuICAgIGNvbnN0IHsgcGVybWlzc2lvbnMsIHR5cGUgfSA9IHJvd0RhdGE7XHJcblxyXG4gICAgaWYgKCFwZXJtaXNzaW9ucykge1xyXG4gICAgICAgIHJldHVybiA8c3BhbiAvPjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhbGxvd1ByZXZpZXcgPSB0eXBlID09PSBUWVBFX0ZJTEUgJiYgY2FuUHJldmlldyAmJiBwZXJtaXNzaW9uc1tQRVJNSVNTSU9OX0NBTl9QUkVWSUVXXTtcclxuICAgIGNvbnN0IGFsbG93T3BlbiA9IHR5cGUgPT09IFRZUEVfV0VCTElOSztcclxuICAgIGNvbnN0IGFsbG93RGVsZXRlID0gY2FuRGVsZXRlICYmIHBlcm1pc3Npb25zW1BFUk1JU1NJT05fQ0FOX0RFTEVURV07XHJcbiAgICBjb25zdCBhbGxvd1NoYXJlID0gY2FuU2hhcmUgJiYgcGVybWlzc2lvbnNbUEVSTUlTU0lPTl9DQU5fU0hBUkVdO1xyXG4gICAgY29uc3QgYWxsb3dSZW5hbWUgPSBjYW5SZW5hbWUgJiYgcGVybWlzc2lvbnNbUEVSTUlTU0lPTl9DQU5fUkVOQU1FXTtcclxuICAgIGNvbnN0IGFsbG93RG93bmxvYWQgPSBjYW5Eb3dubG9hZCAmJiBwZXJtaXNzaW9uc1tQRVJNSVNTSU9OX0NBTl9ET1dOTE9BRF0gJiYgdHlwZSA9PT0gVFlQRV9GSUxFICYmICFpc01vYmlsZSgpO1xyXG4gICAgY29uc3QgYWxsb3dlZCA9IGFsbG93RGVsZXRlIHx8IGFsbG93UmVuYW1lIHx8IGFsbG93RG93bmxvYWQgfHwgYWxsb3dQcmV2aWV3IHx8IGFsbG93U2hhcmUgfHwgYWxsb3dPcGVuO1xyXG5cclxuICAgIGlmICghYWxsb3dlZCkge1xyXG4gICAgICAgIHJldHVybiA8c3BhbiAvPjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiY2UtbW9yZS1vcHRpb25zJz5cclxuICAgICAgICAgICAgPERyb3Bkb3duTWVudSBpc1JpZ2h0QWxpZ25lZCBjb25zdHJhaW5Ub1Njcm9sbFBhcmVudD5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gb25Gb2N1cz17b25Gb2N1c30gY2xhc3NOYW1lPSdiY2UtYnRuLW1vcmUtb3B0aW9ucyc+XHJcbiAgICAgICAgICAgICAgICAgICAgwrfCt8K3XHJcbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxNZW51PlxyXG4gICAgICAgICAgICAgICAgICAgIHthbGxvd1ByZXZpZXdcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyA8TWVudUl0ZW0gb25DbGljaz17b25QcmV2aWV3fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLm1vcmUub3B0aW9ucy5wcmV2aWV3Jyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudUl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICB7YWxsb3dPcGVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gPE1lbnVJdGVtIG9uQ2xpY2s9e29uUHJldmlld30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5tb3JlLm9wdGlvbnMub3BlbicpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lbnVJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAge2FsbG93RGVsZXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gPE1lbnVJdGVtIG9uQ2xpY2s9e29uRGVsZXRlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLm1vcmUub3B0aW9ucy5kZWxldGUnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZW51SXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgIHthbGxvd0Rvd25sb2FkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gPE1lbnVJdGVtIG9uQ2xpY2s9e29uRG93bmxvYWR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldExvY2FsaXplZE1lc3NhZ2UoJ2J1aWsubW9yZS5vcHRpb25zLmRvd25sb2FkJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudUl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICB7YWxsb3dSZW5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyA8TWVudUl0ZW0gb25DbGljaz17b25SZW5hbWV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldExvY2FsaXplZE1lc3NhZ2UoJ2J1aWsubW9yZS5vcHRpb25zLnJlbmFtZScpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lbnVJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAge2FsbG93U2hhcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyA8TWVudUl0ZW0gb25DbGljaz17b25TaGFyZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5pdGVtLmJ1dHRvbi5zaGFyZScpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lbnVJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICA8L01lbnU+XHJcbiAgICAgICAgICAgIDwvRHJvcGRvd25NZW51PlxyXG4gICAgICAgICAgICB7YWxsb3dTaGFyZSAmJiAhaXNTbWFsbFxyXG4gICAgICAgICAgICAgICAgPyA8QnV0dG9uIG9uRm9jdXM9e29uRm9jdXN9IG9uQ2xpY2s9e29uU2hhcmV9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLml0ZW0uYnV0dG9uLnNoYXJlJyl9XHJcbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDogbnVsbH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn07XHJcbiJdfQ==