/**
 * 
 * @file Content Explorer Create Folder Dialog
 * @author Box
 */

import React from 'react';
import Modal from 'react-modal';
import { Button, PrimaryButton } from '../Button';
import { CLASS_MODAL_CONTENT, CLASS_MODAL_OVERLAY, CLASS_MODAL, ERROR_CODE_ITEM_NAME_TOO_LONG, ERROR_CODE_ITEM_NAME_IN_USE } from '../../constants';

/* eslint-disable jsx-a11y/label-has-for */
var CreateFolderDialog = function CreateFolderDialog(_ref) {
    var isOpen = _ref.isOpen,
        onCreate = _ref.onCreate,
        onCancel = _ref.onCancel,
        getLocalizedMessage = _ref.getLocalizedMessage,
        isLoading = _ref.isLoading,
        errorCode = _ref.errorCode,
        parentElement = _ref.parentElement;

    var textInput = null;
    var error = '';

    /**
     * Appends the extension and calls rename function
     */
    var create = function create() {
        if (textInput && textInput.value) {
            onCreate(textInput.value);
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
                create();
                break;
            default:
                break;
        }
    };

    switch (errorCode) {
        case ERROR_CODE_ITEM_NAME_IN_USE:
            error = getLocalizedMessage('buik.modal.create.dialog.error.inuse');
            break;
        case ERROR_CODE_ITEM_NAME_TOO_LONG:
            error = getLocalizedMessage('buik.modal.create.dialog.error.toolong');
            break;
        default:
            error = errorCode ? getLocalizedMessage('buik.modal.create.dialog.error.invalid') : '';
            break;
    }

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
            contentLabel: getLocalizedMessage('buik.modal.create.dialog.label')
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
                getLocalizedMessage('buik.modal.create.dialog.text')
            ),
            React.createElement('input', { type: 'text', required: true, ref: ref, onKeyDown: onKeyDown })
        ),
        React.createElement(
            'div',
            { className: 'buik-modal-btns' },
            React.createElement(
                PrimaryButton,
                { onClick: create, isLoading: isLoading },
                getLocalizedMessage('buik.modal.create.dialog.button')
            ),
            React.createElement(
                Button,
                { onClick: onCancel, isDisabled: isLoading },
                getLocalizedMessage('buik.footer.button.cancel')
            )
        )
    );
};

export default CreateFolderDialog;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNyZWF0ZUZvbGRlckRpYWxvZy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIk1vZGFsIiwiQnV0dG9uIiwiUHJpbWFyeUJ1dHRvbiIsIkNMQVNTX01PREFMX0NPTlRFTlQiLCJDTEFTU19NT0RBTF9PVkVSTEFZIiwiQ0xBU1NfTU9EQUwiLCJFUlJPUl9DT0RFX0lURU1fTkFNRV9UT09fTE9ORyIsIkVSUk9SX0NPREVfSVRFTV9OQU1FX0lOX1VTRSIsIkNyZWF0ZUZvbGRlckRpYWxvZyIsImlzT3BlbiIsIm9uQ3JlYXRlIiwib25DYW5jZWwiLCJnZXRMb2NhbGl6ZWRNZXNzYWdlIiwiaXNMb2FkaW5nIiwiZXJyb3JDb2RlIiwicGFyZW50RWxlbWVudCIsInRleHRJbnB1dCIsImVycm9yIiwiY3JlYXRlIiwidmFsdWUiLCJyZWYiLCJpbnB1dCIsIkhUTUxJbnB1dEVsZW1lbnQiLCJmb2N1cyIsInNlbGVjdCIsIm9uS2V5RG93biIsImtleSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGFBQWxCO0FBQ0EsU0FBU0MsTUFBVCxFQUFpQkMsYUFBakIsUUFBc0MsV0FBdEM7QUFDQSxTQUNJQyxtQkFESixFQUVJQyxtQkFGSixFQUdJQyxXQUhKLEVBSUlDLDZCQUpKLEVBS0lDLDJCQUxKLFFBTU8saUJBTlA7O0FBa0JBO0FBQ0EsSUFBTUMscUJBQXFCLFNBQXJCQSxrQkFBcUIsT0FRZDtBQUFBLFFBUFRDLE1BT1MsUUFQVEEsTUFPUztBQUFBLFFBTlRDLFFBTVMsUUFOVEEsUUFNUztBQUFBLFFBTFRDLFFBS1MsUUFMVEEsUUFLUztBQUFBLFFBSlRDLG1CQUlTLFFBSlRBLG1CQUlTO0FBQUEsUUFIVEMsU0FHUyxRQUhUQSxTQUdTO0FBQUEsUUFGVEMsU0FFUyxRQUZUQSxTQUVTO0FBQUEsUUFEVEMsYUFDUyxRQURUQSxhQUNTOztBQUNULFFBQUlDLFlBQVksSUFBaEI7QUFDQSxRQUFJQyxRQUFRLEVBQVo7O0FBRUE7OztBQUdBLFFBQU1DLFNBQVMsU0FBVEEsTUFBUyxHQUFNO0FBQ2pCLFlBQUlGLGFBQWFBLFVBQVVHLEtBQTNCLEVBQWtDO0FBQzlCVCxxQkFBU00sVUFBVUcsS0FBbkI7QUFDSDtBQUNKLEtBSkQ7O0FBTUE7OztBQUdBLFFBQU1DLE1BQU0sU0FBTkEsR0FBTSxDQUFDQyxLQUFELEVBQVc7QUFDbkJMLG9CQUFZSyxLQUFaO0FBQ0EsWUFBSUwscUJBQXFCTSxnQkFBekIsRUFBMkM7QUFDdkNOLHNCQUFVTyxLQUFWO0FBQ0FQLHNCQUFVUSxNQUFWO0FBQ0g7QUFDSixLQU5EOztBQVFBOzs7QUFHQSxRQUFNQyxZQUFZLFNBQVpBLFNBQVksUUFBYTtBQUFBLFlBQVZDLEdBQVUsU0FBVkEsR0FBVTs7QUFDM0IsZ0JBQVFBLEdBQVI7QUFDSSxpQkFBSyxPQUFMO0FBQ0lSO0FBQ0E7QUFDSjtBQUNJO0FBTFI7QUFPSCxLQVJEOztBQVVBLFlBQVFKLFNBQVI7QUFDSSxhQUFLUCwyQkFBTDtBQUNJVSxvQkFBUUwsb0JBQW9CLHNDQUFwQixDQUFSO0FBQ0E7QUFDSixhQUFLTiw2QkFBTDtBQUNJVyxvQkFBUUwsb0JBQW9CLHdDQUFwQixDQUFSO0FBQ0E7QUFDSjtBQUNJSyxvQkFBUUgsWUFBWUYsb0JBQW9CLHdDQUFwQixDQUFaLEdBQTRFLEVBQXBGO0FBQ0E7QUFUUjs7QUFZQSxXQUNJO0FBQUMsYUFBRDtBQUFBO0FBQ0ksb0JBQVFILE1BRFo7QUFFSSw0QkFBZ0I7QUFBQSx1QkFBTU0sYUFBTjtBQUFBLGFBRnBCO0FBR0ksNkJBQWlCVixXQUhyQjtBQUlJLHVCQUFXRixtQkFKZjtBQUtJLDhCQUFrQkMsbUJBTHRCO0FBTUksNEJBQWdCTyxRQU5wQjtBQU9JLDBCQUFjQyxvQkFBb0IsZ0NBQXBCO0FBUGxCO0FBU0k7QUFBQTtBQUFBO0FBQ0tLLG9CQUNLO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGtCQUFmO0FBQ0dBO0FBREgsYUFETCxHQUlLLElBTFY7QUFNSTtBQUFBO0FBQUE7QUFDS0wsb0NBQW9CLCtCQUFwQjtBQURMLGFBTko7QUFTSSwyQ0FBTyxNQUFLLE1BQVosRUFBbUIsY0FBbkIsRUFBNEIsS0FBS1EsR0FBakMsRUFBc0MsV0FBV0ssU0FBakQ7QUFUSixTQVRKO0FBb0JJO0FBQUE7QUFBQSxjQUFLLFdBQVUsaUJBQWY7QUFDSTtBQUFDLDZCQUFEO0FBQUEsa0JBQWUsU0FBU1AsTUFBeEIsRUFBZ0MsV0FBV0wsU0FBM0M7QUFDS0Qsb0NBQW9CLGlDQUFwQjtBQURMLGFBREo7QUFJSTtBQUFDLHNCQUFEO0FBQUEsa0JBQVEsU0FBU0QsUUFBakIsRUFBMkIsWUFBWUUsU0FBdkM7QUFDS0Qsb0NBQW9CLDJCQUFwQjtBQURMO0FBSko7QUFwQkosS0FESjtBQStCSCxDQXhGRDs7QUEwRkEsZUFBZUosa0JBQWYiLCJmaWxlIjoiQ3JlYXRlRm9sZGVyRGlhbG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIENvbnRlbnQgRXhwbG9yZXIgQ3JlYXRlIEZvbGRlciBEaWFsb2dcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgTW9kYWwgZnJvbSAncmVhY3QtbW9kYWwnO1xyXG5pbXBvcnQgeyBCdXR0b24sIFByaW1hcnlCdXR0b24gfSBmcm9tICcuLi9CdXR0b24nO1xyXG5pbXBvcnQge1xyXG4gICAgQ0xBU1NfTU9EQUxfQ09OVEVOVCxcclxuICAgIENMQVNTX01PREFMX09WRVJMQVksXHJcbiAgICBDTEFTU19NT0RBTCxcclxuICAgIEVSUk9SX0NPREVfSVRFTV9OQU1FX1RPT19MT05HLFxyXG4gICAgRVJST1JfQ09ERV9JVEVNX05BTUVfSU5fVVNFXHJcbn0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBpc09wZW46IGJvb2xlYW4sXHJcbiAgICBvbkNyZWF0ZTogRnVuY3Rpb24sXHJcbiAgICBvbkNhbmNlbDogRnVuY3Rpb24sXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlOiBGdW5jdGlvbixcclxuICAgIGlzTG9hZGluZzogYm9vbGVhbixcclxuICAgIGVycm9yQ29kZTogc3RyaW5nLFxyXG4gICAgcGFyZW50RWxlbWVudDogSFRNTEVsZW1lbnRcclxufTtcclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2xhYmVsLWhhcy1mb3IgKi9cclxuY29uc3QgQ3JlYXRlRm9sZGVyRGlhbG9nID0gKHtcclxuICAgIGlzT3BlbixcclxuICAgIG9uQ3JlYXRlLFxyXG4gICAgb25DYW5jZWwsXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JDb2RlLFxyXG4gICAgcGFyZW50RWxlbWVudFxyXG59OiBQcm9wcykgPT4ge1xyXG4gICAgbGV0IHRleHRJbnB1dCA9IG51bGw7XHJcbiAgICBsZXQgZXJyb3IgPSAnJztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFwcGVuZHMgdGhlIGV4dGVuc2lvbiBhbmQgY2FsbHMgcmVuYW1lIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0IGNyZWF0ZSA9ICgpID0+IHtcclxuICAgICAgICBpZiAodGV4dElucHV0ICYmIHRleHRJbnB1dC52YWx1ZSkge1xyXG4gICAgICAgICAgICBvbkNyZWF0ZSh0ZXh0SW5wdXQudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHcmFicyByZWZlcmVuY2UgdG8gdGhlIGlucHV0IGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgY29uc3QgcmVmID0gKGlucHV0KSA9PiB7XHJcbiAgICAgICAgdGV4dElucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgaWYgKHRleHRJbnB1dCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGV4dElucHV0LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHRleHRJbnB1dC5zZWxlY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyBlbnRlciBrZXkgZG93blxyXG4gICAgICovXHJcbiAgICBjb25zdCBvbktleURvd24gPSAoeyBrZXkgfSkgPT4ge1xyXG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcclxuICAgICAgICAgICAgICAgIGNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHN3aXRjaCAoZXJyb3JDb2RlKSB7XHJcbiAgICAgICAgY2FzZSBFUlJPUl9DT0RFX0lURU1fTkFNRV9JTl9VU0U6XHJcbiAgICAgICAgICAgIGVycm9yID0gZ2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5tb2RhbC5jcmVhdGUuZGlhbG9nLmVycm9yLmludXNlJyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRVJST1JfQ09ERV9JVEVNX05BTUVfVE9PX0xPTkc6XHJcbiAgICAgICAgICAgIGVycm9yID0gZ2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5tb2RhbC5jcmVhdGUuZGlhbG9nLmVycm9yLnRvb2xvbmcnKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgZXJyb3IgPSBlcnJvckNvZGUgPyBnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLm1vZGFsLmNyZWF0ZS5kaWFsb2cuZXJyb3IuaW52YWxpZCcpIDogJyc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPE1vZGFsXHJcbiAgICAgICAgICAgIGlzT3Blbj17aXNPcGVufVxyXG4gICAgICAgICAgICBwYXJlbnRTZWxlY3Rvcj17KCkgPT4gcGFyZW50RWxlbWVudH1cclxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPXtDTEFTU19NT0RBTH1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtDTEFTU19NT0RBTF9DT05URU5UfVxyXG4gICAgICAgICAgICBvdmVybGF5Q2xhc3NOYW1lPXtDTEFTU19NT0RBTF9PVkVSTEFZfVxyXG4gICAgICAgICAgICBvblJlcXVlc3RDbG9zZT17b25DYW5jZWx9XHJcbiAgICAgICAgICAgIGNvbnRlbnRMYWJlbD17Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5tb2RhbC5jcmVhdGUuZGlhbG9nLmxhYmVsJyl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgICA8bGFiZWw+XHJcbiAgICAgICAgICAgICAgICB7ZXJyb3JcclxuICAgICAgICAgICAgICAgICAgICA/IDxkaXYgY2xhc3NOYW1lPSdidWlrLW1vZGFsLWVycm9yJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2Vycm9yfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbH1cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge2dldExvY2FsaXplZE1lc3NhZ2UoJ2J1aWsubW9kYWwuY3JlYXRlLmRpYWxvZy50ZXh0Jyl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyByZXF1aXJlZCByZWY9e3JlZn0gb25LZXlEb3duPXtvbktleURvd259IC8+XHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdidWlrLW1vZGFsLWJ0bnMnPlxyXG4gICAgICAgICAgICAgICAgPFByaW1hcnlCdXR0b24gb25DbGljaz17Y3JlYXRlfSBpc0xvYWRpbmc9e2lzTG9hZGluZ30+XHJcbiAgICAgICAgICAgICAgICAgICAge2dldExvY2FsaXplZE1lc3NhZ2UoJ2J1aWsubW9kYWwuY3JlYXRlLmRpYWxvZy5idXR0b24nKX1cclxuICAgICAgICAgICAgICAgIDwvUHJpbWFyeUJ1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17b25DYW5jZWx9IGlzRGlzYWJsZWQ9e2lzTG9hZGluZ30+XHJcbiAgICAgICAgICAgICAgICAgICAge2dldExvY2FsaXplZE1lc3NhZ2UoJ2J1aWsuZm9vdGVyLmJ1dHRvbi5jYW5jZWwnKX1cclxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L01vZGFsPlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENyZWF0ZUZvbGRlckRpYWxvZztcclxuIl19