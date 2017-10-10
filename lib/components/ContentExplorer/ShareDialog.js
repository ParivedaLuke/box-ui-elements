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
    var url = sharedUrlBase + '?clientId=' + currentClientId + '&fileOrFolderId=' + item.id;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNoYXJlRGlhbG9nLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiTW9kYWwiLCJub29wIiwiU2hhcmVBY2Nlc3NTZWxlY3QiLCJCdXR0b24iLCJQcmltYXJ5QnV0dG9uIiwiQ0xBU1NfTU9EQUxfQ09OVEVOVCIsIkNMQVNTX01PREFMX09WRVJMQVkiLCJDTEFTU19NT0RBTCIsIlNoYXJlRGlhbG9nIiwiaXNPcGVuIiwiY2FuU2V0U2hhcmVBY2Nlc3MiLCJvblNoYXJlQWNjZXNzQ2hhbmdlIiwib25DYW5jZWwiLCJpdGVtIiwiZ2V0TG9jYWxpemVkTWVzc2FnZSIsImlzTG9hZGluZyIsInBhcmVudEVsZW1lbnQiLCJ0ZXh0SW5wdXQiLCJjb3B5IiwiSFRNTElucHV0RWxlbWVudCIsInNlbGVjdCIsImRvY3VtZW50IiwiZXhlY0NvbW1hbmQiLCJib3hJdGVtIiwiY3VycmVudENsaWVudElkIiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJzaGFyZWRVcmxCYXNlIiwidXJsIiwiaWQiLCJpbnB1dCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGFBQWxCO0FBQ0EsT0FBT0MsSUFBUCxNQUFpQixhQUFqQjtBQUNBLE9BQU9DLGlCQUFQLE1BQThCLHNCQUE5QjtBQUNBLFNBQVNDLE1BQVQsRUFBaUJDLGFBQWpCLFFBQXNDLFdBQXRDO0FBQ0EsU0FBU0MsbUJBQVQsRUFBOEJDLG1CQUE5QixFQUFtREMsV0FBbkQsUUFBc0UsaUJBQXRFOzs7QUFlQSxJQUFNQyxjQUFjLFNBQWRBLFdBQWMsT0FTUDtBQUFBLFFBUlRDLE1BUVMsUUFSVEEsTUFRUztBQUFBLFFBUFRDLGlCQU9TLFFBUFRBLGlCQU9TO0FBQUEsUUFOVEMsbUJBTVMsUUFOVEEsbUJBTVM7QUFBQSxRQUxUQyxRQUtTLFFBTFRBLFFBS1M7QUFBQSxRQUpUQyxJQUlTLFFBSlRBLElBSVM7QUFBQSxRQUhUQyxtQkFHUyxRQUhUQSxtQkFHUztBQUFBLFFBRlRDLFNBRVMsUUFGVEEsU0FFUztBQUFBLFFBRFRDLGFBQ1MsUUFEVEEsYUFDUzs7QUFDVCxRQUFJQyxZQUFZLElBQWhCOztBQUVBLFFBQU1DLE9BQU8sU0FBUEEsSUFBTyxHQUFNO0FBQ2YsWUFBSUQscUJBQXFCRSxnQkFBekIsRUFBMkM7QUFDdkNGLHNCQUFVRyxNQUFWO0FBQ0FDLHFCQUFTQyxXQUFULENBQXFCLE1BQXJCO0FBQ0g7QUFDSixLQUxEOztBQU9BOzs7O0FBSUEsUUFBTUMsVUFBbUJWLElBQXpCO0FBQ0EsUUFBTVcsa0JBQWtCSCxTQUFTSSxjQUFULENBQXdCLG1CQUF4QixFQUE2Q0MsU0FBckU7QUFDQSxRQUFNQyxnQkFBZ0JOLFNBQVNJLGNBQVQsQ0FBd0IsMEJBQXhCLEVBQW9EQyxTQUExRTtBQUNBLFFBQU1FLE1BQVNELGFBQVQsa0JBQW9DSCxlQUFwQyx3QkFBd0VYLEtBQUtnQixFQUFuRjs7QUFFQTtBQUNBLFdBQ0k7QUFBQyxhQUFEO0FBQUE7QUFDSSxvQkFBUXBCLE1BRFo7QUFFSSw0QkFBZ0I7QUFBQSx1QkFBTU8sYUFBTjtBQUFBLGFBRnBCO0FBR0ksNkJBQW9CVCxXQUFwQixzQkFISjtBQUlJLHVCQUFXRixtQkFKZjtBQUtJLDhCQUFrQkMsbUJBTHRCO0FBTUksNEJBQWdCTSxRQU5wQjtBQU9JLDBCQUFjRSxvQkFBb0IsK0JBQXBCO0FBUGxCO0FBU0k7QUFBQTtBQUFBLGNBQUssV0FBVSxvQkFBZjtBQUNJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQTtBQUNLQSx3Q0FBb0IsOEJBQXBCO0FBREwsaUJBREo7QUFJSTtBQUFBO0FBQUE7QUFDSTtBQUNJLDhCQUFLLE1BRFQ7QUFFSSxrQ0FBVWIsSUFGZDtBQUdJLDZCQUFLLGFBQUM2QixLQUFELEVBQVc7QUFDWmIsd0NBQVlhLEtBQVo7QUFDSCx5QkFMTDtBQU1JLCtCQUFPRjtBQU5YLHNCQURKO0FBU0k7QUFBQyxxQ0FBRDtBQUFBLDBCQUFlLFdBQVUsd0JBQXpCLEVBQWtELFNBQVNWLElBQTNELEVBQWlFLGVBQWpFO0FBQ0tKLDRDQUFvQixxQ0FBcEI7QUFETDtBQVRKO0FBSko7QUFESixTQVRKO0FBNkJJO0FBQUE7QUFBQSxjQUFLLFdBQVUsaUJBQWY7QUFDSTtBQUFDLHNCQUFEO0FBQUEsa0JBQVEsU0FBU0YsUUFBakIsRUFBMkIsV0FBV0csU0FBdEM7QUFDS0Qsb0NBQW9CLHNDQUFwQjtBQURMO0FBREo7QUE3QkosS0FESjtBQXFDSCxDQWxFRDs7QUFvRUEsZUFBZU4sV0FBZiIsImZpbGUiOiJTaGFyZURpYWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBDb250ZW50IEV4cGxvcmVyIERlbGV0ZSBDb25maXJtYXRpb24gRGlhbG9nXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IE1vZGFsIGZyb20gJ3JlYWN0LW1vZGFsJztcclxuaW1wb3J0IG5vb3AgZnJvbSAnbG9kYXNoLm5vb3AnO1xyXG5pbXBvcnQgU2hhcmVBY2Nlc3NTZWxlY3QgZnJvbSAnLi4vU2hhcmVBY2Nlc3NTZWxlY3QnO1xyXG5pbXBvcnQgeyBCdXR0b24sIFByaW1hcnlCdXR0b24gfSBmcm9tICcuLi9CdXR0b24nO1xyXG5pbXBvcnQgeyBDTEFTU19NT0RBTF9DT05URU5ULCBDTEFTU19NT0RBTF9PVkVSTEFZLCBDTEFTU19NT0RBTCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB0eXBlIHsgQm94SXRlbSB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcbmltcG9ydCAnLi9TaGFyZURpYWxvZy5zY3NzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBjYW5TZXRTaGFyZUFjY2VzczogYm9vbGVhbixcclxuICAgIGlzT3BlbjogYm9vbGVhbixcclxuICAgIG9uU2hhcmVBY2Nlc3NDaGFuZ2U6IEZ1bmN0aW9uLFxyXG4gICAgb25DYW5jZWw6IEZ1bmN0aW9uLFxyXG4gICAgaXRlbTogQm94SXRlbSxcclxuICAgIGdldExvY2FsaXplZE1lc3NhZ2U6IEZ1bmN0aW9uLFxyXG4gICAgaXNMb2FkaW5nOiBib29sZWFuLFxyXG4gICAgcGFyZW50RWxlbWVudDogSFRNTEVsZW1lbnRcclxufTtcclxuXHJcbmNvbnN0IFNoYXJlRGlhbG9nID0gKHtcclxuICAgIGlzT3BlbixcclxuICAgIGNhblNldFNoYXJlQWNjZXNzLFxyXG4gICAgb25TaGFyZUFjY2Vzc0NoYW5nZSxcclxuICAgIG9uQ2FuY2VsLFxyXG4gICAgaXRlbSxcclxuICAgIGdldExvY2FsaXplZE1lc3NhZ2UsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBwYXJlbnRFbGVtZW50XHJcbn06IFByb3BzKSA9PiB7XHJcbiAgICBsZXQgdGV4dElucHV0ID0gbnVsbDtcclxuXHJcbiAgICBjb25zdCBjb3B5ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICh0ZXh0SW5wdXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRleHRJbnB1dC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qIGNvbnN0IHsgc2hhcmVkX2xpbms6IHNoYXJlZExpbmsgfTogQm94SXRlbSA9IGl0ZW07XHJcbiAgICBjb25zdCB7IHVybCB9ID0gc2hhcmVkTGluayB8fCB7XHJcbiAgICAgICAgdXJsOiBnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLm1vZGFsLnNoYXJlLmRpYWxvZy50ZXh0Lm5vbmUnKVxyXG4gICAgfTsgKi9cclxuICAgIGNvbnN0IGJveEl0ZW06IEJveEl0ZW0gPSBpdGVtO1xyXG4gICAgY29uc3QgY3VycmVudENsaWVudElkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnQtY2xpZW50LWlkJykuaW5uZXJIVE1MO1xyXG4gICAgY29uc3Qgc2hhcmVkVXJsQmFzZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib3gtc2hhcmVkLWxpbmstdXJsLWJhc2UnKS5pbm5lckhUTUw7XHJcbiAgICBjb25zdCB1cmwgPSBgJHtzaGFyZWRVcmxCYXNlfT9jbGllbnRJZD0keyBjdXJyZW50Q2xpZW50SWQgfSZmaWxlT3JGb2xkZXJJZD0keyBpdGVtLmlkIH1gO1xyXG5cclxuICAgIC8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2xhYmVsLWhhcy1mb3IgKi9cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPE1vZGFsXHJcbiAgICAgICAgICAgIGlzT3Blbj17aXNPcGVufVxyXG4gICAgICAgICAgICBwYXJlbnRTZWxlY3Rvcj17KCkgPT4gcGFyZW50RWxlbWVudH1cclxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPXtgJHtDTEFTU19NT0RBTH0gYnVpay1tb2RhbC1zaGFyZWB9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Q0xBU1NfTU9EQUxfQ09OVEVOVH1cclxuICAgICAgICAgICAgb3ZlcmxheUNsYXNzTmFtZT17Q0xBU1NfTU9EQUxfT1ZFUkxBWX1cclxuICAgICAgICAgICAgb25SZXF1ZXN0Q2xvc2U9e29uQ2FuY2VsfVxyXG4gICAgICAgICAgICBjb250ZW50TGFiZWw9e2dldExvY2FsaXplZE1lc3NhZ2UoJ2J1aWsubW9kYWwuc2hhcmUuZGlhbG9nLmxhYmVsJyl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYnVpay1tb2RhbC1jb250ZW50Jz5cclxuICAgICAgICAgICAgICAgIDxsYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5tb2RhbC5zaGFyZS5kaWFsb2cudGV4dCcpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9J3RleHQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17bm9vcH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17KGlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dElucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3VybH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFByaW1hcnlCdXR0b24gY2xhc3NOYW1lPSdidWlrLW1vZGFsLWJ1dHRvbi1jb3B5JyBvbkNsaWNrPXtjb3B5fSBhdXRvRm9jdXM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5tb2RhbC5kaWFsb2cuc2hhcmUuYnV0dG9uLmNvcHknKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9QcmltYXJ5QnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYnVpay1tb2RhbC1idG5zJz5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17b25DYW5jZWx9IGlzTG9hZGluZz17aXNMb2FkaW5nfT5cclxuICAgICAgICAgICAgICAgICAgICB7Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5tb2RhbC5kaWFsb2cuc2hhcmUuYnV0dG9uLmNsb3NlJyl9XHJcbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9Nb2RhbD5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGFyZURpYWxvZztcclxuIl19