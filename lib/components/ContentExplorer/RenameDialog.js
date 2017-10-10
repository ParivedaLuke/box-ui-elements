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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlbmFtZURpYWxvZy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIk1vZGFsIiwiQnV0dG9uIiwiUHJpbWFyeUJ1dHRvbiIsIkNMQVNTX01PREFMX0NPTlRFTlQiLCJDTEFTU19NT0RBTF9PVkVSTEFZIiwiQ0xBU1NfTU9EQUwiLCJFUlJPUl9DT0RFX0lURU1fTkFNRV9UT09fTE9ORyIsIkVSUk9SX0NPREVfSVRFTV9OQU1FX0lOX1VTRSIsIlJlbmFtZURpYWxvZyIsImlzT3BlbiIsIm9uUmVuYW1lIiwib25DYW5jZWwiLCJpdGVtIiwiZ2V0TG9jYWxpemVkTWVzc2FnZSIsImlzTG9hZGluZyIsImVycm9yQ29kZSIsInBhcmVudEVsZW1lbnQiLCJ0ZXh0SW5wdXQiLCJlcnJvciIsIm5hbWUiLCJleHRlbnNpb24iLCJleHQiLCJuYW1lV2l0aG91dEV4dCIsInJlcGxhY2UiLCJyZW5hbWUiLCJ2YWx1ZSIsInJlZiIsImlucHV0IiwiSFRNTElucHV0RWxlbWVudCIsImZvY3VzIiwic2VsZWN0Iiwib25LZXlEb3duIiwia2V5Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBTUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsYUFBbEI7O0FBRUEsU0FBU0MsTUFBVCxFQUFpQkMsYUFBakIsUUFBc0MsV0FBdEM7QUFDQSxTQUNJQyxtQkFESixFQUVJQyxtQkFGSixFQUdJQyxXQUhKLEVBSUlDLDZCQUpKLEVBS0lDLDJCQUxKLFFBTU8saUJBTlA7O0FBbUJBO0FBQ0EsSUFBTUMsZUFBZSxTQUFmQSxZQUFlLE9BU1I7QUFBQSxRQVJUQyxNQVFTLFFBUlRBLE1BUVM7QUFBQSxRQVBUQyxRQU9TLFFBUFRBLFFBT1M7QUFBQSxRQU5UQyxRQU1TLFFBTlRBLFFBTVM7QUFBQSxRQUxUQyxJQUtTLFFBTFRBLElBS1M7QUFBQSxRQUpUQyxtQkFJUyxRQUpUQSxtQkFJUztBQUFBLFFBSFRDLFNBR1MsUUFIVEEsU0FHUztBQUFBLFFBRlRDLFNBRVMsUUFGVEEsU0FFUztBQUFBLFFBRFRDLGFBQ1MsUUFEVEEsYUFDUzs7QUFDVCxRQUFJQyxZQUFZLElBQWhCO0FBQ0EsUUFBSUMsUUFBUSxFQUFaOztBQUZTLHFCQUl3Qk4sSUFKeEIsQ0FJRE8sSUFKQztBQUFBLFFBSURBLElBSkMsOEJBSU0sRUFKTjtBQUFBLFFBSVVDLFNBSlYsR0FJd0JSLElBSnhCLENBSVVRLFNBSlY7O0FBS1QsUUFBTUMsTUFBTUQsa0JBQWdCQSxTQUFoQixHQUE4QixFQUExQztBQUNBLFFBQU1FLGlCQUFpQkYsWUFBWUQsS0FBS0ksT0FBTCxDQUFhRixHQUFiLEVBQWtCLEVBQWxCLENBQVosR0FBb0NGLElBQTNEOztBQUVBOzs7QUFHQSxRQUFNSyxTQUFTLFNBQVRBLE1BQVMsR0FBTTtBQUNqQixZQUFJUCxhQUFhQSxVQUFVUSxLQUEzQixFQUFrQztBQUM5QixnQkFBSVIsVUFBVVEsS0FBVixLQUFvQkgsY0FBeEIsRUFBd0M7QUFDcENYO0FBQ0gsYUFGRCxNQUVPO0FBQ0hELHlCQUFTTyxVQUFVUSxLQUFuQixFQUEwQkosR0FBMUI7QUFDSDtBQUNKO0FBQ0osS0FSRDs7QUFVQTs7O0FBR0EsUUFBTUssTUFBTSxTQUFOQSxHQUFNLENBQUNDLEtBQUQsRUFBVztBQUNuQlYsb0JBQVlVLEtBQVo7QUFDQSxZQUFJVixxQkFBcUJXLGdCQUF6QixFQUEyQztBQUN2Q1gsc0JBQVVZLEtBQVY7QUFDQVosc0JBQVVhLE1BQVY7QUFDSDtBQUNKLEtBTkQ7O0FBUUE7OztBQUdBLFFBQU1DLFlBQVksU0FBWkEsU0FBWSxRQUFhO0FBQUEsWUFBVkMsR0FBVSxTQUFWQSxHQUFVOztBQUMzQixnQkFBUUEsR0FBUjtBQUNJLGlCQUFLLE9BQUw7QUFDSVI7QUFDQTtBQUNKO0FBQ0k7QUFMUjtBQU9ILEtBUkQ7O0FBVUEsWUFBUVQsU0FBUjtBQUNJLGFBQUtSLDJCQUFMO0FBQ0lXLG9CQUFRTCxvQkFBb0Isc0NBQXBCLENBQVI7QUFDQTtBQUNKLGFBQUtQLDZCQUFMO0FBQ0lZLG9CQUFRTCxvQkFBb0Isd0NBQXBCLENBQVI7QUFDQTtBQUNKO0FBQ0lLLG9CQUFRSCxZQUFZRixvQkFBb0Isd0NBQXBCLENBQVosR0FBNEUsRUFBcEY7QUFDQTtBQVRSOztBQVlBLFdBQ0k7QUFBQyxhQUFEO0FBQUE7QUFDSSxvQkFBUUosTUFEWjtBQUVJLDRCQUFnQjtBQUFBLHVCQUFNTyxhQUFOO0FBQUEsYUFGcEI7QUFHSSw2QkFBb0JYLFdBQXBCLHVCQUhKO0FBSUksdUJBQVdGLG1CQUpmO0FBS0ksOEJBQWtCQyxtQkFMdEI7QUFNSSw0QkFBZ0JPLFFBTnBCO0FBT0ksMEJBQWNFLG9CQUFvQixnQ0FBcEI7QUFQbEI7QUFTSTtBQUFBO0FBQUE7QUFDS0ssb0JBQ0s7QUFBQTtBQUFBLGtCQUFLLFdBQVUsa0JBQWY7QUFDR0E7QUFESCxhQURMLEdBSUssSUFMVjtBQU1JO0FBQUE7QUFBQTtBQUNLTCxvQ0FBb0IsK0JBQXBCLEVBQXFEO0FBQ2xETSwwQkFBTUc7QUFENEMsaUJBQXJEO0FBREwsYUFOSjtBQVdJLDJDQUFPLE1BQUssTUFBWixFQUFtQixjQUFuQixFQUE0QixLQUFLSSxHQUFqQyxFQUFzQyxjQUFjSixjQUFwRCxFQUFvRSxXQUFXUyxTQUEvRTtBQVhKLFNBVEo7QUFzQkk7QUFBQTtBQUFBLGNBQUssV0FBVSxpQkFBZjtBQUNJO0FBQUMsNkJBQUQ7QUFBQSxrQkFBZSxTQUFTUCxNQUF4QixFQUFnQyxXQUFXVixTQUEzQztBQUNLRCxvQ0FBb0IsMEJBQXBCO0FBREwsYUFESjtBQUlJO0FBQUMsc0JBQUQ7QUFBQSxrQkFBUSxTQUFTRixRQUFqQixFQUEyQixZQUFZRyxTQUF2QztBQUNLRCxvQ0FBb0IsMkJBQXBCO0FBREw7QUFKSjtBQXRCSixLQURKO0FBaUNILENBbkdEOztBQXFHQSxlQUFlTCxZQUFmIiwiZmlsZSI6IlJlbmFtZURpYWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBDb250ZW50IEV4cGxvcmVyIFJlbmFtZSBEaWFsb2dcclxuICogQGF1dGhvciBCb3hcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgTW9kYWwgZnJvbSAncmVhY3QtbW9kYWwnO1xyXG5pbXBvcnQgdHlwZSB7IEJveEl0ZW0gfSBmcm9tICcuLi8uLi9mbG93VHlwZXMnO1xyXG5pbXBvcnQgeyBCdXR0b24sIFByaW1hcnlCdXR0b24gfSBmcm9tICcuLi9CdXR0b24nO1xyXG5pbXBvcnQge1xyXG4gICAgQ0xBU1NfTU9EQUxfQ09OVEVOVCxcclxuICAgIENMQVNTX01PREFMX09WRVJMQVksXHJcbiAgICBDTEFTU19NT0RBTCxcclxuICAgIEVSUk9SX0NPREVfSVRFTV9OQU1FX1RPT19MT05HLFxyXG4gICAgRVJST1JfQ09ERV9JVEVNX05BTUVfSU5fVVNFXHJcbn0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICBpc09wZW46IGJvb2xlYW4sXHJcbiAgICBvblJlbmFtZTogRnVuY3Rpb24sXHJcbiAgICBvbkNhbmNlbDogRnVuY3Rpb24sXHJcbiAgICBpdGVtOiBCb3hJdGVtLFxyXG4gICAgZ2V0TG9jYWxpemVkTWVzc2FnZTogRnVuY3Rpb24sXHJcbiAgICBpc0xvYWRpbmc6IGJvb2xlYW4sXHJcbiAgICBlcnJvckNvZGU6IHN0cmluZyxcclxuICAgIHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50XHJcbn07XHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9sYWJlbC1oYXMtZm9yICovXHJcbmNvbnN0IFJlbmFtZURpYWxvZyA9ICh7XHJcbiAgICBpc09wZW4sXHJcbiAgICBvblJlbmFtZSxcclxuICAgIG9uQ2FuY2VsLFxyXG4gICAgaXRlbSxcclxuICAgIGdldExvY2FsaXplZE1lc3NhZ2UsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvckNvZGUsXHJcbiAgICBwYXJlbnRFbGVtZW50XHJcbn06IFByb3BzKSA9PiB7XHJcbiAgICBsZXQgdGV4dElucHV0ID0gbnVsbDtcclxuICAgIGxldCBlcnJvciA9ICcnO1xyXG5cclxuICAgIGNvbnN0IHsgbmFtZSA9ICcnLCBleHRlbnNpb24gfSA9IGl0ZW07XHJcbiAgICBjb25zdCBleHQgPSBleHRlbnNpb24gPyBgLiR7ZXh0ZW5zaW9ufWAgOiAnJztcclxuICAgIGNvbnN0IG5hbWVXaXRob3V0RXh0ID0gZXh0ZW5zaW9uID8gbmFtZS5yZXBsYWNlKGV4dCwgJycpIDogbmFtZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFwcGVuZHMgdGhlIGV4dGVuc2lvbiBhbmQgY2FsbHMgcmVuYW1lIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0IHJlbmFtZSA9ICgpID0+IHtcclxuICAgICAgICBpZiAodGV4dElucHV0ICYmIHRleHRJbnB1dC52YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodGV4dElucHV0LnZhbHVlID09PSBuYW1lV2l0aG91dEV4dCkge1xyXG4gICAgICAgICAgICAgICAgb25DYW5jZWwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9uUmVuYW1lKHRleHRJbnB1dC52YWx1ZSwgZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHcmFicyByZWZlcmVuY2UgdG8gdGhlIGlucHV0IGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgY29uc3QgcmVmID0gKGlucHV0KSA9PiB7XHJcbiAgICAgICAgdGV4dElucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgaWYgKHRleHRJbnB1dCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGV4dElucHV0LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHRleHRJbnB1dC5zZWxlY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyBlbnRlciBrZXkgZG93blxyXG4gICAgICovXHJcbiAgICBjb25zdCBvbktleURvd24gPSAoeyBrZXkgfSkgPT4ge1xyXG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcclxuICAgICAgICAgICAgICAgIHJlbmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHN3aXRjaCAoZXJyb3JDb2RlKSB7XHJcbiAgICAgICAgY2FzZSBFUlJPUl9DT0RFX0lURU1fTkFNRV9JTl9VU0U6XHJcbiAgICAgICAgICAgIGVycm9yID0gZ2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5tb2RhbC5yZW5hbWUuZGlhbG9nLmVycm9yLmludXNlJyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRVJST1JfQ09ERV9JVEVNX05BTUVfVE9PX0xPTkc6XHJcbiAgICAgICAgICAgIGVycm9yID0gZ2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5tb2RhbC5yZW5hbWUuZGlhbG9nLmVycm9yLnRvb2xvbmcnKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgZXJyb3IgPSBlcnJvckNvZGUgPyBnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLm1vZGFsLnJlbmFtZS5kaWFsb2cuZXJyb3IuaW52YWxpZCcpIDogJyc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPE1vZGFsXHJcbiAgICAgICAgICAgIGlzT3Blbj17aXNPcGVufVxyXG4gICAgICAgICAgICBwYXJlbnRTZWxlY3Rvcj17KCkgPT4gcGFyZW50RWxlbWVudH1cclxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPXtgJHtDTEFTU19NT0RBTH0gYnVpay1tb2RhbC1yZW5hbWVgfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e0NMQVNTX01PREFMX0NPTlRFTlR9XHJcbiAgICAgICAgICAgIG92ZXJsYXlDbGFzc05hbWU9e0NMQVNTX01PREFMX09WRVJMQVl9XHJcbiAgICAgICAgICAgIG9uUmVxdWVzdENsb3NlPXtvbkNhbmNlbH1cclxuICAgICAgICAgICAgY29udGVudExhYmVsPXtnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLm1vZGFsLnJlbmFtZS5kaWFsb2cubGFiZWwnKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICAgIDxsYWJlbD5cclxuICAgICAgICAgICAgICAgIHtlcnJvclxyXG4gICAgICAgICAgICAgICAgICAgID8gPGRpdiBjbGFzc05hbWU9J2J1aWstbW9kYWwtZXJyb3InPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZXJyb3J9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgOiBudWxsfVxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICB7Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5tb2RhbC5yZW5hbWUuZGlhbG9nLnRleHQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWVXaXRob3V0RXh0XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyByZXF1aXJlZCByZWY9e3JlZn0gZGVmYXVsdFZhbHVlPXtuYW1lV2l0aG91dEV4dH0gb25LZXlEb3duPXtvbktleURvd259IC8+XHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdidWlrLW1vZGFsLWJ0bnMnPlxyXG4gICAgICAgICAgICAgICAgPFByaW1hcnlCdXR0b24gb25DbGljaz17cmVuYW1lfSBpc0xvYWRpbmc9e2lzTG9hZGluZ30+XHJcbiAgICAgICAgICAgICAgICAgICAge2dldExvY2FsaXplZE1lc3NhZ2UoJ2J1aWsubW9yZS5vcHRpb25zLnJlbmFtZScpfVxyXG4gICAgICAgICAgICAgICAgPC9QcmltYXJ5QnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtvbkNhbmNlbH0gaXNEaXNhYmxlZD17aXNMb2FkaW5nfT5cclxuICAgICAgICAgICAgICAgICAgICB7Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5mb290ZXIuYnV0dG9uLmNhbmNlbCcpfVxyXG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvTW9kYWw+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVuYW1lRGlhbG9nO1xyXG4iXX0=