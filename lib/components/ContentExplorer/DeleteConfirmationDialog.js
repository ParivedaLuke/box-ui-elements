/**
 * 
 * @file Content Explorer Delete Confirmation Dialog
 * @author Box
 */

import React from 'react';
import Modal from 'react-modal';

import { Button, PrimaryButton } from '../Button';
import { CLASS_MODAL_CONTENT, CLASS_MODAL_OVERLAY, CLASS_MODAL, TYPE_FOLDER } from '../../constants';

var DeleteConfirmationDialog = function DeleteConfirmationDialog(_ref) {
    var isOpen = _ref.isOpen,
        onDelete = _ref.onDelete,
        onCancel = _ref.onCancel,
        item = _ref.item,
        getLocalizedMessage = _ref.getLocalizedMessage,
        isLoading = _ref.isLoading,
        parentElement = _ref.parentElement;
    return React.createElement(
        Modal,
        {
            isOpen: isOpen,
            parentSelector: function parentSelector() {
                return parentElement;
            },
            portalClassName: CLASS_MODAL,
            className: CLASS_MODAL_CONTENT,
            overlayClassName: CLASS_MODAL_OVERLAY,
            onRequestClose: onCancel,
            contentLabel: getLocalizedMessage('buik.modal.delete.confirmation.label')
        },
        React.createElement(
            'div',
            null,
            getLocalizedMessage('buik.modal.delete.confirmation.text' + (item.type === TYPE_FOLDER ? '.folder' : ''), {
                name: item.name
            })
        ),
        React.createElement(
            'div',
            { className: 'buik-modal-btns' },
            React.createElement(
                PrimaryButton,
                { onClick: onDelete, isLoading: isLoading },
                getLocalizedMessage('buik.more.options.delete')
            ),
            React.createElement(
                Button,
                { onClick: onCancel, isDisabled: isLoading, autoFocus: true },
                getLocalizedMessage('buik.footer.button.cancel')
            )
        )
    );
};

export default DeleteConfirmationDialog;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIk1vZGFsIiwiQnV0dG9uIiwiUHJpbWFyeUJ1dHRvbiIsIkNMQVNTX01PREFMX0NPTlRFTlQiLCJDTEFTU19NT0RBTF9PVkVSTEFZIiwiQ0xBU1NfTU9EQUwiLCJUWVBFX0ZPTERFUiIsIkRlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyIsImlzT3BlbiIsIm9uRGVsZXRlIiwib25DYW5jZWwiLCJpdGVtIiwiZ2V0TG9jYWxpemVkTWVzc2FnZSIsImlzTG9hZGluZyIsInBhcmVudEVsZW1lbnQiLCJ0eXBlIiwibmFtZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGFBQWxCOztBQUVBLFNBQVNDLE1BQVQsRUFBaUJDLGFBQWpCLFFBQXNDLFdBQXRDO0FBQ0EsU0FBU0MsbUJBQVQsRUFBOEJDLG1CQUE5QixFQUFtREMsV0FBbkQsRUFBZ0VDLFdBQWhFLFFBQW1GLGlCQUFuRjs7QUFZQSxJQUFNQywyQkFBMkIsU0FBM0JBLHdCQUEyQjtBQUFBLFFBQzdCQyxNQUQ2QixRQUM3QkEsTUFENkI7QUFBQSxRQUU3QkMsUUFGNkIsUUFFN0JBLFFBRjZCO0FBQUEsUUFHN0JDLFFBSDZCLFFBRzdCQSxRQUg2QjtBQUFBLFFBSTdCQyxJQUo2QixRQUk3QkEsSUFKNkI7QUFBQSxRQUs3QkMsbUJBTDZCLFFBSzdCQSxtQkFMNkI7QUFBQSxRQU03QkMsU0FONkIsUUFNN0JBLFNBTjZCO0FBQUEsUUFPN0JDLGFBUDZCLFFBTzdCQSxhQVA2QjtBQUFBLFdBUzdCO0FBQUMsYUFBRDtBQUFBO0FBQ0ksb0JBQVFOLE1BRFo7QUFFSSw0QkFBZ0I7QUFBQSx1QkFBTU0sYUFBTjtBQUFBLGFBRnBCO0FBR0ksNkJBQWlCVCxXQUhyQjtBQUlJLHVCQUFXRixtQkFKZjtBQUtJLDhCQUFrQkMsbUJBTHRCO0FBTUksNEJBQWdCTSxRQU5wQjtBQU9JLDBCQUFjRSxvQkFBb0Isc0NBQXBCO0FBUGxCO0FBU0k7QUFBQTtBQUFBO0FBQ0tBLHlFQUEwREQsS0FBS0ksSUFBTCxLQUFjVCxXQUFkLEdBQTRCLFNBQTVCLEdBQXdDLEVBQWxHLEdBQXdHO0FBQ3JHVSxzQkFBTUwsS0FBS0s7QUFEMEYsYUFBeEc7QUFETCxTQVRKO0FBY0k7QUFBQTtBQUFBLGNBQUssV0FBVSxpQkFBZjtBQUNJO0FBQUMsNkJBQUQ7QUFBQSxrQkFBZSxTQUFTUCxRQUF4QixFQUFrQyxXQUFXSSxTQUE3QztBQUNLRCxvQ0FBb0IsMEJBQXBCO0FBREwsYUFESjtBQUlJO0FBQUMsc0JBQUQ7QUFBQSxrQkFBUSxTQUFTRixRQUFqQixFQUEyQixZQUFZRyxTQUF2QyxFQUFrRCxlQUFsRDtBQUNLRCxvQ0FBb0IsMkJBQXBCO0FBREw7QUFKSjtBQWRKLEtBVDZCO0FBQUEsQ0FBakM7O0FBaUNBLGVBQWVMLHdCQUFmIiwiZmlsZSI6IkRlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBDb250ZW50IEV4cGxvcmVyIERlbGV0ZSBDb25maXJtYXRpb24gRGlhbG9nXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IE1vZGFsIGZyb20gJ3JlYWN0LW1vZGFsJztcclxuaW1wb3J0IHR5cGUgeyBCb3hJdGVtIH0gZnJvbSAnLi4vLi4vZmxvd1R5cGVzJztcclxuaW1wb3J0IHsgQnV0dG9uLCBQcmltYXJ5QnV0dG9uIH0gZnJvbSAnLi4vQnV0dG9uJztcclxuaW1wb3J0IHsgQ0xBU1NfTU9EQUxfQ09OVEVOVCwgQ0xBU1NfTU9EQUxfT1ZFUkxBWSwgQ0xBU1NfTU9EQUwsIFRZUEVfRk9MREVSIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBpc09wZW46IGJvb2xlYW4sXHJcbiAgICBvbkRlbGV0ZTogRnVuY3Rpb24sXHJcbiAgICBvbkNhbmNlbDogRnVuY3Rpb24sXHJcbiAgICBpdGVtOiBCb3hJdGVtLFxyXG4gICAgZ2V0TG9jYWxpemVkTWVzc2FnZTogRnVuY3Rpb24sXHJcbiAgICBpc0xvYWRpbmc6IGJvb2xlYW4sXHJcbiAgICBwYXJlbnRFbGVtZW50OiBIVE1MRWxlbWVudFxyXG59O1xyXG5cclxuY29uc3QgRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nID0gKHtcclxuICAgIGlzT3BlbixcclxuICAgIG9uRGVsZXRlLFxyXG4gICAgb25DYW5jZWwsXHJcbiAgICBpdGVtLFxyXG4gICAgZ2V0TG9jYWxpemVkTWVzc2FnZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIHBhcmVudEVsZW1lbnRcclxufTogUHJvcHMpID0+XHJcbiAgICA8TW9kYWxcclxuICAgICAgICBpc09wZW49e2lzT3Blbn1cclxuICAgICAgICBwYXJlbnRTZWxlY3Rvcj17KCkgPT4gcGFyZW50RWxlbWVudH1cclxuICAgICAgICBwb3J0YWxDbGFzc05hbWU9e0NMQVNTX01PREFMfVxyXG4gICAgICAgIGNsYXNzTmFtZT17Q0xBU1NfTU9EQUxfQ09OVEVOVH1cclxuICAgICAgICBvdmVybGF5Q2xhc3NOYW1lPXtDTEFTU19NT0RBTF9PVkVSTEFZfVxyXG4gICAgICAgIG9uUmVxdWVzdENsb3NlPXtvbkNhbmNlbH1cclxuICAgICAgICBjb250ZW50TGFiZWw9e2dldExvY2FsaXplZE1lc3NhZ2UoJ2J1aWsubW9kYWwuZGVsZXRlLmNvbmZpcm1hdGlvbi5sYWJlbCcpfVxyXG4gICAgPlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIHtnZXRMb2NhbGl6ZWRNZXNzYWdlKGBidWlrLm1vZGFsLmRlbGV0ZS5jb25maXJtYXRpb24udGV4dCR7aXRlbS50eXBlID09PSBUWVBFX0ZPTERFUiA/ICcuZm9sZGVyJyA6ICcnfWAsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZVxyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYnVpay1tb2RhbC1idG5zJz5cclxuICAgICAgICAgICAgPFByaW1hcnlCdXR0b24gb25DbGljaz17b25EZWxldGV9IGlzTG9hZGluZz17aXNMb2FkaW5nfT5cclxuICAgICAgICAgICAgICAgIHtnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLm1vcmUub3B0aW9ucy5kZWxldGUnKX1cclxuICAgICAgICAgICAgPC9QcmltYXJ5QnV0dG9uPlxyXG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uQ2FuY2VsfSBpc0Rpc2FibGVkPXtpc0xvYWRpbmd9IGF1dG9Gb2N1cz5cclxuICAgICAgICAgICAgICAgIHtnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLmZvb3Rlci5idXR0b24uY2FuY2VsJyl9XHJcbiAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9Nb2RhbD47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEZWxldGVDb25maXJtYXRpb25EaWFsb2c7XHJcbiJdfQ==