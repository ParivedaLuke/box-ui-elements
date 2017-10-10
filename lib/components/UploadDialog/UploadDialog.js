/**
 * 
 * @file Content Explorer Delete Confirmation Dialog
 * @author Box
 */

import React from 'react';
import Modal from 'react-modal';
import ContentUploader from '../ContentUploader';
import { CLASS_MODAL_CONTENT_FULL_BLEED, CLASS_MODAL_OVERLAY, CLASS_MODAL } from '../../constants';


/* eslint-disable jsx-a11y/label-has-for */
var UploadDialog = function UploadDialog(_ref) {
    var isOpen = _ref.isOpen,
        rootFolderId = _ref.rootFolderId,
        token = _ref.token,
        sharedLink = _ref.sharedLink,
        sharedLinkPassword = _ref.sharedLinkPassword,
        apiHost = _ref.apiHost,
        uploadHost = _ref.uploadHost,
        onClose = _ref.onClose,
        getLocalizedMessage = _ref.getLocalizedMessage,
        parentElement = _ref.parentElement,
        onUpload = _ref.onUpload;
    return React.createElement(
        Modal,
        {
            isOpen: isOpen,
            parentSelector: function parentSelector() {
                return parentElement;
            },
            portalClassName: CLASS_MODAL + ' buik-modal-upload',
            className: CLASS_MODAL_CONTENT_FULL_BLEED,
            overlayClassName: CLASS_MODAL_OVERLAY,
            onRequestClose: onClose,
            contentLabel: getLocalizedMessage('buik.modal.upload.dialog.label')
        },
        React.createElement(ContentUploader, {
            rootFolderId: rootFolderId,
            token: token,
            sharedLink: sharedLink,
            sharedLinkPassword: sharedLinkPassword,
            apiHost: apiHost,
            uploadHost: uploadHost,
            onClose: onClose,
            getLocalizedMessage: getLocalizedMessage,
            onComplete: onUpload
        })
    );
};

export default UploadDialog;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVwbG9hZERpYWxvZy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIk1vZGFsIiwiQ29udGVudFVwbG9hZGVyIiwiQ0xBU1NfTU9EQUxfQ09OVEVOVF9GVUxMX0JMRUVEIiwiQ0xBU1NfTU9EQUxfT1ZFUkxBWSIsIkNMQVNTX01PREFMIiwiVXBsb2FkRGlhbG9nIiwiaXNPcGVuIiwicm9vdEZvbGRlcklkIiwidG9rZW4iLCJzaGFyZWRMaW5rIiwic2hhcmVkTGlua1Bhc3N3b3JkIiwiYXBpSG9zdCIsInVwbG9hZEhvc3QiLCJvbkNsb3NlIiwiZ2V0TG9jYWxpemVkTWVzc2FnZSIsInBhcmVudEVsZW1lbnQiLCJvblVwbG9hZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGFBQWxCO0FBQ0EsT0FBT0MsZUFBUCxNQUE0QixvQkFBNUI7QUFDQSxTQUFTQyw4QkFBVCxFQUF5Q0MsbUJBQXpDLEVBQThEQyxXQUE5RCxRQUFpRixpQkFBakY7OztBQWlCQTtBQUNBLElBQU1DLGVBQWUsU0FBZkEsWUFBZTtBQUFBLFFBQ2pCQyxNQURpQixRQUNqQkEsTUFEaUI7QUFBQSxRQUVqQkMsWUFGaUIsUUFFakJBLFlBRmlCO0FBQUEsUUFHakJDLEtBSGlCLFFBR2pCQSxLQUhpQjtBQUFBLFFBSWpCQyxVQUppQixRQUlqQkEsVUFKaUI7QUFBQSxRQUtqQkMsa0JBTGlCLFFBS2pCQSxrQkFMaUI7QUFBQSxRQU1qQkMsT0FOaUIsUUFNakJBLE9BTmlCO0FBQUEsUUFPakJDLFVBUGlCLFFBT2pCQSxVQVBpQjtBQUFBLFFBUWpCQyxPQVJpQixRQVFqQkEsT0FSaUI7QUFBQSxRQVNqQkMsbUJBVGlCLFFBU2pCQSxtQkFUaUI7QUFBQSxRQVVqQkMsYUFWaUIsUUFVakJBLGFBVmlCO0FBQUEsUUFXakJDLFFBWGlCLFFBV2pCQSxRQVhpQjtBQUFBLFdBYWpCO0FBQUMsYUFBRDtBQUFBO0FBQ0ksb0JBQVFWLE1BRFo7QUFFSSw0QkFBZ0I7QUFBQSx1QkFBTVMsYUFBTjtBQUFBLGFBRnBCO0FBR0ksNkJBQW9CWCxXQUFwQix1QkFISjtBQUlJLHVCQUFXRiw4QkFKZjtBQUtJLDhCQUFrQkMsbUJBTHRCO0FBTUksNEJBQWdCVSxPQU5wQjtBQU9JLDBCQUFjQyxvQkFBb0IsZ0NBQXBCO0FBUGxCO0FBU0ksNEJBQUMsZUFBRDtBQUNJLDBCQUFjUCxZQURsQjtBQUVJLG1CQUFPQyxLQUZYO0FBR0ksd0JBQVlDLFVBSGhCO0FBSUksZ0NBQW9CQyxrQkFKeEI7QUFLSSxxQkFBU0MsT0FMYjtBQU1JLHdCQUFZQyxVQU5oQjtBQU9JLHFCQUFTQyxPQVBiO0FBUUksaUNBQXFCQyxtQkFSekI7QUFTSSx3QkFBWUU7QUFUaEI7QUFUSixLQWJpQjtBQUFBLENBQXJCOztBQW1DQSxlQUFlWCxZQUFmIiwiZmlsZSI6IlVwbG9hZERpYWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBDb250ZW50IEV4cGxvcmVyIERlbGV0ZSBDb25maXJtYXRpb24gRGlhbG9nXHJcbiAqIEBhdXRob3IgQm94XHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IE1vZGFsIGZyb20gJ3JlYWN0LW1vZGFsJztcclxuaW1wb3J0IENvbnRlbnRVcGxvYWRlciBmcm9tICcuLi9Db250ZW50VXBsb2FkZXInO1xyXG5pbXBvcnQgeyBDTEFTU19NT0RBTF9DT05URU5UX0ZVTExfQkxFRUQsIENMQVNTX01PREFMX09WRVJMQVksIENMQVNTX01PREFMIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHR5cGUgeyBUb2tlbiB9IGZyb20gJy4uLy4uL2Zsb3dUeXBlcyc7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgaXNPcGVuOiBib29sZWFuLFxyXG4gICAgcm9vdEZvbGRlcklkOiBzdHJpbmcsXHJcbiAgICB0b2tlbjogVG9rZW4sXHJcbiAgICBzaGFyZWRMaW5rPzogc3RyaW5nLFxyXG4gICAgc2hhcmVkTGlua1Bhc3N3b3JkPzogc3RyaW5nLFxyXG4gICAgYXBpSG9zdDogc3RyaW5nLFxyXG4gICAgdXBsb2FkSG9zdDogc3RyaW5nLFxyXG4gICAgb25DbG9zZTogRnVuY3Rpb24sXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlOiBGdW5jdGlvbixcclxuICAgIHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxyXG4gICAgb25VcGxvYWQ6IEZ1bmN0aW9uXHJcbn07XHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9sYWJlbC1oYXMtZm9yICovXHJcbmNvbnN0IFVwbG9hZERpYWxvZyA9ICh7XHJcbiAgICBpc09wZW4sXHJcbiAgICByb290Rm9sZGVySWQsXHJcbiAgICB0b2tlbixcclxuICAgIHNoYXJlZExpbmssXHJcbiAgICBzaGFyZWRMaW5rUGFzc3dvcmQsXHJcbiAgICBhcGlIb3N0LFxyXG4gICAgdXBsb2FkSG9zdCxcclxuICAgIG9uQ2xvc2UsXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlLFxyXG4gICAgcGFyZW50RWxlbWVudCxcclxuICAgIG9uVXBsb2FkXHJcbn06IFByb3BzKSA9PlxyXG4gICAgPE1vZGFsXHJcbiAgICAgICAgaXNPcGVuPXtpc09wZW59XHJcbiAgICAgICAgcGFyZW50U2VsZWN0b3I9eygpID0+IHBhcmVudEVsZW1lbnR9XHJcbiAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPXtgJHtDTEFTU19NT0RBTH0gYnVpay1tb2RhbC11cGxvYWRgfVxyXG4gICAgICAgIGNsYXNzTmFtZT17Q0xBU1NfTU9EQUxfQ09OVEVOVF9GVUxMX0JMRUVEfVxyXG4gICAgICAgIG92ZXJsYXlDbGFzc05hbWU9e0NMQVNTX01PREFMX09WRVJMQVl9XHJcbiAgICAgICAgb25SZXF1ZXN0Q2xvc2U9e29uQ2xvc2V9XHJcbiAgICAgICAgY29udGVudExhYmVsPXtnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLm1vZGFsLnVwbG9hZC5kaWFsb2cubGFiZWwnKX1cclxuICAgID5cclxuICAgICAgICA8Q29udGVudFVwbG9hZGVyXHJcbiAgICAgICAgICAgIHJvb3RGb2xkZXJJZD17cm9vdEZvbGRlcklkfVxyXG4gICAgICAgICAgICB0b2tlbj17dG9rZW59XHJcbiAgICAgICAgICAgIHNoYXJlZExpbms9e3NoYXJlZExpbmt9XHJcbiAgICAgICAgICAgIHNoYXJlZExpbmtQYXNzd29yZD17c2hhcmVkTGlua1Bhc3N3b3JkfVxyXG4gICAgICAgICAgICBhcGlIb3N0PXthcGlIb3N0fVxyXG4gICAgICAgICAgICB1cGxvYWRIb3N0PXt1cGxvYWRIb3N0fVxyXG4gICAgICAgICAgICBvbkNsb3NlPXtvbkNsb3NlfVxyXG4gICAgICAgICAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlPXtnZXRMb2NhbGl6ZWRNZXNzYWdlfVxyXG4gICAgICAgICAgICBvbkNvbXBsZXRlPXtvblVwbG9hZH1cclxuICAgICAgICAvPlxyXG4gICAgPC9Nb2RhbD47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVcGxvYWREaWFsb2c7XHJcbiJdfQ==