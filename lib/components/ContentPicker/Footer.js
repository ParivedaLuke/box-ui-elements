/**
 * 
 * @file Footer list component
 * @author Box
 */

import React from 'react';
import { Button, PrimaryButton, PlainButton } from '../Button';


var Footer = function Footer(_ref) {
    var selectedCount = _ref.selectedCount,
        onSelectedClick = _ref.onSelectedClick,
        hasHitSelectionLimit = _ref.hasHitSelectionLimit,
        onCancel = _ref.onCancel,
        onChoose = _ref.onChoose,
        getLocalizedMessage = _ref.getLocalizedMessage,
        chooseButtonLabel = _ref.chooseButtonLabel,
        cancelButtonLabel = _ref.cancelButtonLabel;
    return React.createElement(
        'div',
        { className: 'bcp-footer' },
        React.createElement(
            'div',
            { className: 'bcp-footer-left' },
            React.createElement(
                PlainButton,
                { onClick: onSelectedClick },
                React.createElement(
                    'span',
                    { className: 'bcp-selected-count' },
                    selectedCount
                ),
                '\xA0',
                React.createElement(
                    'span',
                    null,
                    getLocalizedMessage('buik.footer.selected')
                )
            ),
            '\xA0',
            hasHitSelectionLimit ? React.createElement(
                'span',
                { className: 'bcp-selected-max' },
                getLocalizedMessage('buik.footer.selected.max')
            ) : null
        ),
        React.createElement(
            'div',
            { className: 'bcp-footer-right' },
            React.createElement(
                Button,
                { onClick: onCancel },
                cancelButtonLabel || getLocalizedMessage('buik.footer.button.cancel')
            ),
            React.createElement(
                PrimaryButton,
                { onClick: onChoose },
                chooseButtonLabel || getLocalizedMessage('buik.footer.button.choose')
            )
        )
    );
};

export default Footer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvb3Rlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkJ1dHRvbiIsIlByaW1hcnlCdXR0b24iLCJQbGFpbkJ1dHRvbiIsIkZvb3RlciIsInNlbGVjdGVkQ291bnQiLCJvblNlbGVjdGVkQ2xpY2siLCJoYXNIaXRTZWxlY3Rpb25MaW1pdCIsIm9uQ2FuY2VsIiwib25DaG9vc2UiLCJnZXRMb2NhbGl6ZWRNZXNzYWdlIiwiY2hvb3NlQnV0dG9uTGFiZWwiLCJjYW5jZWxCdXR0b25MYWJlbCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxNQUFULEVBQWlCQyxhQUFqQixFQUFnQ0MsV0FBaEMsUUFBbUQsV0FBbkQ7OztBQWNBLElBQU1DLFNBQVMsU0FBVEEsTUFBUztBQUFBLFFBQ1hDLGFBRFcsUUFDWEEsYUFEVztBQUFBLFFBRVhDLGVBRlcsUUFFWEEsZUFGVztBQUFBLFFBR1hDLG9CQUhXLFFBR1hBLG9CQUhXO0FBQUEsUUFJWEMsUUFKVyxRQUlYQSxRQUpXO0FBQUEsUUFLWEMsUUFMVyxRQUtYQSxRQUxXO0FBQUEsUUFNWEMsbUJBTlcsUUFNWEEsbUJBTlc7QUFBQSxRQU9YQyxpQkFQVyxRQU9YQSxpQkFQVztBQUFBLFFBUVhDLGlCQVJXLFFBUVhBLGlCQVJXO0FBQUEsV0FVWDtBQUFBO0FBQUEsVUFBSyxXQUFVLFlBQWY7QUFDSTtBQUFBO0FBQUEsY0FBSyxXQUFVLGlCQUFmO0FBQ0k7QUFBQywyQkFBRDtBQUFBLGtCQUFhLFNBQVNOLGVBQXRCO0FBQ0k7QUFBQTtBQUFBLHNCQUFNLFdBQVUsb0JBQWhCO0FBQXNDRDtBQUF0QyxpQkFESjtBQUFBO0FBR0k7QUFBQTtBQUFBO0FBQU9LLHdDQUFvQixzQkFBcEI7QUFBUDtBQUhKLGFBREo7QUFBQTtBQU9LSCxtQ0FDSztBQUFBO0FBQUEsa0JBQU0sV0FBVSxrQkFBaEI7QUFDR0csb0NBQW9CLDBCQUFwQjtBQURILGFBREwsR0FJSztBQVhWLFNBREo7QUFjSTtBQUFBO0FBQUEsY0FBSyxXQUFVLGtCQUFmO0FBQ0k7QUFBQyxzQkFBRDtBQUFBLGtCQUFRLFNBQVNGLFFBQWpCO0FBQ0tJLHFDQUFxQkYsb0JBQW9CLDJCQUFwQjtBQUQxQixhQURKO0FBSUk7QUFBQyw2QkFBRDtBQUFBLGtCQUFlLFNBQVNELFFBQXhCO0FBQ0tFLHFDQUFxQkQsb0JBQW9CLDJCQUFwQjtBQUQxQjtBQUpKO0FBZEosS0FWVztBQUFBLENBQWY7O0FBa0NBLGVBQWVOLE1BQWYiLCJmaWxlIjoiRm9vdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEZvb3RlciBsaXN0IGNvbXBvbmVudFxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJ1dHRvbiwgUHJpbWFyeUJ1dHRvbiwgUGxhaW5CdXR0b24gfSBmcm9tICcuLi9CdXR0b24nO1xyXG5pbXBvcnQgJy4vRm9vdGVyLnNjc3MnO1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICAgIHNlbGVjdGVkQ291bnQ6IG51bWJlcixcclxuICAgIG9uU2VsZWN0ZWRDbGljazogRnVuY3Rpb24sXHJcbiAgICBoYXNIaXRTZWxlY3Rpb25MaW1pdDogYm9vbGVhbixcclxuICAgIGdldExvY2FsaXplZE1lc3NhZ2U6IEZ1bmN0aW9uLFxyXG4gICAgb25DaG9vc2U6IEZ1bmN0aW9uLFxyXG4gICAgb25DYW5jZWw6IEZ1bmN0aW9uLFxyXG4gICAgY2hvb3NlQnV0dG9uTGFiZWw/OiBzdHJpbmcsXHJcbiAgICBjYW5jZWxCdXR0b25MYWJlbD86IHN0cmluZ1xyXG59O1xyXG5cclxuY29uc3QgRm9vdGVyID0gKHtcclxuICAgIHNlbGVjdGVkQ291bnQsXHJcbiAgICBvblNlbGVjdGVkQ2xpY2ssXHJcbiAgICBoYXNIaXRTZWxlY3Rpb25MaW1pdCxcclxuICAgIG9uQ2FuY2VsLFxyXG4gICAgb25DaG9vc2UsXHJcbiAgICBnZXRMb2NhbGl6ZWRNZXNzYWdlLFxyXG4gICAgY2hvb3NlQnV0dG9uTGFiZWwsXHJcbiAgICBjYW5jZWxCdXR0b25MYWJlbFxyXG59OiBQcm9wcykgPT5cclxuICAgIDxkaXYgY2xhc3NOYW1lPSdiY3AtZm9vdGVyJz5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYmNwLWZvb3Rlci1sZWZ0Jz5cclxuICAgICAgICAgICAgPFBsYWluQnV0dG9uIG9uQ2xpY2s9e29uU2VsZWN0ZWRDbGlja30+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2JjcC1zZWxlY3RlZC1jb3VudCc+e3NlbGVjdGVkQ291bnR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgJm5ic3A7XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj57Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5mb290ZXIuc2VsZWN0ZWQnKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvUGxhaW5CdXR0b24+XHJcbiAgICAgICAgICAgICZuYnNwO1xyXG4gICAgICAgICAgICB7aGFzSGl0U2VsZWN0aW9uTGltaXRcclxuICAgICAgICAgICAgICAgID8gPHNwYW4gY2xhc3NOYW1lPSdiY3Atc2VsZWN0ZWQtbWF4Jz5cclxuICAgICAgICAgICAgICAgICAgICB7Z2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5mb290ZXIuc2VsZWN0ZWQubWF4Jyl9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA6IG51bGx9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JjcC1mb290ZXItcmlnaHQnPlxyXG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uQ2FuY2VsfT5cclxuICAgICAgICAgICAgICAgIHtjYW5jZWxCdXR0b25MYWJlbCB8fCBnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLmZvb3Rlci5idXR0b24uY2FuY2VsJyl9XHJcbiAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICA8UHJpbWFyeUJ1dHRvbiBvbkNsaWNrPXtvbkNob29zZX0+XHJcbiAgICAgICAgICAgICAgICB7Y2hvb3NlQnV0dG9uTGFiZWwgfHwgZ2V0TG9jYWxpemVkTWVzc2FnZSgnYnVpay5mb290ZXIuYnV0dG9uLmNob29zZScpfVxyXG4gICAgICAgICAgICA8L1ByaW1hcnlCdXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGb290ZXI7XHJcbiJdfQ==