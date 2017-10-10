/**
 * 
 * @file Footer component
 */

import React from 'react';
import { Button, PrimaryButton } from '../Button';


var Footer = function Footer(_ref) {
    var isLoading = _ref.isLoading,
        hasFiles = _ref.hasFiles,
        message = _ref.message,
        onCancel = _ref.onCancel,
        onClose = _ref.onClose,
        onUpload = _ref.onUpload,
        getLocalizedMessage = _ref.getLocalizedMessage;
    return React.createElement(
        'div',
        { className: 'bcu-footer' },
        React.createElement(
            'div',
            { className: 'bcu-footer-left' },
            onClose ? React.createElement(
                Button,
                { isDisabled: hasFiles, onClick: onClose },
                getLocalizedMessage('buik.footer.button.close')
            ) : null
        ),
        React.createElement(
            'div',
            { className: 'bcu-footer-message' },
            message
        ),
        React.createElement(
            'div',
            { className: 'bcu-footer-right' },
            React.createElement(
                Button,
                { isDisabled: !hasFiles, onClick: onCancel },
                getLocalizedMessage('buik.footer.button.cancel.uploads')
            ),
            React.createElement(
                PrimaryButton,
                { isDisabled: !hasFiles, isLoading: isLoading, onClick: onUpload },
                getLocalizedMessage('buik.footer.button.upload')
            )
        )
    );
};

export default Footer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvb3Rlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkJ1dHRvbiIsIlByaW1hcnlCdXR0b24iLCJGb290ZXIiLCJpc0xvYWRpbmciLCJoYXNGaWxlcyIsIm1lc3NhZ2UiLCJvbkNhbmNlbCIsIm9uQ2xvc2UiLCJvblVwbG9hZCIsImdldExvY2FsaXplZE1lc3NhZ2UiXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQUtBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxNQUFULEVBQWlCQyxhQUFqQixRQUFzQyxXQUF0Qzs7O0FBYUEsSUFBTUMsU0FBUyxTQUFUQSxNQUFTO0FBQUEsUUFBR0MsU0FBSCxRQUFHQSxTQUFIO0FBQUEsUUFBY0MsUUFBZCxRQUFjQSxRQUFkO0FBQUEsUUFBd0JDLE9BQXhCLFFBQXdCQSxPQUF4QjtBQUFBLFFBQWlDQyxRQUFqQyxRQUFpQ0EsUUFBakM7QUFBQSxRQUEyQ0MsT0FBM0MsUUFBMkNBLE9BQTNDO0FBQUEsUUFBb0RDLFFBQXBELFFBQW9EQSxRQUFwRDtBQUFBLFFBQThEQyxtQkFBOUQsUUFBOERBLG1CQUE5RDtBQUFBLFdBQ1g7QUFBQTtBQUFBLFVBQUssV0FBVSxZQUFmO0FBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVSxpQkFBZjtBQUNLRixzQkFDSztBQUFDLHNCQUFEO0FBQUEsa0JBQVEsWUFBWUgsUUFBcEIsRUFBOEIsU0FBU0csT0FBdkM7QUFDR0Usb0NBQW9CLDBCQUFwQjtBQURILGFBREwsR0FJSztBQUxWLFNBREo7QUFRSTtBQUFBO0FBQUEsY0FBSyxXQUFVLG9CQUFmO0FBQ0tKO0FBREwsU0FSSjtBQVdJO0FBQUE7QUFBQSxjQUFLLFdBQVUsa0JBQWY7QUFDSTtBQUFDLHNCQUFEO0FBQUEsa0JBQVEsWUFBWSxDQUFDRCxRQUFyQixFQUErQixTQUFTRSxRQUF4QztBQUNLRyxvQ0FBb0IsbUNBQXBCO0FBREwsYUFESjtBQUlJO0FBQUMsNkJBQUQ7QUFBQSxrQkFBZSxZQUFZLENBQUNMLFFBQTVCLEVBQXNDLFdBQVdELFNBQWpELEVBQTRELFNBQVNLLFFBQXJFO0FBQ0tDLG9DQUFvQiwyQkFBcEI7QUFETDtBQUpKO0FBWEosS0FEVztBQUFBLENBQWY7O0FBc0JBLGVBQWVQLE1BQWYiLCJmaWxlIjoiRm9vdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmbG93XHJcbiAqIEBmaWxlIEZvb3RlciBjb21wb25lbnRcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCdXR0b24sIFByaW1hcnlCdXR0b24gfSBmcm9tICcuLi9CdXR0b24nO1xyXG5pbXBvcnQgJy4vRm9vdGVyLnNjc3MnO1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICAgIGlzTG9hZGluZzogYm9vbGVhbixcclxuICAgIGhhc0ZpbGVzOiBib29sZWFuLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgb25DYW5jZWw6IEZ1bmN0aW9uLFxyXG4gICAgb25DbG9zZT86IEZ1bmN0aW9uLFxyXG4gICAgb25VcGxvYWQ6IEZ1bmN0aW9uLFxyXG4gICAgZ2V0TG9jYWxpemVkTWVzc2FnZTogRnVuY3Rpb25cclxufTtcclxuXHJcbmNvbnN0IEZvb3RlciA9ICh7IGlzTG9hZGluZywgaGFzRmlsZXMsIG1lc3NhZ2UsIG9uQ2FuY2VsLCBvbkNsb3NlLCBvblVwbG9hZCwgZ2V0TG9jYWxpemVkTWVzc2FnZSB9OiBQcm9wcykgPT5cclxuICAgIDxkaXYgY2xhc3NOYW1lPSdiY3UtZm9vdGVyJz5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYmN1LWZvb3Rlci1sZWZ0Jz5cclxuICAgICAgICAgICAge29uQ2xvc2VcclxuICAgICAgICAgICAgICAgID8gPEJ1dHRvbiBpc0Rpc2FibGVkPXtoYXNGaWxlc30gb25DbGljaz17b25DbG9zZX0+XHJcbiAgICAgICAgICAgICAgICAgICAge2dldExvY2FsaXplZE1lc3NhZ2UoJ2J1aWsuZm9vdGVyLmJ1dHRvbi5jbG9zZScpfVxyXG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA6IG51bGx9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JjdS1mb290ZXItbWVzc2FnZSc+XHJcbiAgICAgICAgICAgIHttZXNzYWdlfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiY3UtZm9vdGVyLXJpZ2h0Jz5cclxuICAgICAgICAgICAgPEJ1dHRvbiBpc0Rpc2FibGVkPXshaGFzRmlsZXN9IG9uQ2xpY2s9e29uQ2FuY2VsfT5cclxuICAgICAgICAgICAgICAgIHtnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLmZvb3Rlci5idXR0b24uY2FuY2VsLnVwbG9hZHMnKX1cclxuICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgIDxQcmltYXJ5QnV0dG9uIGlzRGlzYWJsZWQ9eyFoYXNGaWxlc30gaXNMb2FkaW5nPXtpc0xvYWRpbmd9IG9uQ2xpY2s9e29uVXBsb2FkfT5cclxuICAgICAgICAgICAgICAgIHtnZXRMb2NhbGl6ZWRNZXNzYWdlKCdidWlrLmZvb3Rlci5idXR0b24udXBsb2FkJyl9XHJcbiAgICAgICAgICAgIDwvUHJpbWFyeUJ1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZvb3RlcjtcclxuIl19